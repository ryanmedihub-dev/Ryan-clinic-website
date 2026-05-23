import Image from "next/image";

const credentials = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    title: "100% Doctor-Led Surgery",
    body: "Every surgical step — extraction, channel creation, implantation — is performed exclusively by certified doctors. Zero technician involvement at any stage.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5a17.92 17.92 0 01-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
    title: "Turkey-Certified Techniques",
    body: "Our doctors trained at Turkey's top hair restoration institutes and are certified in Sapphire FUE and DHI — techniques unavailable at any other Indian clinic.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    title: "95%+ Graft Survival Rate",
    body: "Using the original Choi Pen and our proprietary preservation protocol, Ryan Clinic achieves 95%+ graft survival — far above the industry average of 60–70%.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "12+ Years of Excellence",
    body: "Since 2012, our doctors have completed over 10,000 successful hair restoration procedures across Delhi, Mumbai, and Hyderabad — with proven, permanent results.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
      </svg>
    ),
    title: "4.9★ Patient Satisfaction",
    body: "Rated 4.9/5 across Google Reviews. Our doctors are known for clear communication, personal attention, and consistently exceeding patient expectations.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
    title: "NABH-Compliant OT Standards",
    body: "Every procedure takes place in a fully sterile, NABH-compliant operation theatre with single-use surgical-grade instruments — matching Turkey's highest clinical standards.",
  },
];

const stats = [
  { num: "10,000+", label: "Procedures Completed" },
  { num: "95%+", label: "Graft Survival Rate" },
  { num: "4.9 ★", label: "Average Google Rating" },
  { num: "12+", label: "Years of Excellence" },
];

export default function DoctorCredentials() {
  return (
    <section className="py-16 md:py-24" style={{ background: "var(--bg-main)" }}>
      <div className="containerFull">
        {/* Section label */}
        <div className="flex items-center gap-3 mb-4">
          <span className="block w-8 h-px" style={{ background: "var(--primary-red)" }} />
          <span
            className="text-[11px] font-semibold tracking-[0.22em] uppercase"
            style={{ color: "var(--primary-red)" }}
          >
            Why Trust Our Doctors
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left — sticky image + stats */}
          <div className="lg:sticky lg:top-28">
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.1] tracking-tight mb-5"
              style={{ color: "var(--text-primary)" }}
            >
              Doctors You Can{" "}
              <span style={{ color: "var(--primary-red)" }}>Trust</span>
              <br />
              With Your Hair
            </h2>
            <p
              className="text-sm md:text-[15px] leading-relaxed mb-8 max-w-md"
              style={{ color: "var(--text-muted)" }}
            >
              At Ryan Clinic, our doctors aren't just medically qualified — they're Turkey-certified
              masters of the Sapphire FUE technique, delivering results that no other clinic in India
              can match.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl p-5"
                  style={{
                    background: "var(--bg-soft)",
                    border: "1px solid var(--border-light)",
                  }}
                >
                  <p className="text-2xl font-bold mb-1" style={{ color: "var(--text-primary)" }}>
                    {s.num}
                  </p>
                  <p className="text-[11px] font-medium" style={{ color: "var(--text-muted)" }}>
                    {s.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Team image */}
            <div className="relative rounded-2xl overflow-hidden h-56 sm:h-72">
              <Image
                src="/uploads/medical-team.png"
                alt="Ryan Clinic Medical Team"
                fill
                className="object-cover object-center"
                unoptimized
              />
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(to top, rgba(48,38,88,0.7) 0%, transparent 60%)",
                }}
              />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="text-white font-bold text-sm">Ryan Clinic Medical Team</p>
                <p className="text-white/60 text-[11px]">Delhi · Mumbai · Hyderabad</p>
              </div>
              <div
                className="absolute top-0 left-0 w-1 h-full rounded-r-full"
                style={{ background: "var(--primary-red)" }}
              />
            </div>
          </div>

          {/* Right — credentials list */}
          <div className="divide-y" style={{ borderColor: "var(--border-light)" }}>
            {credentials.map((item, i) => (
              <div key={i} className="flex items-start gap-5 py-6">
                {/* Icon */}
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: "rgba(227,10,23,0.08)", color: "var(--primary-red)" }}
                >
                  {item.icon}
                </div>
                <div>
                  <h3
                    className="font-semibold text-sm md:text-base mb-1.5"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-[13px] leading-relaxed" style={{ color: "var(--text-muted)" }}>
                    {item.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
