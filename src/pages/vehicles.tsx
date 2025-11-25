import Link from 'next/link'
import { useRouter } from 'next/router'
import Footer from '../components/Footer'
import Header from '../components/Header'
import VehicleCard from '../components/VehicleCard'
import TradeInForm from '../components/TradeInForm'
import vehicles from '../../data/vehicles.json'
import { useMemo, useState, useEffect } from 'react'

// Simple SVG Icons to replace lucide-react
const FilterIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
)

const CarIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></svg>
)

const CheckIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="20 6 9 17 4 12"/></svg>
)

const bodyTypeLabels: Record<string, string> = {
  suv: 'SUV',
  sedan: 'Sedan',
  hatchback: 'Halvkombi',
  wagon: 'Stationcar',
  coupe: 'Coupé'
}

export default function Vehicles() {
  const router = useRouter()
  const [activeBodyType, setActiveBodyType] = useState<string | 'alle'>('alle')
  const [maxPrice, setMaxPrice] = useState<number | null>(null)

  // Sync URL params to state
  useEffect(() => {
    if (router.isReady) {
      const { maxPrice: priceParam } = router.query
      if (priceParam) {
        setMaxPrice(parseInt(priceParam as string))
      }
    }
  }, [router.isReady, router.query])

  const availableBodyTypes = useMemo(() => {
    const types = new Set(vehicles.map(v => v.bodyType))
    return Array.from(types)
  }, [])

  const filteredVehicles = useMemo(() => {
    let result = vehicles

    // Filter by Body Type
    if (activeBodyType !== 'alle') {
      result = result.filter(v => v.bodyType === activeBodyType)
    }

    // Filter by Price
    if (maxPrice) {
       result = result.filter(v => {
         const price = parseInt(v.monthlyPrice.replace(/[^0-9]/g, ''))
         return price <= maxPrice
       })
    }

    return result
  }, [activeBodyType, maxPrice])

  const clearFilters = () => {
    setActiveBodyType('alle')
    setMaxPrice(null)
    router.push('/vehicles', undefined, { shallow: true })
  }

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
                Premium Biler
              </span>
              <h1 className="text-4xl md:text-6xl font-bold text-slate-900 tracking-tight mb-6">
                Find din næste <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  drømmebil
                </span>
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed">
                Udforsk vores kuraterede udvalg af premium elbiler. 
                Klar til levering og gennemgået fra A-Z på vores eget værksted.
              </p>
            </div>
          </div>

        <div className="container mx-auto px-4">
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-4 mb-12 p-4 bg-white rounded-xl shadow-sm border border-slate-100">
            <div className="flex items-center gap-2 text-slate-500 mr-4">
              <FilterIcon className="w-5 h-5" />
              <span className="font-medium">Filtrer:</span>
            </div>
            
            <button
              onClick={() => setActiveBodyType('alle')}
              className={`px-4 py-2 rounded-full text-sm transition-all ${
                activeBodyType === 'alle'
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Alle biler
            </button>
            
            {availableBodyTypes.map(type => (
              <button
                key={type}
                onClick={() => setActiveBodyType(type)}
                className={`px-4 py-2 rounded-full text-sm transition-all capitalize ${
                  activeBodyType === type
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {bodyTypeLabels[type] || type}
              </button>
            ))}

            {maxPrice && (
              <div className="ml-auto flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-bold border border-blue-100">
                <span>Max: {maxPrice.toLocaleString('da-DK')} kr./md</span>
                <button onClick={clearFilters} className="hover:text-blue-900 ml-2">✕</button>
              </div>
            )}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {filteredVehicles.length > 0 ? (
              filteredVehicles.map((vehicle) => (
                <VehicleCard key={vehicle.id} {...vehicle} />
              ))
            ) : (
              <div className="col-span-full text-center py-20">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Ingen biler fundet</h3>
                <p className="text-slate-500 mb-6">Prøv at justere dine filtre eller nulstil søgningen.</p>
                <button onClick={clearFilters} className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors">
                  Nulstil filtre
                </button>
              </div>
            )}
          </div>

          {/* Trade In Section */}
          <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
            <div className="grid lg:grid-cols-5">
              <div className="lg:col-span-2 p-8 lg:p-12 flex flex-col justify-center bg-slate-900 relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
                  </svg>
                </div>
                <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-blue-500 rounded-full blur-3xl opacity-20"></div>
                <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-indigo-500 rounded-full blur-3xl opacity-20"></div>
                
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold uppercase tracking-wider mb-6 border border-blue-500/20">
                    <CarIcon className="w-4 h-4" />
                    <span>Byt til nyt</span>
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-4 leading-tight">
                    Lad din gamle bil <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">betale for den nye</span>
                  </h2>
                  <p className="text-slate-400 text-base mb-8 leading-relaxed">
                    Vi giver en skarp byttepris, som kan trækkes direkte fra udbetalingen på din nye leasingaftale.
                  </p>
                  <ul className="space-y-4">
                    {[
                      'Straksvurdering af din bil',
                      'Vi tager alle mærker i bytte',
                      'Brug værdien til udbetaling'
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-slate-300 text-sm font-medium">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 border border-blue-500/20">
                          <CheckIcon className="w-3 h-3" />
                        </div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="lg:col-span-3 p-8 lg:p-12 bg-white">
                <div className="max-w-lg mx-auto lg:mx-0">
                  <h3 className="text-xl font-bold text-slate-900 mb-6">Indtast din nummerplade</h3>
                  <TradeInForm minimal={true} />
                </div>
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
