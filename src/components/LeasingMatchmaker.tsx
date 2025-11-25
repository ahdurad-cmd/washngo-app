import { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import vehiclesData from '../../data/vehicles.json'

type Step = 'usage' | 'budget' | 'type' | 'result'

export default function LeasingMatchmaker() {
  const [step, setStep] = useState<Step>('usage')
  const [answers, setAnswers] = useState({
    usage: '',
    budget: 0,
    type: ''
  })

  const matchedVehicle = useMemo(() => {
    if (step !== 'result') return null
    
    // Parse price string "3.495 kr." -> 3495
    const parsePrice = (priceStr: string) => {
      return parseInt(priceStr.replace(/[^0-9]/g, ''))
    }

    // 1. Filter by Type first (Strict)
    let typeMatches = vehiclesData.filter(v => {
       // Map stationcar to SUV if no stationcars exist, or keep strict if you have data
       if (answers.type === 'stationcar') return v.bodyType === 'suv' || v.bodyType === 'stationcar'
       return v.bodyType === answers.type
    })

    // If no type matches found at all, fallback to all vehicles to avoid empty result
    if (typeMatches.length === 0) typeMatches = vehiclesData

    // 2. Filter by Budget
    const budgetMatches = typeMatches.filter(v => {
      const price = parsePrice(v.monthlyPrice)
      
      // Strict ranges based on the new options
      if (answers.budget === 3800) return price <= 3800
      if (answers.budget === 4500) return price > 3800 && price <= 4500
      if (answers.budget === 6000) return price > 4500 && price <= 6000
      if (answers.budget === 20000) return price > 6000
      
      return true
    })

    if (budgetMatches.length > 0) {
      // Sort by price descending to show the "best" car in that range
      return budgetMatches.sort((a, b) => parsePrice(b.monthlyPrice) - parsePrice(a.monthlyPrice))[0]
    }

    // 3. Fallback: Find the closest match by price if no exact range match
    // This shouldn't happen often if ranges cover all cars, but good for safety
    return typeMatches.sort((a, b) => {
      const priceA = parsePrice(a.monthlyPrice)
      const priceB = parsePrice(b.monthlyPrice)
      const diffA = Math.abs(priceA - answers.budget)
      const diffB = Math.abs(priceB - answers.budget)
      return diffA - diffB
    })[0]

  }, [step, answers])

  const handleAnswer = (key: string, value: any) => {
    setAnswers(prev => ({ ...prev, [key]: value }))
    
    if (key === 'usage') setStep('budget')
    if (key === 'budget') setStep('type')
    if (key === 'type') setStep('result')
  }

  const reset = () => {
    setStep('usage')
    setAnswers({ usage: '', budget: 0, type: '' })
  }

  return (
    <section className="py-16 relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="bg-[#0B1120]/95 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden border border-white/10">
          {/* Background Effects */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

          <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Column: Text & Progress */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold uppercase tracking-wider mb-6 border border-blue-500/20">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                Leasing Matchmaker
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">Find din drømmebil <br/><span className="text-blue-500">på 30 sekunder</span></h2>
              <p className="text-slate-400 text-lg mb-8 max-w-md">Svar på 3 simple spørgsmål, så finder vores algoritme den perfekte bil til dit behov og budget.</p>

              {/* Progress Bar */}
              {step !== 'result' && (
                <div className="w-full max-w-md bg-white/5 h-1.5 rounded-full mb-8 overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 transition-all duration-500 ease-out shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                    style={{ 
                      width: step === 'usage' ? '33%' : step === 'budget' ? '66%' : '100%' 
                    }}
                  />
                </div>
              )}
            </div>

            {/* Right Column: Interactive Area */}
            <div className="bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 p-8 min-h-[400px] flex flex-col justify-center transition-all duration-500 shadow-xl">

            {/* Step 1: Usage */}
            {step === 'usage' && (
              <div className="animate-fade-in-up">
                <h3 className="text-xl font-bold text-white mb-6 text-center">Hvad skal bilen bruges til?</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button 
                    onClick={() => handleAnswer('usage', 'privat')}
                    className="group p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-blue-600 hover:border-blue-500 transition-all text-left flex items-center gap-4"
                  >
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-xl group-hover:bg-white/20 flex-shrink-0">🏠</div>
                    <div>
                      <div className="font-bold text-white text-base">Privatleasing</div>
                      <div className="text-slate-400 text-xs group-hover:text-blue-100">Alt inklusiv</div>
                    </div>
                  </button>
                  <button 
                    onClick={() => handleAnswer('usage', 'erhverv')}
                    className="group p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-blue-600 hover:border-blue-500 transition-all text-left flex items-center gap-4"
                  >
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-xl group-hover:bg-white/20 flex-shrink-0">💼</div>
                    <div>
                      <div className="font-bold text-white text-base">Erhvervsleasing</div>
                      <div className="text-slate-400 text-xs group-hover:text-blue-100">Attraktiv skat</div>
                    </div>
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Budget */}
            {step === 'budget' && (
              <div className="animate-fade-in-up">
                <h3 className="text-xl font-bold text-white mb-6 text-center">Hvad er dit månedlige budget?</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { label: 'Under 3.800', val: 3800 },
                    { label: '3.800 - 4.500', val: 4500 },
                    { label: '4.500 - 6.000', val: 6000 },
                    { label: 'Over 6.000', val: 20000 }
                  ].map((opt) => (
                    <button
                      key={opt.val}
                      onClick={() => handleAnswer('budget', opt.val)}
                      className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-blue-600 hover:border-blue-500 transition-all text-center font-bold text-white text-sm"
                    >
                      {opt.label} kr.
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Type */}
            {step === 'type' && (
              <div className="animate-fade-in-up">
                <h3 className="text-xl font-bold text-white mb-6 text-center">Hvilken type bil foretrækker du?</h3>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'suv', label: 'SUV', icon: '🚙' },
                    { id: 'sedan', label: 'Sedan', icon: '🚗' },
                    { id: 'stationcar', label: 'St.car', icon: '🚐' }
                  ].map((type) => (
                    <button
                      key={type.id}
                      onClick={() => handleAnswer('type', type.id)}
                      className="group p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-blue-600 hover:border-blue-500 transition-all text-center"
                    >
                      <div className="text-2xl mb-2 transform group-hover:scale-110 transition-transform">{type.icon}</div>
                      <div className="font-bold text-white text-sm">{type.label}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Result */}
            {step === 'result' && matchedVehicle && (
              <div className="animate-fade-in-up text-center">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-green-500/30">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Vi fandt det perfekte match!</h3>
                <p className="text-slate-400 mb-6 text-sm">Baseret på dine valg anbefaler vi:</p>
                
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 mb-8 text-left flex items-center gap-6 shadow-xl border border-white/10 transform transition-transform hover:scale-[1.02]">
                  <div className="relative w-48 h-32 bg-slate-800 rounded-xl overflow-hidden flex-shrink-0 shadow-inner">
                    <Image 
                      src="/images/washngo-coming-soon.png?v=2" 
                      alt={matchedVehicle.model} 
                      fill 
                      className="object-cover hover:scale-110 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <div className="flex-grow">
                    <div className="inline-block px-2 py-1 rounded bg-blue-500/20 text-blue-300 text-[10px] font-bold uppercase tracking-wider mb-2 border border-blue-500/30">
                      {matchedVehicle.make}
                    </div>
                    <h4 className="text-2xl font-bold text-white mb-1">{matchedVehicle.model}</h4>
                    <div className="text-slate-400 text-sm mb-3">{matchedVehicle.year} • {matchedVehicle.bodyType}</div>
                    <div className="text-xl font-bold text-blue-400">{matchedVehicle.monthlyPrice} <span className="text-sm text-slate-500 font-normal">/md</span></div>
                  </div>
                  <div className="hidden sm:block">
                    <Link href={`/vehicles/${matchedVehicle.id}`} className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/30 group">
                      <svg className="w-6 h-6 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                    </Link>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Link href="/vehicles" className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-colors text-sm shadow-lg shadow-blue-600/20">
                    Se alle biler
                  </Link>
                  <button onClick={reset} className="text-slate-500 hover:text-white text-xs font-medium transition-colors py-2">
                    Prøv igen
                  </button>
                </div>
              </div>
            )}

          </div>
          </div>
        </div>
      </div>
    </section>
  )
}
