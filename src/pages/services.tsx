import Link from 'next/link'
import Footer from '../components/Footer'
import Header from '../components/Header'
import services from '../../data/services.json'

// Simple SVG Icons
const CheckIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="20 6 9 17 4 12"/></svg>
)

const StarIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
)

export default function Services() {
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
                Professionel Bilpleje
              </span>
              <h1 className="text-4xl md:text-6xl font-bold text-slate-900 tracking-tight mb-6">
                Giv din bil <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  nyt liv
                </span>
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed">
                Vælg mellem klare pakker til indvendig og udvendig rengøring, udvidet klargøring, olieskift og dækskifte. 
                Vi bruger kun de bedste produkter på markedet.
              </p>
            </div>
          </div>

        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-20">
            {services.map((service: any, index: number) => (
              <div
                key={service.id}
                className="group relative flex flex-col bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <div className="p-6 flex flex-col h-full">
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                      Bilpleje service
                    </span>
                    {index === 0 && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700">
                        <StarIcon className="w-3 h-3" /> Populær
                      </span>
                    )}
                  </div>
                  
                  <h2 className="text-xl font-bold text-slate-900 mb-2">{service.title}</h2>
                  <p className="text-slate-600 text-sm mb-6">{service.desc}</p>
                  
                  <div className="mt-auto space-y-4">
                    <div className="bg-slate-50 rounded-xl p-4">
                      <ul className="space-y-2">
                        {service.id === 'interior-clean' && [
                          'Støvsugning af hele kabinen',
                          'Rens og aftørring af overflader',
                          'Rengøring af måtter og dørfalser',
                          'Pudsing af ruder indvendigt'
                        ].map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                            <CheckIcon className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                        
                        {service.id === 'in-out-clean' && [
                          'Indvendig rengøring som ovenfor',
                          'Skånsom håndvask af karrosseri',
                          'Fælgrens og dæk rengøring',
                          'Skumforvask og lakbeskyttelse'
                        ].map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                            <CheckIcon className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}

                        {service.id === 'extended-detail' && [
                          'Udvidet ind-/udvendig rengøring',
                          'Sæderens og pletfjerning',
                          'Plast- og interiørbehandling',
                          'Flyverust- og tjærefjernelse'
                        ].map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                            <CheckIcon className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}

                        {service.id === 'tire-change' && [
                          'Skift mellem sommer- og vinterhjul',
                          'Kontrol af dæktryk og mønsterdybde',
                          'Efterspænding af hjulbolte',
                          'Kort visuel gennemgang af dæk'
                        ].map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                            <CheckIcon className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}

                        {service.id === 'oil-change' && [
                          'Olieskift med kvalitetsolie',
                          'Udskiftning af oliefilter',
                          'Kort visuelt tjek af vitale punkter',
                          'Gennemgang af næste serviceinterval'
                        ].map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                            <CheckIcon className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}

                        {service.id === 'express-wash' && [
                          'Hurtig, skånsom håndvask',
                          'Fælgrens og skyl',
                          'Aftørring af bilen',
                          'Let dækshine'
                        ].map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                            <CheckIcon className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {service.price && (
                      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                        <span className="text-sm text-slate-500">Fra pris</span>
                        <span className="text-lg font-bold text-slate-900">{service.price}</span>
                      </div>
                    )}
                    
                    <Link 
                      href="/booking" 
                      className="block w-full py-3 px-4 bg-slate-900 text-white text-center text-sm font-medium rounded-xl hover:bg-slate-800 transition-colors"
                    >
                      Bestil tid
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pricing Overview */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 md:p-12 mb-20">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-light text-slate-900 mb-4">
                Kort overblik over <span className="font-semibold">pakker & priser</span>
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Gennemskuelige priser uden skjulte gebyrer. Alle priser er inkl. moms.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {[
                { title: 'Indvendig', desc: 'Indvendig rengøring', price: 'Fra 595 kr' },
                { title: 'Ind/udvendig', desc: 'Ind- og udvendig rengøring', price: 'Fra 895 kr' },
                { title: 'Klargøring', desc: 'Udvidet klargøring', price: 'Fra 1.595 kr' },
                { title: 'Dæk', desc: 'Dækskifte & hjulskift', price: 'Fra 399 kr' }
              ].map((item, i) => (
                <div key={i} className="bg-slate-50 rounded-xl p-6 text-center hover:bg-blue-50 transition-colors duration-300 group">
                  <div className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2">{item.title}</div>
                  <div className="font-semibold text-slate-900 mb-1">{item.desc}</div>
                  <div className="text-slate-500 group-hover:text-blue-700 transition-colors">{item.price}</div>
                </div>
              ))}
            </div>

            <div className="mt-10 text-center pt-8 border-t border-slate-100">
              <p className="text-slate-600">
                Har du brug for fast aftale på bilpleje, klargøring af flere biler eller særlige ønsker?{' '}
                <Link href="/contact" className="font-semibold text-blue-600 hover:text-blue-800 underline decoration-blue-200 underline-offset-2">
                  Kontakt os
                </Link>{' '}
                og fortæl kort om dine behov – så vender vi tilbage med et forslag.
              </p>
            </div>
          </div>
        </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
