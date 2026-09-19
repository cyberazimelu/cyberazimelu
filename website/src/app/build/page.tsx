import Link from "next/link";

const buildServices = [
  {
    title: "Website Development",
    description:
      "Professional, responsive websites designed around your brand, audience, and business goals.",
  },
  {
    title: "Web Application Development",
    description:
      "Custom web applications built to support real business workflows, functionality, and growth.",
  },
  {
    title: "Mobile App Development",
    description:
      "Purpose-built mobile experiences designed for usability, performance, and scalable digital services.",
  },
  {
    title: "UI/UX Design",
    description:
      "Clear, modern interfaces and user experiences that make digital products easier to understand and use.",
  },
  {
    title: "Custom Digital Solutions",
    description:
      "Technology solutions designed around specific operational, customer, or business requirements.",
  },
];

export default function BuildPage() {
  return (
    <main className="min-h-screen bg-[#06111f] text-white">
      <section className="mx-auto max-w-7xl px-6 pb-20 pt-28 sm:px-10 lg:px-12">
        <div className="max-w-4xl">
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.28em] text-[#00b3a6]">
            BUILD
          </p>

          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            Digital systems built for real business.
          </h1>

          <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-300">
            We design and develop professional digital experiences, websites,
            applications, and custom solutions that help businesses operate,
            connect, and grow.
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-[#00b3a6] px-6 py-3 text-sm font-semibold text-[#06111f] transition hover:opacity-90"
            >
              BUILD WITH US
            </Link>

            <Link
              href="/secure"
              className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:border-[#00b3a6]/60 hover:text-[#00b3a6]"
            >
              EXPLORE SECURITY
            </Link>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.02]">
        <div className="mx-auto grid max-w-7xl gap-px px-6 sm:grid-cols-2 sm:px-10 lg:grid-cols-3 lg:px-12">
          {buildServices.map((service) => (
            <article
              key={service.title}
              className="border border-white/10 bg-[#081727] p-7 transition hover:border-[#00b3a6]/40 hover:bg-[#0a1c2f]"
            >
              <div className="mb-6 h-1 w-12 rounded-full bg-[#00b3a6]" />

              <h2 className="text-xl font-semibold text-white">
                {service.title}
              </h2>

              <p className="mt-4 text-sm leading-7 text-slate-400">
                {service.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-10 lg:px-12">
        <div className="rounded-3xl border border-[#00b3a6]/20 bg-[#081727] p-8 sm:p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#00b3a6]">
            BUILD WITH PURPOSE
          </p>

          <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">
            Your digital product should support the way your business actually
            works.
          </h2>

          <p className="mt-5 max-w-3xl leading-8 text-slate-300">
            From a professional company website to a custom application, we
            focus on practical technology, clear user experiences, and
            foundations that can evolve as your business grows.
          </p>

          <div className="mt-8">
            <Link
              href="/contact"
              className="text-sm font-semibold text-[#00b3a6] transition hover:text-white"
            >
              START A PROJECT →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}