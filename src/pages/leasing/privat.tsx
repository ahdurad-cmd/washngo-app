import Link from 'next/link'
import Footer from '../../components/Footer'
import Header from '../../components/Header'

export default function PrivatLeasing() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <main className="relative overflow-hidden">
        <div className="relative z-10 pt-6 pb-16 container mx-auto px-4">
          {/* Hero Section */}
          <div className="relative overflow-hidden rounded-[2.5rem] bg-white shadow-2xl shadow-slate-200/50 border border-slate-100 px-6 py-24 text-center mb-20">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 -mt-20 -mr-20 w-[600px] h-[600px] bg-blue-100/40 rounded-full blur-3xl mix-blend-multiply opacity-70 pointer-events-none" />
            <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-[500px] h-[500px] bg-indigo-100/40 rounded-full blur-3xl mix-blend-multiply opacity-70 pointer-events-none" />

            <div className="relative z-10 max-w-3xl mx-auto">
              <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-600 ring-1 ring-inset ring-blue-600/20 mb-6">
                Leasing
              </span>
              <h1 className="text-4xl md:text-6xl font-bold text-slate-900 tracking-tight mb-6">
                Privatleasing <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  Budgetsikkerhed & Frihed
                </span>
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed">
                Kør i din drømmebil uden bekymringer om værditab og uforudsete værkstedsregninger. 
                Med privatleasing kender du dine månedlige omkostninger.
              </p>
            </div>
          </div>

          <div className="container mx-auto px-4 max-w-4xl">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 md:p-12 mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Hvad er privatleasing?</h2>
              <div className="space-y-6 text-slate-600 leading-relaxed">
                <p>
                  Privatleasing er en fleksibel løsning for dig, der ønsker at køre i en ny eller nyere bil uden at binde dig til det fulde ejerskab. 
                  Hos WashNGo tilbyder vi både <strong>finansiel leasing</strong> og <strong>operationel leasing</strong>, så du kan vælge den form, der passer bedst til din økonomi og dit temperament.
                </p>
                <p>
                  Uanset om du drømmer om en elbil til pendling, en rummelig familiebil eller en bil med ekstra køreglæde, hjælper vi dig med at finde den rette løsning.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm">1</span>
                  Finansiel Leasing
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  Også kendt som "flexleasing". Her får du den laveste månedlige ydelse og størst fleksibilitet.
                </p>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-green-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    <span>Lav udbetaling og månedlig ydelse</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-green-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    <span>Du står selv for vedligeholdelse</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-green-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    <span>Du anviser køber ved udløb (restværdi)</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm">2</span>
                  Operationel Leasing
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  Total tryghed og budgetsikkerhed. Du kender alle dine udgifter på forhånd.
                </p>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-green-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    <span>Service og reparationer er inkluderet</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-green-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    <span>Ingen risiko for værditab</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-green-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    <span>Aflever blot bilen tilbage ved udløb</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-slate-900 rounded-2xl p-8 md:p-12 text-center">
              <h2 className="text-2xl font-bold text-white mb-4">Klar til at komme i gang?</h2>
              <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
                Vi tager altid udgangspunkt i dig og din situation. Hvor meget kører du om året? Ønsker du kort eller lang løbetid? 
                Vi hjælper dig med at afklare dine muligheder.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact" className="inline-flex items-center justify-center px-8 py-4 bg-white text-slate-900 font-bold rounded-xl hover:bg-slate-100 transition-colors">
                  Kontakt os for rådgivning
                </Link>
                <Link href="/vehicles" className="inline-flex items-center justify-center px-8 py-4 bg-slate-800 text-white font-bold rounded-xl hover:bg-slate-700 transition-colors border border-slate-700">
                  Se aktuelle biler
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
