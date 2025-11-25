const partners = [
  'Santander',
  'AL Finans',
  'Cargarantie',
  'Dansk Bilbrancheråd',
  'AutoBranchen Danmark'
]

export default function PartnerMarquee() {
  return (
    <section className="py-12 border-b border-slate-100 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <p className="text-center text-sm font-semibold leading-8 text-slate-500 uppercase tracking-widest">
          Eksklusivt partnernetværk
        </p>
        <div className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
          {partners.map((partner) => (
            <div key={partner} className="col-span-2 max-h-12 w-full object-contain lg:col-span-1 text-center">
              <span className="text-xl font-bold text-slate-400 uppercase tracking-wider hover:text-slate-600 transition-colors cursor-default">
                {partner}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
