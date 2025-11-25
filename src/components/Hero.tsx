import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export default function Hero() {
  const [budget, setBudget] = useState(3500)
  const [leasingType, setLeasingType] = useState('privat')

  return (
    <section className="relative overflow-hidden rounded-[2.5rem] bg-white shadow-2xl shadow-slate-200/50 border border-slate-100">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -mt-20 -mr-20 w-[800px] h-[800px] bg-blue-100/40 rounded-full blur-3xl mix-blend-multiply opacity-70 pointer-events-none" />
      <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-[600px] h-[600px] bg-indigo-100/40 rounded-full blur-3xl mix-blend-multiply opacity-70 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 py-16 lg:px-12 flex flex-col lg:flex-row items-center gap-16">
        <div className="max-w-2xl lg:w-1/2 z-10">
          <div className="mb-8 inline-flex animate-fade-in-up">
            <div className="relative rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 transition-all cursor-default">
              <span className="mr-2">✨</span> Nyhed: Tesla Model Y på lager
            </div>
          </div>
          
          <h1 className="text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 mb-6 leading-[1.1]">
            Eksklusiv leasing <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              & bilpleje
            </span>
          </h1>
          
          <p className="text-lg leading-relaxed text-slate-600 mb-10 max-w-lg">
            Vi tilbyder en kompromisløs helhedsløsning. Fra fleksibel leasing af markedets bedste elbiler til kosmetisk klargøring i vores topmoderne center.
          </p>
          
          {/* Smart Search Widget */}
          <div className="bg-white/80 backdrop-blur-xl p-6 rounded-3xl border border-white/60 shadow-xl shadow-blue-900/5 max-w-md">
            <div className="flex bg-slate-100/80 p-1 rounded-xl mb-6">
              <button 
                onClick={() => setLeasingType('privat')}
                className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${leasingType === 'privat' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Privat
              </button>
              <button 
                onClick={() => setLeasingType('erhverv')}
                className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${leasingType === 'erhverv' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Erhverv
              </button>
            </div>

            <div className="mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-600 font-medium">Månedligt budget</span>
                <span className="font-bold text-slate-900">Op til {budget.toLocaleString('da-DK')} kr.</span>
              </div>
              <input 
                type="range" 
                min="2000" 
                max="10000" 
                step="500" 
                value={budget}
                onChange={(e) => setBudget(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-xs text-slate-400 mt-2">
                <span>2.000 kr.</span>
                <span>10.000+ kr.</span>
              </div>
            </div>

            <Link
              href={{
                pathname: '/vehicles',
                query: { maxPrice: budget, type: leasingType }
              }}
              className="block w-full rounded-xl bg-slate-900 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-slate-900/20 hover:bg-blue-600 hover:scale-[1.02] transition-all duration-300 text-center"
            >
              Vis biler der matcher
            </Link>
          </div>

          <div className="mt-8 flex items-center gap-6 text-sm text-slate-500 font-medium">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span>Alle biler på lager</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500" />
              <span>Eget værksted</span>
            </div>
          </div>
        </div>
        
        <div className="lg:w-1/2 relative w-full hidden lg:block">
           <Link href="/vehicles" className="block relative aspect-[4/3] w-full rounded-3xl overflow-hidden shadow-2xl shadow-blue-900/10 border border-slate-100 bg-slate-100 group cursor-pointer">
             <Image
              src="/images/juniper.png"
              alt="Premium bil i showroom"
              fill
              priority
              className="object-contain p-4 group-hover:scale-105 transition-transform duration-700"
            />
            
            {/* Glassmorphism Card */}
            <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md p-6 rounded-2xl border border-white/50 shadow-lg transition-transform duration-300 group-hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Månedens Highlight</p>
                  <p className="text-lg font-bold text-slate-900">Tesla Model Y Performance</p>
                </div>
                <div className="h-10 w-10 rounded-full bg-slate-900 flex items-center justify-center text-white shadow-md group-hover:bg-blue-600 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </div>
              </div>
            </div>
           </Link>
           
           {/* Decorative elements */}
           <div className="absolute -top-12 -right-12 w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full blur-2xl opacity-20" />
           <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full blur-2xl opacity-20" />
        </div>
      </div>
    </section>
  )
}
