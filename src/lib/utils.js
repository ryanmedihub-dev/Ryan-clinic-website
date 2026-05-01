import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Strips HTML tags that belong only in <head> from CMS-stored content.
 * Also fixes image accessibility and performance issues in CMS HTML:
 * - Removes head-only tags (title, meta, link, script, style)
 * - Adds loading="lazy" to all <img> tags
 * - Adds default alt text to <img> tags missing it
 * - Optimises Cloudinary URLs with q_auto,f_auto,w_1200
 */
export function sanitizeContent(html = "") {
  return html
    .replace(/<title[^>]*>[\s\S]*?<\/title>/gi, "")
    .replace(/<meta[^>]*\/?>/gi, "")
    .replace(/<link[^>]*\/?>/gi, "")
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<html[^>]*>/gi, "")
    .replace(/<\/html>/gi, "")
    .replace(/<head[\s\S]*?<\/head>/gi, "")
    .replace(/<body[^>]*>/gi, "")
    .replace(/<\/body>/gi, "")
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
