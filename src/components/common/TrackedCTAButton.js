"use client";

// NOTE: This file is kept for backward compatibility but is NOT used
// for tracking. All tracking is handled via useTrackCTA() hook directly
// in each component's onClick handler. This component has no tracking
// logic to avoid duplicating calls.
//
// DO NOT add usePathname() or trackLead() calls at module scope — 
// React hooks must only be called inside component functions.

export default function TrackedCTAButton({
  href,
  children,
  className = "",
  target,
  rel,
  onClick,
  ...props
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={className}
      target={target}
      rel={rel}
      {...props}
    >
      {children}
    </a>
  );
}