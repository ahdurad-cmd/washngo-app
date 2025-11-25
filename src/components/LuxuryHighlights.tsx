const highlights = [
  {
    title: 'Fokus på elbiler',
    description: 'Moderne elbiler med kendt historik, lave driftsomkostninger og udstyr til hverdagen.',
    accent: 'Elbils-eksperter'
  },
  {
    title: 'Bilpleje i topklasse',
    description: 'Skånsom vask, grundig indvendig rengøring og klargøring, så både elbil og byttebil står skarpt.',
    accent: 'Bilpleje & finish'
  },
  {
    title: 'Leasing & byttebil',
    description: 'Hjælp til leasing og finansiering gennem partnere – og vi tager gerne din bil i bytte.',
    accent: 'Tryg handel'
  }
]

export default function LuxuryHighlights() {
  return (
    <section className="mx-auto mt-20 max-w-6xl">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-bold uppercase tracking-widest text-blue-600">Det får du hos os</p>
        <h2 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">Moderne bilhus med elbiler, vask og bilpleje</h2>
        <p className="mt-4 text-base text-slate-600">
          WashNGo BilCenter samler elbiler til salg, gør-det-selv vaskeanlæg og professionel bilpleje. Du får én fast partner – uanset om du vil købe elbil, have hjælp til leasing eller bare holde bilen flot i hverdagen.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {highlights.map((item, index) => (
          <article
            key={item.title}
            className="relative overflow-hidden rounded-3xl border border-slate-100 bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
          >
            <div className="absolute inset-0 opacity-40 mix-blend-multiply">
              <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-blue-50" />
              <div className="pointer-events-none absolute -bottom-16 -left-10 h-36 w-36 rounded-full bg-sky-50" />
            </div>
            <div className="relative flex items-center justify-between gap-3">
              <span className="text-[11px] font-bold uppercase tracking-[0.35em] text-blue-600">{item.accent}</span>
              <span className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-[11px] font-bold text-slate-600">
                {String(index + 1).padStart(2, '0')}
              </span>
            </div>
            <h3 className="relative mt-4 text-lg font-bold text-slate-900 md:text-xl">{item.title}</h3>
            <p className="relative mt-3 text-sm leading-relaxed text-slate-600">{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
