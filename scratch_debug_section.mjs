// scratch_debug_section.mjs
// Inspects the live page and reports what text is actually in the DOM
// so we can confirm exact Ctrl+F search terms

import { spawn } from "child_process";

async function main() {
  console.log("Starting Chrome headless (no user cache)...");
  const chromeProcess = spawn(
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    [
      "--headless=new",
      "--remote-debugging-port=9223",
      `--user-data-dir=C:\\Users\\patwa\\AppData\\Local\\Temp\\chrome_debug_${Date.now()}`,
      "--disable-gpu",
      "--no-sandbox",
      "about:blank",
    ],
    { stdio: "ignore" }
  );

  let listRes = null;
  for (let i = 0; i < 20; i++) {
    try {
      listRes = await fetch("http://127.0.0.1:9223/json/version");
      if (listRes.ok) break;
    } catch {}
    await new Promise((r) => setTimeout(r, 500));
  }

  if (!listRes || !listRes.ok) {
    chromeProcess.kill();
    throw new Error("Could not connect to Chrome debugging port 9223");
  }

  const versionData = await listRes.json();
  console.log("Chrome version:", versionData.Browser);

  try {
    const newTargetRes = await fetch("http://127.0.0.1:9223/json/new", { method: "PUT" });
    const targetData = await newTargetRes.json();
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

    await new Promise((resolve) => { ws.onopen = resolve; });
    await sendCommand("Page.enable");
    await sendCommand("Runtime.enable");

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
    await Promise.race([loadPromise, new Promise((r) => setTimeout(r, 12000))]);
    console.log("Page loaded. Waiting for hydration...");
    await new Promise((r) => setTimeout(r, 6000));

    const evalScript = `
      (() => {
        const bodyText = document.body.innerText;

        // Check for section markers
        const debugMarker = document.querySelector('[data-debug-section="meet-your-surgeon"]');
        const hasDebugAttr = !!debugMarker;

        // Check raw text presence
        const hasMeetSurgeon = bodyText.includes("Meet Your Hair Transplant");
        const hasSurgeon = bodyText.includes("Surgeon");
        const hasPranendra = bodyText.includes("Pranendra");
        const hasEducation = bodyText.includes("Education");
        const hasYourSurgeon = bodyText.includes("Your Surgeon");

        // All sections in DOM
        const sections = Array.from(document.querySelectorAll('section')).map((sec, i) => {
          const heading = sec.querySelector('h2');
          const rect = sec.getBoundingClientRect();
          const style = window.getComputedStyle(sec);
          return {
            index: i + 1,
            heading: heading ? heading.innerText.trim() : '(none)',
            display: style.display,
            visibility: style.visibility,
            height: Math.round(rect.height),
            scrollTop: Math.round(rect.top + window.scrollY),
          };
        });

        // Find our surgeon section specifically
        let surgeonSection = null;
        if (debugMarker) {
          const rect = debugMarker.getBoundingClientRect();
          const style = window.getComputedStyle(debugMarker);
          // Check ALL ancestors for display:none or visibility:hidden or overflow:hidden
          const ancestors = [];
          let el = debugMarker;
          while (el && el !== document.body) {
            const s = window.getComputedStyle(el);
            if (s.display === 'none' || s.visibility === 'hidden' || s.opacity === '0') {
              ancestors.push({
                tag: el.tagName,
                className: el.className.slice(0,80),
                display: s.display,
                visibility: s.visibility,
                opacity: s.opacity,
              });
            }
            el = el.parentElement;
          }
          surgeonSection = {
            found: true,
            display: style.display,
            visibility: style.visibility,
            opacity: style.opacity,
            height: Math.round(rect.height),
            top: Math.round(rect.top + window.scrollY),
            hiddenAncestors: ancestors,
            innerTextSample: debugMarker.innerText.slice(0, 300),
          };
        } else {
          surgeonSection = { found: false };
        }

        return {
          url: window.location.href,
          title: document.title,
          totalSections: sections.length,
          textChecks: { hasMeetSurgeon, hasSurgeon, hasPranendra, hasEducation, hasYourSurgeon },
          surgeonSection,
          sections,
        };
      })()
    `;

    const res = await sendCommand("Runtime.evaluate", {
      expression: evalScript,
      returnByValue: true,
    });

    console.log("=== FULL DOM INSPECTION ===");
    console.log(JSON.stringify(res.result?.value, null, 2));

    ws.close();
  } catch (err) {
    console.error("CDP error:", err);
  } finally {
    chromeProcess.kill();
  }
}

main().catch(console.error);
