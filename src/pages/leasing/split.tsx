import Link from 'next/link'
import Footer from '../../components/Footer'
import Header from '../../components/Header'

export default function SplitLeasing() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <main className="relative overflow-hidden">
        <div className="relative z-10 pt-6 pb-16 container mx-auto px-4">
          {/* Hero Section */}
          <div className="relative overflow-hidden rounded-[2.5rem] bg-white shadow-2xl shadow-slate-200/50 border border-slate-100 px-6 py-24 text-center mb-20">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 -mt-20 -mr-20 w-[600px] h-[600px] bg-sky-100/40 rounded-full blur-3xl mix-blend-multiply opacity-70 pointer-events-none" />
            <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-3xl mix-blend-multiply opacity-70 pointer-events-none" />

            <div className="relative z-10 max-w-3xl mx-auto">
              <span className="inline-flex items-center rounded-full bg-sky-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-sky-600 ring-1 ring-inset ring-sky-600/20 mb-6">
                Leasing
              </span>
              <h1 className="text-4xl md:text-6xl font-bold text-slate-900 tracking-tight mb-6">
                Splitleasing <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-blue-600">
                  Det Bedste af To Verdener
                </span>
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed">
                Undgå beskatning af fri bil ved at dele leasingkontrakten op. 
                Betal kun for de kilometer du kører privat, og lad firmaet betale for erhvervskørslen.
              </p>
            </div>
          </div>

          <div className="container mx-auto px-4 max-w-4xl">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 md:p-12 mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Én bil, to formål – uden beskatning</h2>
              <div className="space-y-6 text-slate-600 leading-relaxed">
                <p>
                  Med splitleasing får du mulighed for at bruge den samme bil til både arbejde og privat, uden at det udløser firmabilsbeskatning. 
                  Du og virksomheden indgår hver sin leasingaftale på den samme bil.
                </p>
                <p>
                  Alle omkostninger fordeles efter den konkrete fordelingsnøgle – altså hvor meget bilen bruges til henholdsvis arbejde og i privaten. 
                  Dette registreres automatisk via en GPS-tracker.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 text-center">
                <div className="w-12 h-12 mx-auto bg-sky-100 rounded-full flex items-center justify-center text-sky-600 mb-4">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <h3 className="font-bold text-slate-900 mb-2">Ingen beskatning</h3>
                <p className="text-sm text-slate-500">Du undgår firmabilbeskatning, fordi privat og erhvervsmæssig kørsel afregnes hver for sig.</p>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 text-center">
                <div className="w-12 h-12 mx-auto bg-sky-100 rounded-full flex items-center justify-center text-sky-600 mb-4">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                </div>
                <h3 className="font-bold text-slate-900 mb-2">Fair fordeling</h3>
                <p className="text-sm text-slate-500">Du og virksomheden betaler kun for jeres faktiske brug, baseret på GPS-data.</p>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 text-center">
                <div className="w-12 h-12 mx-auto bg-sky-100 rounded-full flex items-center justify-center text-sky-600 mb-4">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <h3 className="font-bold text-slate-900 mb-2">Nem administration</h3>
                <p className="text-sm text-slate-500">Vi sørger for alt det praktiske med GPS-tracker og automatisk opdeling af regninger.</p>
              </div>
            </div>

            <div className="bg-slate-900 rounded-2xl p-8 md:p-12 text-center">
              <h2 className="text-2xl font-bold text-white mb-4">Er splitleasing noget for dig?</h2>
              <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
                Splitleasing betaler sig typisk, hvis du kører meget erhvervsmæssigt (over 60%) og ønsker en dyrere bil, hvor beskatningen ellers ville være høj.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact" className="inline-flex items-center justify-center px-8 py-4 bg-white text-slate-900 font-bold rounded-xl hover:bg-slate-100 transition-colors">
                  Beregn din besparelse
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
