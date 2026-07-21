"use client";

import { usePathname } from "next/navigation";
import { trackLead } from "@/lib/tracker";

export default function useTrackCTA() {
    const pathname = usePathname() || "/";

    const slug = pathname;

    const pageName =
        pathname === "/"
            ? "Homepage"
            : pathname
                .replace(/\//g, " ")
                .trim()
                .replace(/-/g, " ")
                .replace(/\b\w/g, (c) => c.toUpperCase()) || "Unknown Page";

    const trackCTA = ({
        type,
        ctaName,
        buttonLocation,
    }) => {
        if (process.env.NODE_ENV === "development") {
            console.log("[tracker] useTrackCTA hook invoked with:", { type, ctaName, buttonLocation, pageName, slug });
        }
        if (!type || !ctaName || !buttonLocation) {
            if (process.env.NODE_ENV === "development") {
                console.warn("[tracker] trackCTA aborting - missing required parameters:", { type, ctaName, buttonLocation });
            }
            return;
        }
        trackLead({
            type,
            ctaName,
            buttonLocation,
            pageName: pageName || "Unknown Page",
            slug: slug || "/",
        });
    };

    return trackCTA;
}