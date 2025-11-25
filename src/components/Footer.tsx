import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="mt-24 bg-slate-50 text-slate-600 border-t border-slate-200">
      <div className="relative mx-auto grid max-w-6xl gap-10 px-6 py-16 text-sm md:grid-cols-4">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-900 text-lg font-bold text-white">
              WB
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold uppercase tracking-wider text-slate-900">WashNGo</span>
              <span className="text-[10px] font-medium text-slate-500 uppercase tracking-widest">BilCenter</span>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-slate-600">
            Danmarks største gør-det-selv vaskeanlæg kombineret med elbiler til salg, professionel bilpleje og tryg rådgivning om finansiering og leasing.
          </p>
          <div className="text-xs text-slate-500">Atletikvej 9 · 9230 Svenstrup J</div>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-bold text-slate-900">Kontakt</h3>
          <p>Atletikvej 9, 9230 Svenstrup J</p>
          <p>
            <a href="tel:+4521759149" className="hover:text-blue-600 transition-colors">+45 21 75 91 49</a>
          </p>
          <p>
            <a href="mailto:info@washngo.dk" className="hover:text-blue-600 transition-colors">info@washngo.dk</a>
          </p>
          <p className="text-xs text-slate-500">
            Butik: Ons–Fre 08.00–16.00 · Lør 10.00–15.00<br />
            Gør-det-selv vask: døgnåbent
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-bold text-slate-900">Navigation</h3>
          <ul className="space-y-2">
            <li><Link href="/services" className="hover:text-blue-600 transition-colors">Bilpleje & services</Link></li>
            <li><Link href="/vehicles" className="hover:text-blue-600 transition-colors">Elbiler til salg</Link></li>
            <li><Link href="/pricing" className="hover:text-blue-600 transition-colors">Priser & klippekort</Link></li>
            <li><Link href="/privacy" className="hover:text-blue-600 transition-colors">Privatlivspolitik</Link></li>
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-900">Nyhedsbrev</h3>
          <p className="text-sm text-slate-600">
            Få besked om nye elbiler og gode tilbud.
          </p>
          <form className="space-y-3">
            <label htmlFor="newsletter-email" className="sr-only">Email</label>
            <input
              id="newsletter-email"
              type="email"
              placeholder="Din emailadresse"
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
            <button type="submit" className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-blue-700 transition-colors">Tilmeld</button>
          </form>
        </div>
      </div>

      <div className="border-t border-slate-200">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-6 text-xs text-slate-500 md:flex-row">
          <span>© {new Date().getFullYear()} WashNGo BilCenter. Alle rettigheder forbeholdes.</span>
          <span>CVR: 12345678</span>
        </div>
      </div>
    </footer>
  )
}
