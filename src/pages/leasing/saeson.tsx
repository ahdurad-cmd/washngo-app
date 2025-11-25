import Link from 'next/link'
import Footer from '../../components/Footer'
import Header from '../../components/Header'

export default function SaesonLeasing() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <main className="relative overflow-hidden">
        <div className="relative z-10 pt-6 pb-16 container mx-auto px-4">
          {/* Hero Section */}
          <div className="relative overflow-hidden rounded-[2.5rem] bg-white shadow-2xl shadow-slate-200/50 border border-slate-100 px-6 py-24 text-center mb-20">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 -mt-20 -mr-20 w-[600px] h-[600px] bg-indigo-100/40 rounded-full blur-3xl mix-blend-multiply opacity-70 pointer-events-none" />
            <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-[500px] h-[500px] bg-purple-100/40 rounded-full blur-3xl mix-blend-multiply opacity-70 pointer-events-none" />

            <div className="relative z-10 max-w-3xl mx-auto">
              <span className="inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-indigo-600 ring-1 ring-inset ring-indigo-600/20 mb-6">
                Leasing
              </span>
              <h1 className="text-4xl md:text-6xl font-bold text-slate-900 tracking-tight mb-6">
                Sæsonleasing <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                  Kørsel på Dine Vilkår
                </span>
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed">
                Betal kun registreringsafgift i de måneder, du bruger bilen. 
                Perfekt til sommerbilen, motorcyklen eller autocamperen.
              </p>
            </div>
          </div>

          <div className="container mx-auto px-4 max-w-4xl">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 md:p-12 mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Kør kun når det giver mening</h2>
              <div className="space-y-6 text-slate-600 leading-relaxed">
                <p>
                  Sæsonleasing er den perfekte løsning for dig, der drømmer om en cabriolet til sommerhalvåret, en motorcykel til de varme måneder, eller en stor SUV til vinteren.
                </p>
                <p>
                  Med sæsonleasing betaler du kun registreringsafgift i de måneder, hvor køretøjet har nummerplader på. 
                  Resten af året står køretøjet på en stilstandsaftale til en meget lav månedlig ydelse.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Fordele ved sæsonleasing</h3>
                <ul className="space-y-4">
                  <li className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">Lavere omkostninger</h4>
                      <p className="text-xs text-slate-500 mt-1">Spar registreringsafgiften i de måneder, bilen står stille.</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">Fleksibel periode</h4>
                      <p className="text-xs text-slate-500 mt-1">Du bestemmer selv, hvor mange måneder du vil køre (typisk 5-9 mdr).</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">Bil & Motorcykel</h4>
                      <p className="text-xs text-slate-500 mt-1">Vi tilbyder sæsonleasing på både eksklusive biler og motorcykler.</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Hvordan fungerer det?</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-sm shrink-0">1</div>
                    <p className="text-sm text-slate-600">Vi laver en leasingaftale for 12 måneder, opdelt i en aktiv og passiv periode.</p>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-sm shrink-0">2</div>
                    <p className="text-sm text-slate-600">I den aktive periode betaler du fuld ydelse inkl. afgift. Du har nummerplader på.</p>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-sm shrink-0">3</div>
                    <p className="text-sm text-slate-600">I den passive periode betaler du kun en lav stilstandsydelse. Bilen skal stå afmeldt.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 rounded-2xl p-8 md:p-12 text-center">
              <h2 className="text-2xl font-bold text-white mb-4">Klar til sommerbilen?</h2>
              <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
                Vi hjælper dig med at finde den helt rigtige sæsonbil og skræddersyer perioden, så den passer til dine planer.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact" className="inline-flex items-center justify-center px-8 py-4 bg-white text-slate-900 font-bold rounded-xl hover:bg-slate-100 transition-colors">
                  Få et tilbud på sæsonleasing
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
