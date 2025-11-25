import React from 'react'
import Link from 'next/link'

const steps = [
  {
    id: '1',
    title: 'Første snak',
    description: 'Vi tager en uforpligtende snak om dine ønsker, kørselsbehov og budget – enten online eller i vores lounge.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    )
  },
  {
    id: '2',
    title: 'Valg af bil',
    description: 'Vi finder de bedste match til dig og rådgiver om rækkevidde, udstyr og den samlede økonomi.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    )
  },
  {
    id: '3',
    title: 'Aftale & bytte',
    description: 'Vi skræddersyr finansiering eller leasing og giver en skarp pris på din nuværende bil i bytte.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    )
  },
  {
    id: '4',
    title: 'Klar til start',
    description: 'Din nye bil leveres topklargjort med grundig intro til opladning og vores vaskefaciliteter.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
      </svg>
    )
  }
]

export default function ExperienceTimeline() {
  return (
    <section className="relative py-32 overflow-hidden bg-slate-50/50">
      {/* Background Decorations */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-7xl pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl mix-blend-multiply opacity-40" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-100/50 rounded-full blur-3xl mix-blend-multiply opacity-40" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-600 ring-1 ring-inset ring-blue-600/20 mb-4">
            Processen
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6">
            Fra første tanke til <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">køreglæde</span>
          </h2>
          <p className="text-xl text-slate-600 leading-relaxed">
            Vi har gjort det nemt og gennemskueligt at skifte bil. Vi holder dig i hånden hele vejen – fra valg af model til den første vask.
          </p>
        </div>

        <div className="relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden lg:block absolute top-12 left-16 right-16 h-0.5 bg-gradient-to-r from-slate-200 via-blue-200 to-slate-200 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
            {steps.map((step) => (
              <div key={step.id} className="group relative">
                {/* Icon Bubble */}
                <div className="relative mx-auto w-24 h-24 bg-white rounded-full shadow-xl shadow-blue-900/5 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300 border-4 border-slate-50 group-hover:border-blue-50 z-10">
                  <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                    {step.icon}
                  </div>
                  {/* Step Number Badge */}
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-slate-900 text-white rounded-full flex items-center justify-center text-sm font-bold border-4 border-white shadow-sm">
                    {step.id}
                  </div>
                </div>

                {/* Content Card */}
                <div className="text-center bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-slate-100 hover:bg-white hover:shadow-xl hover:shadow-blue-900/10 transition-all duration-300 group-hover:-translate-y-2">
                  <h3 className="text-lg font-bold text-slate-900 mb-3">{step.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <Link href="/contact" className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white transition-all duration-200 bg-slate-900 rounded-full hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-900/20 hover:-translate-y-1 group">
            Start din rejse her
            <svg className="w-5 h-5 ml-2 -mr-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
