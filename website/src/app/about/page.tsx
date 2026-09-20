import Image from "next/image";
import Link from "next/link";

const credentials = [
  "CISSP",
  "CISM",
  "CEH v12",
  "CompTIA Security+",
];

const focusAreas = [
  "Network VAPT",
  "Penetration Testing",
  "Application Security",
  "Web & API Security",
  "Cloud Security",
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#06111f] text-white">
      {/* INTRODUCTION */}
      <section className="mx-auto max-w-7xl px-6 pb-20 pt-28 sm:px-10 lg:px-12">
        <div className="max-w-4xl">
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.28em] text-[#00b3a6]">
            ABOUT
          </p>

          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            Technology built with security in mind.
          </h1>

          <p className="mt-7 max-w-3xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
            PM AZIMELU TECHNOLOGIES is a technology company focused on building
            digital systems and helping organizations secure them.
          </p>

          <p className="mt-5 max-w-3xl text-base leading-7 text-slate-400 sm:text-lg sm:leading-8">
            We bring together digital development and cybersecurity to help
            businesses create technology that is practical, usable, and
            security-conscious from the start.
          </p>
        </div>
      </section>

      {/* BUILD / SECURE */}
      <section className="border-y border-white/10 bg-white/[0.02]">
        <div className="mx-auto grid max-w-7xl gap-px px-6 sm:grid-cols-2 sm:px-10 lg:px-12">
          <article className="border border-white/10 bg-[#081727] p-8 sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#00b3a6]">
              BUILD
            </p>

            <h2 className="mt-4 text-2xl font-semibold">
              Create digital systems that work.
            </h2>

            <p className="mt-5 text-base leading-7 text-slate-400 sm:leading-8">
              From professional websites to web applications, mobile
              experiences, and custom digital solutions, we focus on building
              technology around real business requirements.
            </p>
          </article>

          <article className="border border-white/10 bg-[#081727] p-8 sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#00b3a6]">
              SECURE
            </p>

            <h2 className="mt-4 text-2xl font-semibold">
              Understand and reduce digital exposure.
            </h2>

            <p className="mt-5 text-base leading-7 text-slate-400 sm:leading-8">
              Through authorized security assessments, VAPT, penetration
              testing, application security, network security, and
              cybersecurity services, we help organizations understand their
              security posture.
            </p>
          </article>
        </div>
      </section>

      {/* FOUNDER / LEADERSHIP */}
      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-10 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          {/* CEO IMAGE */}
          <div className="mx-auto w-full max-w-md">
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#081727] p-3 shadow-2xl shadow-black/20">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[#06111f]">
                <Image
                  src="/brand/PMAT-CEO.jpeg"
                  alt="Peter Majesty Azimelu, Founder of PM AZIMELU TECHNOLOGIES"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 400px"
                  className="object-cover object-center"
                />
              </div>

              <div className="flex items-center justify-between px-3 py-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#00b3a6]">
                    FOUNDER
                  </p>

                  <p className="mt-1 text-sm text-slate-400">
                    PM AZIMELU TECHNOLOGIES
                  </p>
                </div>

                <span
                  className="h-2 w-2 rounded-full bg-[#00b3a6]"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>

          {/* LEADERSHIP PROFILE */}
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#00b3a6] sm:text-sm">
              LEADERSHIP
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl lg:text-4xl">
             Peter Majesty Azimelu
            </h2>

            <p className="mt-5 text-sm font-medium uppercase tracking-[0.14em] text-slate-500 sm:text-base sm:tracking-[0.18em]">
              Founder — PM AZIMELU TECHNOLOGIES
            </p>

            <div className="mt-8 space-y-5 text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
              <p>
                Peter Majesty Azimelu is a cybersecurity consultant, security
                researcher, and technology professional focused on building
                digital systems and helping organizations secure them.
              </p>

              <p className="text-slate-400">
                As the founder of PM AZIMELU TECHNOLOGIES, he brings together
                digital development and cybersecurity to help businesses create
                technology that is practical, resilient, and security-conscious.
              </p>

              <p className="text-slate-400">
                His professional focus includes network VAPT, penetration
                testing, application security, web and API security, cloud
                security, and infrastructure security.
              </p>
            </div>

            {/* CREDENTIALS */}
            <div className="mt-8 flex flex-wrap gap-3">
              {credentials.map((credential) => (
                <span
                  key={credential}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm font-medium text-slate-200"
                >
                  {credential}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* EXPERTISE + APPROACH */}
      <section className="mx-auto max-w-7xl px-6 pb-20 sm:px-10 lg:px-12">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          {/* AREAS OF EXPERTISE */}
          <div className="rounded-3xl border border-white/10 bg-[#081727] p-8 sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#00b3a6]">
              FOCUS
            </p>

            <h3 className="mt-4 text-2xl font-semibold">
              Areas of expertise
            </h3>

            <div className="mt-7 space-y-4">
              {focusAreas.map((area) => (
                <div
                  key={area}
                  className="flex items-center gap-3 border-b border-white/10 pb-4 last:border-0 last:pb-0"
                >
                  <span
                    className="h-2 w-2 shrink-0 rounded-full bg-[#00b3a6]"
                    aria-hidden="true"
                  />

                  <span className="text-base text-slate-300">{area}</span>
                </div>
              ))}
            </div>
          </div>

          {/* APPROACH */}
          <div className="rounded-3xl border border-[#00b3a6]/20 bg-[#081727] p-8 sm:p-12">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#00b3a6]">
              OUR APPROACH
            </p>

            <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">
              Build thoughtfully. Secure deliberately.
            </h2>

            <p className="mt-5 max-w-3xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
              Technology and security should not be treated as completely
              separate concerns. We approach digital projects with both
              functionality and security in mind, helping businesses move from
              idea to implementation with greater awareness of the risks and
              requirements involved.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/build"
                className="inline-flex items-center justify-center rounded-full bg-[#00b3a6] px-6 py-3 text-sm font-semibold text-[#06111f] transition hover:opacity-90"
              >
                EXPLORE BUILD
              </Link>

              <Link
                href="/secure"
                className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:border-[#00b3a6]/60 hover:text-[#00b3a6]"
              >
                EXPLORE SECURITY
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:border-[#00b3a6]/60 hover:text-[#00b3a6]"
              >
                CONTACT US
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}