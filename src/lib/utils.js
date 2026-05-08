import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Strips HTML tags that belong only in <head> from CMS-stored content.
 * Also fixes image accessibility and performance issues in CMS HTML:
 * - Removes DOCTYPE declarations and head-only tags (title, meta, link, base, noscript wrapping head content, script, style)
 * - Removes the entire <head> block if present (full-page HTML from SunEditor)
 * - Strips inline base64 src attributes (bloat) and replaces with a placeholder
 * - Adds loading="lazy" to all <img> tags
 * - Adds default alt text to <img> tags missing it
 * - Optimises Cloudinary URLs with q_auto,f_auto,w_1200
 */
export function sanitizeContent(html = "") {
  return html
    // Remove DOCTYPE declaration
    .replace(/<!DOCTYPE[^>]*>/gi, "")
    // Remove the entire <head>...</head> block first (handles SunEditor full-page output)
    .replace(/<head[\s\S]*?<\/head>/gi, "")
    // Remove remaining head-only inline elements
    .replace(/<title[^>]*>[\s\S]*?<\/title>/gi, "")
    .replace(/<base[^>]*\/?>/gi, "")
    .replace(/<meta[^>]*\/?>/gi, "")
    .replace(/<link[^>]*\/?>/gi, "")
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    // Remove html/body wrappers
    .replace(/<html[^>]*>/gi, "")
    .replace(/<\/html>/gi, "")
    .replace(/<body[^>]*>/gi, "")
    .replace(/<\/body>/gi, "")
    // Strip base64-encoded src values to prevent page-size bloat (>2 MB issue)
    .replace(/\s+src="data:[^"]{100,}"/gi, ' src=""')
    .replace(/\s+src='data:[^']{100,}'/gi, " src=''")
    .replace(/<img([^>]*?)>/gi, (match, attrs) => {
      let out = attrs;
      // Add loading="lazy" if not present
      if (!/loading\s*=/i.test(out)) out += ' loading="lazy"';
      // Add default alt if missing or empty
      if (!/alt\s*=\s*["'][^"']*["']/i.test(out) || /alt\s*=\s*["']\s*["']/i.test(out)) {
        out = out.replace(/\s*alt\s*=\s*["'][^"']*["']/gi, "");
        out += ' alt="Hair transplant result — Ryan Clinic"';
      }
      // Optimise Cloudinary URLs: insert q_auto,f_auto,w_1200 into upload path
      out = out.replace(
        /(https?:\/\/res\.cloudinary\.com\/[^/]+\/image\/upload\/)([^"'\s]*)/gi,
        (m, base, rest) => {
          if (/q_auto/.test(rest)) return m;
          return `${base}q_auto,f_auto,w_1200/${rest}`;
        }
      );
      return `<img${out}>`;
    });
}
