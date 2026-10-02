import { spawn } from "child_process";

async function main() {
  console.log("Starting Chrome headless...");
  const chromeProcess = spawn(
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    [
      "--headless=new",
      "--remote-debugging-port=9222",
      "--user-data-dir=C:\\Users\\patwa\\AppData\\Local\\Temp\\chrome_dev_test_" + Date.now(),
      "--disable-gpu",
      "--no-sandbox",
      "about:blank",
    ],
    { stdio: "ignore" }
  );

  let listRes = null;
  for (let i = 0; i < 20; i++) {
    try {
      listRes = await fetch("http://127.0.0.1:9222/json/version");
      if (listRes.ok) break;
    } catch {}
    await new Promise((r) => setTimeout(r, 500));
  }

  if (!listRes || !listRes.ok) {
    chromeProcess.kill();
    throw new Error("Could not connect to Chrome debugging port");
  }

  const versionData = await listRes.json();
  console.log("Chrome version:", versionData.Browser);

  try {
    const newTargetRes = await fetch(
      "http://127.0.0.1:9222/json/new?http://localhost:3000/hair-transplant-in-delhi",
      { method: "PUT" }
    );
    const targetData = await newTargetRes.json();
    console.log("Target created:", targetData.id, targetData.url);

    const wsUrl = targetData.webSocketDebuggerUrl;
    const ws = new globalThis.WebSocket(wsUrl);

    let id = 1;
    function sendCommand(method, params = {}) {
      return new Promise((resolve, reject) => {
        const cmdId = id++;
        const handler = (msg) => {
          const parsed = JSON.parse(msg.data || msg);
          if (parsed.id === cmdId) {
            ws.removeEventListener("message", handler);
            if (parsed.error) reject(parsed.error);
            else resolve(parsed.result);
          }
        };
        ws.addEventListener("message", handler);
        ws.send(JSON.stringify({ id: cmdId, method, params }));
      });
    }

    await new Promise((resolve) => {
      ws.onopen = resolve;
    });
    console.log("Connected to Chrome CDP WebSocket");

    await sendCommand("Page.enable");
    await sendCommand("Runtime.enable");

    // Navigate to the target URL and wait for load event
    const TARGET_URL = "http://localhost:3000/hair-transplant-in-delhi";
    console.log("Navigating to:", TARGET_URL);

    const loadPromise = new Promise((resolve) => {
      const handler = (msg) => {
        const parsed = JSON.parse(msg.data || msg);
        if (parsed.method === "Page.loadEventFired") {
          ws.removeEventListener("message", handler);
          resolve();
        }
      };
      ws.addEventListener("message", handler);
    });

    await sendCommand("Page.navigate", { url: TARGET_URL });
    await Promise.race([loadPromise, new Promise((r) => setTimeout(r, 10000))]);
    console.log("Page loaded (or timed out waiting for load event)");

    // Extra wait for Next.js client-side hydration
    await new Promise((r) => setTimeout(r, 5000));

    const evalScript = `
      (() => {
        const bodyText = document.body.innerText;
        const html = document.body.innerHTML;
        const hasMeetSurgeon = bodyText.includes("Meet Your Hair Transplant Surgeon") || html.includes("Meet Your Hair Transplant");
        const hasPranendra = bodyText.includes("Dr. Pranendra Singh") || html.includes("Dr. Pranendra Singh");
        const hasYourSurgeon = bodyText.includes("Your Surgeon in Delhi") || bodyText.includes("YOUR SURGEON IN DELHI");
        const hasEducation = bodyText.includes("Education & Qualifications") || html.includes("Education");

        let sectionInfo = null;
        const surgeonHeading = Array.from(document.querySelectorAll('h2, h3, section')).find(el => 
          el.textContent.includes("Meet Your Hair Transplant Surgeon") || 
          el.textContent.includes("Dr. Pranendra Singh")
        );

        if (surgeonHeading) {
          const section = surgeonHeading.closest('section') || surgeonHeading;
          const rect = section.getBoundingClientRect();
          const comp = window.getComputedStyle(section);
          sectionInfo = {
            tagName: section.tagName,
            className: section.className,
            rect: { top: rect.top, left: rect.left, width: rect.width, height: rect.height },
            computed: {
              display: comp.display,
              visibility: comp.visibility,
              opacity: comp.opacity,
              overflow: comp.overflow,
              position: comp.position,
              zIndex: comp.zIndex
            },
            parentElement: section.parentElement ? {
              tagName: section.parentElement.tagName,
              className: section.parentElement.className,
              computedDisplay: window.getComputedStyle(section.parentElement).display,
              computedVisibility: window.getComputedStyle(section.parentElement).visibility,
            } : null
          };
        }

        const sectionsList = Array.from(document.querySelectorAll('section')).map((sec, idx) => {
          const h2 = sec.querySelector('h2');
          const h3 = sec.querySelector('h3');
          const rect = sec.getBoundingClientRect();
          return {
            index: idx + 1,
            h2: h2 ? h2.textContent.trim().replace(/\\s+/g, ' ') : null,
            h3: h3 ? h3.textContent.trim().replace(/\\s+/g, ' ') : null,
            height: rect.height,
            display: window.getComputedStyle(sec).display,
            visibility: window.getComputedStyle(sec).visibility,
          };
        });

        return {
          title: document.title,
          url: window.location.href,
          hasMeetSurgeon,
          hasPranendra,
          hasYourSurgeon,
          hasEducation,
          sectionInfo,
          sectionsList
        };
      })()
    `;

    const res = await sendCommand("Runtime.evaluate", {
      expression: evalScript,
      returnByValue: true,
    });

    console.log("=== BROWSER DOM EVALUATION RESULT ===");
    console.log(JSON.stringify(res.result?.value, null, 2));

    ws.close();
  } catch (err) {
    console.error("CDP execution error:", err);
  } finally {
    chromeProcess.kill();
  }
}

main().catch(console.error);
