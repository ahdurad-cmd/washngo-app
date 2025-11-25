import Link from 'next/link'
import services from '../../data/services.json'
import ServiceCard from './ServiceCard'

export default function SignatureServices() {
  const curated = services.slice(0, 3)

  return (
    <section className="mx-auto mt-20 max-w-6xl">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="section-title">Bilpleje & services</p>
          <h2 className="mt-4 text-3xl font-semibold text-white md:text-4xl">Alt til vask, pleje og klargøring</h2>
          <p className="mt-4 max-w-2xl text-base text-slate-200">
            Et udvalg af vores mest efterspurgte services – fra gør-det-selv bilvask og udvendig håndvask til grundig indvendig rengøring og komplet klargøring. Perfekt til både din elbil og den bil, du ønsker at sælge eller bytte.
          </p>
        </div>
        <Link href="/services" className="btn-secondary self-start md:self-auto">
          Se alle services
        </Link>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {curated.map((service: any, index: number) => (
          <div
            key={service.id}
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-950/90 via-slate-950/80 to-sky-950/70 p-6 shadow-xl shadow-black/50 transition hover:-translate-y-1 hover:border-sky-400/70 hover:shadow-sky-900/70"
          >
            <div className="absolute inset-0 opacity-40 mix-blend-screen">
              <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-sky-500/25" />
              <div className="pointer-events-none absolute -bottom-20 -left-10 h-40 w-40 rounded-full bg-emerald-500/20" />
            </div>
            <div className="relative flex items-center justify-between gap-3">
              <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-sky-300">Bilpleje service</span>
              <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-300">
                {index === 0 ? 'Populær' : 'Anbefalet'}
              </span>
            </div>
            <h3 className="relative mt-4 text-lg font-semibold text-white md:text-xl">{service.title}</h3>
            <p className="relative mt-2 text-sm leading-relaxed text-slate-200">{service.desc}</p>
            {service.price && (
              <div className="relative mt-4 flex items-baseline justify-between">
                <span className="text-xs uppercase tracking-[0.2em] text-slate-400">Fra</span>
                <span className="text-base font-semibold text-sky-300">{service.price}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
