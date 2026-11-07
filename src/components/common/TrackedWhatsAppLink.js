"use client";

import useTrackCTA from "@/lib/useTrackCTA";

/**
 * TrackedWhatsAppLink — minimal "use client" boundary.
 * Renders a plain <a> tag with the supplied href/className/children
 * and fires a trackCTA() call on click. No state, no effects.
 *
 * Props:
 *   href         — destination URL (WhatsApp deeplink or tel:)
 *   type         — trackCTA type param  ("whatsapp" | "call")
 *   ctaName      — trackCTA ctaName param
 *   buttonLocation — trackCTA buttonLocation param
 *   className    — forwarded to <a>
 *   target       — forwarded to <a>  (default "_blank")
 *   rel          — forwarded to <a>  (default "noreferrer")
 *   children     — link content
 */
export default function TrackedWhatsAppLink({
  href,
  type,
  ctaName,
  buttonLocation,
  className,
  style,
  "aria-label": ariaLabel,
  ariaLabel: altAriaLabel,
  target = "_blank",
  rel = "noreferrer",
  children,
}) {
  const trackCTA = useTrackCTA();

  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={className}
      style={style}
      aria-label={ariaLabel || altAriaLabel}
      onClick={() => trackCTA({ type, ctaName, buttonLocation })}
    >
      {children}
    </a>
  );
}
