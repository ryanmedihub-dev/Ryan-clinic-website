/**
 * trackLead — fire-and-forget CTA tracking.
 *
 * Uses navigator.sendBeacon() when available (non-blocking, survives page nav).
 * Falls back to fetch() with keepalive:true.
 * Never throws — errors are swallowed so they never interrupt navigation.
 */
export function trackLead({ type, ctaName, buttonLocation, pageName, slug }) {
  const payload = JSON.stringify({ type, ctaName, buttonLocation, pageName, slug });
  const url = "/api/tracker/create";

  if (process.env.NODE_ENV === "development") {
    console.log("[tracker] trackLead initiating:", { type, ctaName, buttonLocation, pageName, slug });
  }

  try {
    let beaconSent = false;
    if (typeof navigator !== "undefined" && typeof navigator.sendBeacon === "function") {
      const blob = new Blob([payload], { type: "application/json" });
      beaconSent = navigator.sendBeacon(url, blob);
      if (process.env.NODE_ENV === "development") {
        console.log("[tracker] navigator.sendBeacon queued status:", beaconSent);
      }
    }

    if (beaconSent) {
      return;
    }

    if (process.env.NODE_ENV === "development") {
      console.log("[tracker] sendBeacon was not queued. Falling back to fetch keepalive...");
    }

    // Fallback: fetch with keepalive (no await — fire-and-forget)
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: payload,
      keepalive: true,
    })
      .then((res) => {
        if (process.env.NODE_ENV === "development") {
          console.log("[tracker] fetch keepalive response status:", res.status);
        }
      })
      .catch((err) => {
        if (process.env.NODE_ENV === "development") {
          console.warn("[tracker] fetch fallback failed silently:", err);
        }
      });
  } catch (err) {
    // Fail silently in production — never interrupt navigation
    if (process.env.NODE_ENV === "development") {
      console.warn("[tracker] trackLead try-catch error:", err);
    }
  }
}