import { useState } from 'react'
import Link from 'next/link'

const Icons = {
  CheckCircle: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
    </svg>
  ),
  ArrowRight: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
    </svg>
  )
}

export default function PriceCheckSection() {
  const [licensePlate, setLicensePlate] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`Vi tjekker prisen for nummerplade: ${licensePlate}`)
  }

  return (
    <section className="py-24 bg-slate-900 relative overflow-hidden rounded-[2.5rem] mx-4 sm:mx-6 lg:mx-8 shadow-2xl shadow-slate-900/20">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-30 pointer-events-none">
        <div className="absolute -top-24 -right-24 w-[500px] h-[500px] rounded-full bg-blue-600 blur-[100px] mix-blend-screen"></div>
        <div className="absolute -bottom-24 -left-24 w-[500px] h-[500px] rounded-full bg-indigo-600 blur-[100px] mix-blend-screen"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center rounded-full bg-blue-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-400 ring-1 ring-inset ring-blue-400/20 mb-6">
              Spar penge på leasing
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              Tjek prisen på din <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                nuværende aftale
              </span>
            </h2>
            <p className="text-lg text-slate-300 mb-8 leading-relaxed max-w-lg">
              Er du i tvivl om du betaler for meget? Indtast din nummerplade, så laver vi et uforpligtende pristjek af din nuværende aftale. Vi finder ofte besparelser på 10-20%.
            </p>
            
            <ul className="space-y-4 mb-8">
              {[
                'Gratis og uforpligtende gennemgang',
                'Svar inden for 24 timer',
                'Mulighed for billigere forsikring'
              ].map((item, i) => (
                <li key={i} className="flex items-center text-slate-300 font-medium">
                  <div className="mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-blue-500/20 text-blue-400">
                    <Icons.CheckCircle size={14} />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-2xl shadow-black/20 border border-white/10 relative overflow-hidden">
            
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div>
                <label htmlFor="license-plate" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 ml-1">
                  Nummerplade
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none z-10">
                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 37 28" className="h-5 w-auto shadow-sm ring-1 ring-black/5 rounded-[1px]">
                       <path fill="#C8102E" d="M0 0h37v28H0z"/>
                       <path fill="#fff" d="M10 0h4v28h-4zM0 12h37v4H0z"/>
                     </svg>
                  </div>
                  <input
                    type="text"
                    id="license-plate"
                    value={licensePlate}
                    onChange={(e) => setLicensePlate(e.target.value)}
                    placeholder="AB 12 345"
                    className="w-full rounded-xl border-2 border-[#C8102E] bg-slate-50 px-4 py-4 text-lg text-slate-900 placeholder:text-slate-300 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 pl-14 uppercase tracking-[0.3em] font-mono font-bold shadow-sm"
                    required
                  />
                </div>
              </div>
              
              <button 
                type="submit"
                className="w-full bg-slate-900 hover:bg-blue-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center group shadow-lg shadow-slate-900/20 hover:shadow-blue-600/30 hover:-translate-y-0.5"
              >
                Få et pristjek nu
                <Icons.ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </button>
              
              <p className="text-xs text-center text-slate-400 mt-4">
                Ved at indsende accepterer du at vi må kontakte dig med et tilbud.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
