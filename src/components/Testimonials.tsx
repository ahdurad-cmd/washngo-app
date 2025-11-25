const testimonials = [
  {
    name: 'Mette L. — Elbilskunde',
    text: 'Vi fik ro på valget af elbil, gennemgang af rækkevidde og hjælp til både finansiering og byttebil.',
    rating: 5
  },
  {
    name: 'Anders P. — Familie på fire',
    text: 'WashNGo BilCenter hjalp os med at skifte fra diesel til elbil, forklarede opladning og sørgede for, at alt papirarbejde var på plads.',
    rating: 5
  },
  {
    name: 'Louise B. — Erhvervskunde',
    text: 'Vores mindre firmapark blev samlet ét sted. De holder styr på både elbiler, vask og klargøring, så bilerne altid står skarpt.',
    rating: 5
  }
]

export default function Testimonials() {
  return (
    <section aria-labelledby="testimonials-title" className="mx-auto mt-20 max-w-6xl">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-blue-600">Testimonials</p>
          <h2 id="testimonials-title" className="mt-4 text-3xl font-bold text-slate-900 md:text-4xl">
            Kunder, der vil have tryghed, vælger os
          </h2>
        </div>
        <p className="max-w-xl text-sm text-slate-600">
          Både private og erhvervskunder bruger os til elbiler, byttebil og bilpleje. Her er et udsnit af deres oplevelse.
        </p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {testimonials.map((item) => (
          <blockquote
            key={item.name}
            className="relative overflow-hidden rounded-3xl border border-slate-100 bg-white p-6 shadow-sm transition-transform duration-300 hover:-translate-y-1.5 hover:border-blue-200 hover:shadow-md"
          >
            <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-blue-50 blur-3xl" />
            <div className="flex items-center justify-between gap-2 text-xs font-semibold uppercase tracking-[0.32em]">
              <span className="inline-flex items-center rounded-full border border-green-200 bg-green-50 px-3 py-1 text-green-700">
                Verificeret kunde
              </span>
              <span
                className="flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-amber-500"
                aria-label={`Bedømmelse ${item.rating} ud af 5`}
              >
                {'★★★★★'.slice(0, item.rating)}
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-slate-700 md:text-base">“{item.text}”</p>
            <footer className="mt-6 text-[11px] font-semibold uppercase tracking-[0.35em] text-slate-500">
              {item.name}
            </footer>
          </blockquote>
        ))}
      </div>
    </section>
  )
}
