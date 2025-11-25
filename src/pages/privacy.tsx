import Header from '../components/Header'
import Footer from '../components/Footer'
import SEO from '../components/SEO'

export default function Privacy() {
  return (
    <div className="min-h-screen bg-slate-50">
      <SEO title="Privatlivspolitik" description="WashNGo privatlivspolitik og datahåndtering." />
      <Header />
      
      <main className="relative overflow-hidden">
        <div className="relative z-10 pt-6 pb-16 container mx-auto px-4">
          {/* Hero Section */}
          <div className="relative overflow-hidden rounded-[2.5rem] bg-white shadow-2xl shadow-slate-200/50 border border-slate-100 px-6 py-24 text-center mb-20">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 -mt-20 -mr-20 w-[600px] h-[600px] bg-blue-100/40 rounded-full blur-3xl mix-blend-multiply opacity-60 pointer-events-none" />
            <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-[500px] h-[500px] bg-indigo-100/40 rounded-full blur-3xl mix-blend-multiply opacity-60 pointer-events-none" />

            <div className="relative z-10 max-w-3xl mx-auto">
              <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-600 ring-1 ring-inset ring-blue-600/20 mb-6">
                Juridisk
              </span>
              <h1 className="text-4xl md:text-6xl font-bold text-slate-900 tracking-tight mb-6">
                Privatlivs<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  politik
                </span>
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed">
                Denne privatlivspolitik forklarer hvordan WashNGo indsamler, bruger og beskytter dine persondata.
              </p>
            </div>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                <h2 className="text-xl font-bold text-slate-900 mb-4">Data vi indsamler</h2>
                <ul className="space-y-2 text-slate-600 list-disc list-inside">
                  <li>Kontaktoplysninger (navn, e-mail, telefon) ved booking og kontaktformular.</li>
                  <li>Bookingdetaljer (dato, tid, besked).</li>
                  <li>IP-adresse og cookie-data hvis analytics aktiveres.</li>
                </ul>
              </section>

              <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                <h2 className="text-xl font-bold text-slate-900 mb-4">Hvordan vi bruger data</h2>
                <p className="text-slate-600 leading-relaxed">
                  Data bruges udelukkende til at behandle bookingforespørgsler, besvare henvendelser samt forbedre service. 
                  Vi deler ikke data med tredjeparter medmindre det er nødvendigt for servicelevering eller lovkrav.
                </p>
              </section>

              <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                <h2 className="text-xl font-bold text-slate-900 mb-4">Cookies og analytics</h2>
                <p className="text-slate-600 leading-relaxed">
                  Vi anbefaler brug af en privatlivsvenlig analytics-løsning (fx Plausible). Du kan slå analytics til via miljøvariabler i deployment.
                </p>
              </section>

              <section className="bg-blue-50 p-6 rounded-2xl border border-blue-100 text-sm text-blue-800">
                <p>
                  Har du spørgsmål til vores behandling af dine data, er du altid velkommen til at kontakte os.
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
