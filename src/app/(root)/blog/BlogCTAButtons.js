"use client";

import useTrackCTA from "@/lib/useTrackCTA";

export default function BlogCTAButtons() {
  const trackCTA = useTrackCTA();

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
      <a
        href="https://api.whatsapp.com/send?phone=+919217958539&text=Hi%2C%20I%20want%20a%20free%20hair%20transplant%20consultation"
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 font-semibold text-sm py-3.5 px-7 rounded-xl text-white transition-opacity hover:opacity-90 w-full sm:w-auto justify-center"
        style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)" }}
        onClick={() => trackCTA({ type: "whatsapp", ctaName: "Blog Book Free Consultation", buttonLocation: "Blog CTA Strip" })}
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.116 1.52 5.847L.057 23.12a.75.75 0 00.92.92l5.273-1.463A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.666-.523-5.18-1.43l-.372-.223-3.857 1.072 1.072-3.857-.223-.372A9.944 9.944 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
        </svg>
        Book Free Consultation
      </a>
      <a
        href="tel:+919911111247"
        className="inline-flex items-center gap-2 font-semibold text-sm py-3.5 px-7 rounded-xl transition-opacity hover:opacity-90 w-full sm:w-auto justify-center"
        style={{ background: "#D32F2F", color: "#fff" }}
        onClick={() => trackCTA({ type: "call", ctaName: "Blog Call CTA", buttonLocation: "Blog CTA Strip" })}
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
        </svg>
        Call +91-9911111247
      </a>
    </div>
  );
}
