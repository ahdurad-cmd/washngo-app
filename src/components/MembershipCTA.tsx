import Link from 'next/link'

export default function MembershipCTA() {
  return (
    <section className="mx-auto mt-20 max-w-5xl overflow-hidden rounded-[2.5rem] border border-slate-100 bg-gradient-to-br from-blue-50 via-white to-slate-50 p-10 text-center shadow-lg">
      <div className="mx-auto max-w-3xl space-y-6">
        <p className="text-sm font-bold uppercase tracking-widest text-blue-600">Loyalitet & klippekort</p>
        <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">Gør-det-selv vask og bilpleje på faste vilkår</h2>
        <p className="text-base text-slate-600">
          Få mere ud af både vask og bilpleje med rabatkort, klippekort og faste aftaler. Perfekt til dig, der vil holde elbilen eller firmabilen flot året rundt – med fuldt overblik over pris og forbrug.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href="/pricing" className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-8 py-4 text-base font-bold text-white transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/30">
            Se priser & klippekort
          </Link>
          <Link href="/contact" className="inline-flex items-center justify-center rounded-xl bg-white px-8 py-4 text-base font-bold text-slate-900 ring-1 ring-slate-200 transition-all hover:bg-slate-50 hover:ring-slate-300">
            Kontakt os
          </Link>
        </div>
      </div>
    </section>
  )
}
