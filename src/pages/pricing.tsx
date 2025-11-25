import Footer from '../components/Footer'
import Header from '../components/Header'
import SEO from '../components/SEO'
import Link from 'next/link'

// Icons
const ClockIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
)

const CoinsIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="8" cy="8" r="6"/><path d="M18.09 10.37A6 6 0 1 1 10.34 18"/><path d="M7 6h1v4"/><path d="m16.71 13.88.7.71-2.82 2.82"/></svg>
)

const AlertCircleIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
)

const StarIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none" className={className}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
)

const CheckIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="20 6 9 17 4 12"/></svg>
)

const cards = [
  {
    name: 'Basis',
    credit: '500',
    price: '425',
    saving: '15%',
    popular: false,
    features: ['Perfekt til enkeltvask', 'Ingen udløbsdato', 'Kan deles med familien']
  },
  {
    name: 'Plus',
    credit: '1000',
    price: '800',
    saving: '20%',
    popular: false,
    features: ['Til den jævnlige vask', 'Spar 200 kr.', 'Fuld fleksibilitet']
  },
  {
    name: 'Premium',
    credit: '1500',
    price: '1125',
    saving: '25%',
    popular: false,
    features: ['Til bilentusiasten', 'Spar 375 kr.', 'Ekstra meget vasketid']
  },
  {
    name: 'Pro',
    credit: '2000',
    price: '1400',
    saving: '30%',
    popular: true,
    features: ['Bedste værdi', 'Spar hele 600 kr.', 'Maksimal vaskeglæde']
  }
]

export default function Pricing() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <SEO
        title="Priser & Klippekort | WashNGo"
        description="Spar op til 30% på bilvask med vores klippekort. Se priser på gør-det-selv vask og Happy Hour tilbud."
      />
      <Header />
      
      <main className="relative overflow-hidden">
        <div className="relative z-10 pt-6 pb-20 container mx-auto px-4">
          
          {/* Hero Section */}
          <div className="relative overflow-hidden rounded-[2.5rem] bg-white shadow-2xl shadow-slate-200/50 border border-slate-100 px-6 py-24 text-center mb-20">
            {/* Background Blobs */}
            <div className="absolute top-0 right-0 -mt-20 -mr-20 w-[800px] h-[800px] bg-blue-100/40 rounded-full blur-3xl mix-blend-multiply opacity-60 pointer-events-none" />
            <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-[600px] h-[600px] bg-indigo-100/40 rounded-full blur-3xl mix-blend-multiply opacity-60 pointer-events-none" />

            <div className="relative z-10 max-w-3xl mx-auto">
              <span className="inline-flex items-center rounded-full bg-blue-50 px-4 py-1.5 text-sm font-bold uppercase tracking-wider text-blue-600 ring-1 ring-inset ring-blue-600/20 mb-6">
                Spar op til 30%
              </span>
              <h1 className="text-5xl md:text-7xl font-bold text-slate-900 tracking-tight mb-8">
                Vask mere, <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  betal mindre
                </span>
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed">
                Køb et WashNGo værdikort og få mere vasketid for pengene. 
                Kortet fungerer som et klippekort og kan bruges i vores døgnåbne vaskehal.
              </p>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
            {cards.map((card) => (
              <div 
                key={card.name}
                className={`relative flex flex-col bg-white rounded-3xl p-8 transition-all duration-300 hover:-translate-y-2 ${
                  card.popular 
                    ? 'shadow-2xl shadow-blue-900/10 ring-2 ring-blue-600 scale-105 z-10' 
                    : 'shadow-xl shadow-slate-200/50 border border-slate-100 hover:shadow-2xl hover:shadow-slate-200/80'
                }`}
              >
                {card.popular && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg shadow-blue-600/30 flex items-center gap-1">
                    <StarIcon className="w-4 h-4" />
                    Mest Populær
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-lg font-bold text-slate-500 uppercase tracking-wider mb-2">{card.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-slate-900">{card.price},-</span>
                    <span className="text-slate-400 font-medium">DKK</span>
                  </div>
                  <div className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                    Spar {card.saving}
                  </div>
                </div>

                <div className="mb-8 p-4 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                  <p className="text-xs text-slate-500 uppercase font-bold mb-1">Kredit på kortet</p>
                  <p className="text-2xl font-bold text-slate-900">{card.credit} kr.</p>
                </div>

                <ul className="space-y-4 mb-8 flex-1">
                  {card.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                      <CheckIcon className="w-5 h-5 text-blue-600 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link 
                  href="/contact" 
                  className={`w-full py-4 rounded-xl text-center font-bold transition-all ${
                    card.popular
                      ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-600/30'
                      : 'bg-slate-900 text-white hover:bg-slate-800 shadow-lg shadow-slate-900/20'
                  }`}
                >
                  Bestil kort
                </Link>
              </div>
            ))}
          </div>

          {/* Info Grid */}
          <div className="grid lg:grid-cols-2 gap-8 items-stretch">
            
            {/* Poletter Info */}
            <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col justify-center">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
                  <CoinsIcon className="w-7 h-7" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">Poletter & Priser</h2>
                  <p className="text-slate-500">Enkel og gennemskuelig betaling</p>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <span className="font-medium text-slate-700">1 Polet</span>
                  <span className="font-bold text-slate-900 text-xl">25 kr.</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <span className="font-medium text-slate-700">Vasketid pr. polet</span>
                  <span className="font-bold text-slate-900 text-xl">3:20 min.</span>
                </div>
                
                <div className="flex gap-4 p-5 bg-amber-50 rounded-2xl border border-amber-100 text-amber-900 text-sm leading-relaxed">
                  <AlertCircleIcon className="w-5 h-5 shrink-0 text-amber-600 mt-0.5" />
                  <p>
                    Bemærk: Der ydes ikke erstatning for dele, der falder af eller bliver beskadiget under vask – herunder stafferinger, mærker, lygter og spejle.
                  </p>
                </div>
              </div>
            </div>

            {/* Happy Hour */}
            <div className="relative bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 lg:p-12 shadow-2xl shadow-blue-900/20 text-white overflow-hidden flex flex-col justify-center">
              {/* Decorative circles */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-400/20 rounded-full -ml-10 -mb-10 blur-2xl" />
              
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-bold mb-8 border border-white/10">
                  <ClockIcon className="w-4 h-4" />
                  Spar penge i hverdagene
                </div>
                
                <h2 className="text-4xl font-bold mb-6">Happy Hour</h2>
                <p className="text-blue-100 text-lg mb-8 leading-relaxed max-w-md">
                  Vask bilen når det er billigst! Vi giver dig automatisk <span className="font-bold text-white">25% ekstra vasketid</span> på dine poletter.
                </p>

                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center font-bold text-xl border border-white/10">
                      Man
                    </div>
                    <div className="h-px flex-1 bg-white/20" />
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center font-bold text-xl border border-white/10">
                      Tor
                    </div>
                  </div>
                  <div className="text-center font-bold text-2xl tracking-tight">
                    Kl. 08:00 — 11:00
                  </div>
                  <p className="text-center text-sm text-blue-200 mt-4">
                    *Gælder kun i gør-det-selv vaskeanlægget
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

