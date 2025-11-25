import Link from 'next/link'
import Footer from '../../components/Footer'
import Header from '../../components/Header'

export default function ErhvervsLeasing() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <main className="relative overflow-hidden">
        <div className="relative z-10 pt-6 pb-16 container mx-auto px-4">
          {/* Hero Section */}
          <div className="relative overflow-hidden rounded-[2.5rem] bg-white shadow-2xl shadow-slate-200/50 border border-slate-100 px-6 py-24 text-center mb-20">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 -mt-20 -mr-20 w-[600px] h-[600px] bg-slate-100/40 rounded-full blur-3xl mix-blend-multiply opacity-70 pointer-events-none" />
            <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-[500px] h-[500px] bg-gray-100/40 rounded-full blur-3xl mix-blend-multiply opacity-70 pointer-events-none" />

            <div className="relative z-10 max-w-3xl mx-auto">
              <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-slate-600 ring-1 ring-inset ring-slate-600/20 mb-6">
                Leasing
              </span>
              <h1 className="text-4xl md:text-6xl font-bold text-slate-900 tracking-tight mb-6">
                Erhvervsleasing <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-600 to-gray-600">
                  Effektiv Flådestyring
                </span>
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed">
                Optimér din virksomheds likviditet og få adgang til en moderne vognpark. 
                Vi tilbyder skræddersyede løsninger til både små og store virksomheder.
              </p>
            </div>
          </div>

          <div className="container mx-auto px-4 max-w-4xl">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 md:p-12 mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Skræddersyet leasing til din virksomhed</h2>
              <div className="space-y-6 text-slate-600 leading-relaxed">
                <p>
                  Uanset om din virksomhed har brug for én bil eller en hel flåde, hjælper vi dig med at finde den rette løsning. 
                  Hos WashNGo kan både enkeltmandsvirksomheder og større selskaber lease biler – tilpasset jeres behov, budget og kørselsmønstre.
                </p>
                <p>
                  Vi arbejder med både finansiel og operationel leasing og sammensætter altid aftalen ud fra, hvordan bilen skal bruges i praksis. 
                  Det sikrer jer den mest økonomiske og fleksible løsning.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Fordele ved erhvervsleasing</h3>
                <ul className="space-y-4">
                  <li className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">Bedre likviditet</h4>
                      <p className="text-xs text-slate-500 mt-1">Ingen store engangsbeløb binder kapitalen i virksomheden.</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">Fuld fradragsret</h4>
                      <p className="text-xs text-slate-500 mt-1">Leasingydelsen kan trækkes fra i regnskabet.</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">Større fleksibilitet</h4>
                      <p className="text-xs text-slate-500 mt-1">Skift bil eller justér antallet i takt med forretningens udvikling.</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Finansiel eller Operationel?</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-slate-50 rounded-xl">
                    <h4 className="font-bold text-slate-900 text-sm mb-1">Finansiel Leasing</h4>
                    <p className="text-xs text-slate-600">Giver mere frihed. I har selv ansvaret for drift og restværdi, mod en lavere månedlig ydelse.</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-xl">
                    <h4 className="font-bold text-slate-900 text-sm mb-1">Operationel Leasing</h4>
                    <p className="text-xs text-slate-600">Løsningen uden bekymringer. Service og vedligeholdelse er inkluderet, og I skal ikke tænke på restværdi.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 rounded-2xl p-8 md:p-12 text-center">
              <h2 className="text-2xl font-bold text-white mb-4">Få et uforpligtende tilbud</h2>
              <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
                Vi rådgiver dig hele vejen og sikrer, at du får en leasingaftale, der matcher din virksomheds behov.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact" className="inline-flex items-center justify-center px-8 py-4 bg-white text-slate-900 font-bold rounded-xl hover:bg-slate-100 transition-colors">
                  Kontakt erhvervsafdeling
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
