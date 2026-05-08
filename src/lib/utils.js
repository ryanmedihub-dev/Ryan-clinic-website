import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Strips HTML tags that belong only in <head> from CMS-stored content.
 * Also fixes image accessibility and performance issues in CMS HTML:
 * - Strips HTML comments first (some crawlers parse tags inside comments)
 * - Removes DOCTYPE declarations and the entire <head>...</head> block
 * - Removes residual head-only tags: title, meta, link, base, script, style
 * - Removes html/body wrappers (full-page paste from SunEditor code-view)
 * - Strips inline base64 src values (prevents >2 MB pages)
 * - Downgrades <h1> to <h2> so the PageBanner <h1> stays the sole H1
 * - Adds loading="lazy", default alt, and width/height to <img> tags
 * - Optimises Cloudinary URLs with q_auto,f_auto,w_1200
 */
export function sanitizeContent(html = "") {
  return html
    // 1. Strip HTML comments — crawlers like Screaming Frog parse tags inside them
    .replace(/<!--[\s\S]*?-->/g, "")
    // 2. Remove DOCTYPE
    .replace(/<!DOCTYPE[^>]*>/gi, "")
    // 3. Remove full <head>...</head> block (SunEditor full-page paste)
    .replace(/<head[\s\S]*?<\/head>/gi, "")
    // 4. Remove residual head-only tags that may have been outside a <head> wrapper
    .replace(/<title[^>]*>[\s\S]*?<\/title>/gi, "")
    .replace(/<base[^>]*\/?>/gi, "")
    .replace(/<meta[^>]*\/?>/gi, "")
    .replace(/<link[^>]*\/?>/gi, "")
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    // 5. Remove html/body wrappers
    .replace(/<html[^>]*>/gi, "")
    .replace(/<\/html>/gi, "")
    .replace(/<body[^>]*>/gi, "")
    .replace(/<\/body>/gi, "")
    // 6. Strip base64-encoded src values (page-size bloat fix)
    .replace(/(\s+src=")data:[^"]{100,}"/gi, '$1"')
    .replace(/(\s+src=')data:[^']{100,}'/gi, "$1'")
    // 7. Downgrade <h1> → <h2> so PageBanner remains the sole H1 on the page
    .replace(/<h1(\b[^>]*)>/gi, "<h2$1>")
    .replace(/<\/h1>/gi, "</h2>")
    // 8. Process <img> tags: lazy-load, default alt, default size, Cloudinary optimisation
    .replace(/<img([^>]*?)>/gi, (match, attrs) => {
      let out = attrs;
      // Add loading="lazy"
      if (!/loading\s*=/i.test(out)) out += ' loading="lazy"';
      // Add default alt if missing or empty
      if (!/alt\s*=\s*["'][^"']*["']/i.test(out) || /alt\s*=\s*["']\s*["']/i.test(out)) {
        out = out.replace(/\s*alt\s*=\s*["'][^"']*["']/gi, "");
        out += ' alt="Hair transplant result — Ryan Clinic"';
      }
      // Add width/height if missing (prevents CLS; browser overrides via CSS)
      if (!/width\s*=/i.test(out)) out += ' width="1200"';
      if (!/height\s*=/i.test(out)) out += ' height="800"';
      // Optimise Cloudinary URLs: insert q_auto,f_auto,w_1200
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
