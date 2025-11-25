import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect, useMemo } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import TestDriveModal from '../../components/TestDriveModal'
import VehicleCard from '../../components/VehicleCard'
import TradeInForm from '../../components/TradeInForm'
import fs from 'fs'
import path from 'path'

// Mock data extender - in a real app this would be in the JSON or DB
const EXTENDED_DATA: Record<string, any> = {
  "1": { // Tesla Model 3
    range: "602 km",
    acceleration: "4,4 sek",
    topSpeed: "233 km/t",
    power: "498 HK",
    drivetrain: "AWD",
    battery: "75 kWh",
    charging: "250 kW",
    equipment: [
      "Autopilot", "Glastag", "Varmepumpe", "El-bagklap", 
      "Premium lydsystem", "Trådløs opladning", "Sædevarme for/bag", "Ratvarme",
      "Matrix LED lygter", "360 kamera", "Blindvinkel assistent", "Adaptiv fartpilot",
      "Nøglefri betjening", "El-justerbare sæder", "Navigation", "Spotify integration"
    ],
    leasingOptions: {
      privat: { monthly: "3.495", down: "40.000", residual: "220.000", total: "81.940", tax: null },
      erhverv: { monthly: "2.895", down: "40.000", residual: "220.000", total: null, tax: "310.000" },
      split: { monthly: "2.495", down: "40.000", residual: "220.000", total: null, tax: "310.000" }
    },
    description: "Oplev fremtiden med Tesla Model 3 Long Range. Denne bil kombinerer banebrydende teknologi med imponerende rækkevidde og sportslige køreegenskaber. Det minimalistiske interiør er centreret omkring den store touchskærm, der styrer alt fra navigation til underholdning."
  },
  "2": { // Polestar 2
    range: "551 km",
    acceleration: "4,7 sek",
    topSpeed: "205 km/t",
    power: "408 HK",
    drivetrain: "AWD",
    battery: "78 kWh",
    charging: "155 kW",
    equipment: [
      "Pilot Pack", "Plus Pack", "Panoramaglastag", "Harman Kardon lyd",
      "Pixel LED forlygter", "360 kamera", "Varmepumpe", "El-sæder med memory",
      "Google Automotive OS", "Adaptiv fartpilot", "Lane Keeping Aid", "Blind Spot Info",
      "Trådløs mobilopladning", "Opvarmet rat", "Sædevarme for/bag", "20\" Alufælge"
    ],
    leasingOptions: {
      privat: { monthly: "3.995", down: "35.000", residual: "210.000", total: "82.940", tax: null },
      erhverv: { monthly: "3.195", down: "35.000", residual: "210.000", total: null, tax: "305.000" },
      split: { monthly: "2.895", down: "35.000", residual: "210.000", total: null, tax: "305.000" }
    },
    description: "Polestar 2 er designet til at imponere. Med sit skarpe, nordiske design og kraftfulde elektriske drivlinje leverer den en køreoplevelse i særklasse. Det intuitive Google-system gør hverdagen nemmere, mens den høje byggekvalitet sikrer komfort på alle ture."
  },
  "7": { // Tesla Model Y Long Range RWD (Juniper)
    range: "600 km",
    acceleration: "5,9 sek",
    topSpeed: "217 km/t",
    power: "340 HK",
    drivetrain: "RWD",
    battery: "75 kWh",
    charging: "250 kW",
    equipment: [
      "Adaptiv fartpilot", "Lane Assist", "Blindvinkelassistent", "360° kamera",
      "Varme og køl i forsæder", "Varme i bagsæder", "Skærm bag", "Aftageligt træk",
      "Matrix LED lygter", "Glastag", "Varmepumpe", "El-bagklap",
      "Premium lydsystem", "Trådløs opladning", "Nøglefri betjening"
    ],
    leasingOptions: {
      privat: { monthly: "5.019", down: "18.400", residual: "0", total: "78.628", tax: null },
      erhverv: { monthly: "4.015", down: "18.400", residual: "0", total: null, tax: "358.900" },
      split: { monthly: "3.800", down: "18.400", residual: "0", total: null, tax: "358.900" }
    },
    description: "Den nye Tesla Model Y Juniper (2025) sætter nye standarder for elektriske SUV'er. Med opdateret design, forbedret undervogn og endnu mere støjsvag kabine. Denne Long Range RWD model leverer en imponerende rækkevidde på 600 km og kommer spækket med udstyr som køl i sæderne og skærm til bagsædepassagererne."
  },
  // Default fallback for others
  "default": {
    range: "450 km",
    acceleration: "6,2 sek",
    topSpeed: "180 km/t",
    power: "204 HK",
    drivetrain: "RWD",
    battery: "60 kWh",
    charging: "125 kW",
    equipment: [
      "Klimaanlæg", "Fartpilot", "Parkeringssensor", "Bakkamera",
      "Apple CarPlay", "Android Auto", "LED lygter", "Alufælge",
      "Sædevarme", "Regnsensor", "Bluetooth", "Multifunktionsrat"
    ],
    leasingOptions: {
      privat: { monthly: "3.795", down: "30.000", residual: "180.000", total: "75.540", tax: null },
      erhverv: { monthly: "2.995", down: "30.000", residual: "180.000", total: null, tax: "280.000" },
      split: { monthly: "2.695", down: "30.000", residual: "180.000", total: null, tax: "280.000" }
    },
    description: "En fantastisk elbil der leverer både komfort og køreglæde. Perfekt til både bykørsel og længere ture med familien. Udstyret med moderne teknologi og sikkerhedsfunktioner."
  }
}

type Vehicle = {
  id: string
  make: string
  model: string
  year: number
  price: string
  monthlyPrice: string
  img: string
  bodyType: string
}

type Props = {
  vehicle: Vehicle
  details: any
  similarVehicles: Vehicle[]
}

export default function VehicleDetail({ vehicle, details, similarVehicles }: Props) {
  const [activeTab, setActiveTab] = useState('specs')
  const [isTestDriveModalOpen, setIsTestDriveModalOpen] = useState(false)
  const [leasingType, setLeasingType] = useState<'privat' | 'erhverv' | 'split'>('privat')
  const [showStickyHeader, setShowStickyHeader] = useState(false)
  const [downPaymentStep, setDownPaymentStep] = useState(0) // 0 = default, -1 = less, 1 = more, etc.
  const [annualMileage, setAnnualMileage] = useState(15000)
  const [includeInsurance, setIncludeInsurance] = useState(false)
  
  // Gallery State
  const [isGalleryOpen, setIsGalleryOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const galleryImages = [
    "/images/washngo-coming-soon.png?v=2",
    "/images/washngo-coming-soon.png?v=2",
    "/images/washngo-coming-soon.png?v=2",
    "/images/washngo-coming-soon.png?v=2",
    "/images/washngo-coming-soon.png?v=2"
  ]

  const openGallery = (index: number) => {
    setCurrentImageIndex(index)
    setIsGalleryOpen(true)
  }

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation()
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length)
  }

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation()
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${vehicle.make} ${vehicle.model} | WashNGo Leasing`,
          text: `Tjek denne ${vehicle.make} ${vehicle.model} hos WashNGo Leasing!`,
          url: window.location.href,
        })
      } catch (error) {
        console.log('Error sharing:', error)
      }
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(window.location.href)
      alert('Link kopieret til udklipsholder!')
    }
  }

  const handlePrint = () => {
    window.print()
  }

  const [isFavorite, setIsFavorite] = useState(false)

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite)
    // In a real app, save to localStorage or backend
  }

  // Range Calculator State
  const [rangeSeason, setRangeSeason] = useState<'summer' | 'winter'>('summer')
  const [drivingStyle, setDrivingStyle] = useState<'city' | 'mixed' | 'highway'>('mixed')

  // Handle scroll for sticky header
  useEffect(() => {
    const handleScroll = () => {
      setShowStickyHeader(window.scrollY > 600)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Reset calculator when type changes
  useEffect(() => {
    setDownPaymentStep(0)
    setAnnualMileage(15000)
    setIncludeInsurance(false)
  }, [leasingType])

  const currentLeasing = details.leasingOptions[leasingType]
  
  // Calculator Logic
  const baseDown = parseInt(currentLeasing.down.replace(/\./g, ''))
  const baseMonthly = parseInt(currentLeasing.monthly.replace(/\./g, ''))
  
  // Each step is 5.000 kr. change in down payment
  // Impact: 5.000 kr extra down payment reduces monthly by approx 200 kr (simplified logic)
  const stepValue = 5000
  const monthlyImpact = 200
  
  // Mileage impact: +300 kr per 5000 km over 15000
  const mileageSurcharge = ((annualMileage - 15000) / 5000) * 300
  // Insurance impact: +599 kr
  const insuranceCost = includeInsurance ? 599 : 0

  const calculatedDown = baseDown + (downPaymentStep * stepValue)
  const calculatedMonthly = baseMonthly - (downPaymentStep * monthlyImpact) + mileageSurcharge + insuranceCost

  // Range Logic
  const baseRangeInt = parseInt(details.range.replace(/\D/g, ''))
  const rangeMultipliers = {
    summer: { city: 1.05, mixed: 0.95, highway: 0.80 },
    winter: { city: 0.85, mixed: 0.75, highway: 0.65 }
  }
  const estimatedRange = Math.round(baseRangeInt * rangeMultipliers[rangeSeason][drivingStyle])
  
  // Format helpers
  const fmt = (n: number) => n.toLocaleString('da-DK').replace(/,/g, '.')

  return (
    <div className="min-h-screen bg-slate-50">
      <Head>
        <title>{`${vehicle.make} ${vehicle.model} | WashNGo Leasing`}</title>
      </Head>

      <Header />

      {/* Sticky Header */}
      <div className={`fixed top-0 left-0 w-full bg-white/90 backdrop-blur-md shadow-md z-40 transition-transform duration-300 px-4 py-3 ${showStickyHeader ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="container mx-auto max-w-7xl flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative w-12 h-8 rounded overflow-hidden bg-slate-100">
              <Image src="/images/washngo-coming-soon.png?v=2" alt={vehicle.model} fill className="object-cover" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-500 uppercase">{vehicle.make}</div>
              <div className="text-sm font-bold text-slate-900">{vehicle.model}</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:block text-right">
              <div className="text-xs text-slate-500">Månedlig ydelse</div>
              <div className="text-sm font-bold text-slate-900">{fmt(calculatedMonthly)} kr.</div>
            </div>
            <button 
              onClick={() => setIsTestDriveModalOpen(true)}
              className="bg-slate-900 text-white text-sm font-bold px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Book prøvetur
            </button>
          </div>
        </div>
      </div>

      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Breadcrumbs & Actions */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <nav className="flex items-center text-sm text-slate-500">
              <Link href="/" className="hover:text-blue-600">Forside</Link>
              <span className="mx-2">/</span>
              <Link href="/vehicles" className="hover:text-blue-600">Biler</Link>
              <span className="mx-2">/</span>
              <span className="text-slate-900 font-medium">{vehicle.make} {vehicle.model}</span>
            </nav>
            
            <div className="flex items-center gap-3">
              <button 
                onClick={toggleFavorite}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full border transition-colors ${isFavorite ? 'bg-red-50 text-red-600 border-red-200' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill={isFavorite ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                {isFavorite ? 'Gemt' : 'Gem'}
              </button>
              <button 
                onClick={handleShare}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 bg-white rounded-full border border-slate-200 hover:bg-slate-50 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
                Del bil
              </button>
              <button 
                onClick={handlePrint}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 bg-white rounded-full border border-slate-200 hover:bg-slate-50 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
                Print
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
            {/* Left Column: Images */}
            <div className="lg:col-span-8">
              <div 
                className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl bg-white shadow-lg mb-4 group cursor-pointer"
                onClick={() => openGallery(0)}
              >
                <Image
                  src={galleryImages[0]}
                  alt={`${vehicle.make} ${vehicle.model}`}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                <div className="absolute top-6 left-6 bg-white/90 backdrop-blur px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider text-slate-900 shadow-sm">
                  På lager
                </div>
                <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur px-4 py-2 rounded-full text-sm font-bold text-slate-900 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                  Se alle billeder
                </div>
              </div>
              {/* Thumbnails */}
              <div className="grid grid-cols-4 gap-4">
                {galleryImages.slice(1).map((img, idx) => (
                  <div 
                    key={idx} 
                    className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-200 cursor-pointer hover:opacity-80 transition-opacity ring-2 ring-transparent hover:ring-blue-600"
                    onClick={() => openGallery(idx + 1)}
                  >
                     <Image
                        src={img}
                        alt="Gallery"
                        fill
                        className="object-cover"
                      />
                  </div>
                ))}
              </div>

              {/* Key Specs Bar */}
              <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                <div className="text-center border-r border-slate-100 last:border-0">
                  <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Rækkevidde</div>
                  <div className="text-lg font-bold text-slate-900">{details.range}</div>
                </div>
                <div className="text-center border-r border-slate-100 last:border-0">
                  <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">0-100 km/t</div>
                  <div className="text-lg font-bold text-slate-900">{details.acceleration}</div>
                </div>
                <div className="text-center border-r border-slate-100 last:border-0">
                  <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Hestekræfter</div>
                  <div className="text-lg font-bold text-slate-900">{details.power}</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Opladning</div>
                  <div className="text-lg font-bold text-slate-900">{details.charging}</div>
                </div>
              </div>

              {/* Range & Charging Section */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Range Calculator */}
                <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl -mr-16 -mt-16"></div>
                  
                  <h3 className="text-lg font-bold mb-6 relative z-10">Rækkevidde i virkeligheden</h3>
                  
                  <div className="space-y-6 relative z-10">
                    {/* Season Toggle */}
                    <div className="bg-slate-800/50 p-1 rounded-xl flex">
                      <button 
                        onClick={() => setRangeSeason('summer')}
                        className={`flex-1 py-2 text-sm font-bold rounded-lg flex items-center justify-center gap-2 transition-all ${rangeSeason === 'summer' ? 'bg-white text-slate-900' : 'text-slate-400 hover:text-white'}`}
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                        Sommer
                      </button>
                      <button 
                        onClick={() => setRangeSeason('winter')}
                        className={`flex-1 py-2 text-sm font-bold rounded-lg flex items-center justify-center gap-2 transition-all ${rangeSeason === 'winter' ? 'bg-white text-slate-900' : 'text-slate-400 hover:text-white'}`}
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
                        Vinter
                      </button>
                    </div>

                    {/* Driving Style */}
                    <div className="space-y-2">
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Kørselstype</div>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { id: 'city', label: 'By' },
                          { id: 'mixed', label: 'Blandet' },
                          { id: 'highway', label: 'Motorvej' }
                        ].map((style) => (
                          <button
                            key={style.id}
                            onClick={() => setDrivingStyle(style.id as any)}
                            className={`py-2 text-xs font-bold rounded-lg border transition-all ${
                              drivingStyle === style.id 
                                ? 'border-blue-500 bg-blue-500/20 text-blue-400' 
                                : 'border-slate-700 text-slate-400 hover:border-slate-600'
                            }`}
                          >
                            {style.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="pt-6 border-t border-slate-800">
                      <div className="text-4xl font-bold text-white mb-1">{estimatedRange} <span className="text-lg text-slate-400 font-normal">km</span></div>
                      <div className="text-xs text-slate-500">Estimeret rækkevidde baseret på valg.</div>
                    </div>
                  </div>
                </div>

                {/* Charging Info */}
                <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-6">Opladningstid</h3>
                    
                    <div className="space-y-6">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="font-bold text-slate-700">Hjemmelader (11 kW)</span>
                          <span className="text-slate-500">0-100%</span>
                        </div>
                        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-slate-900 w-3/4 rounded-full"></div>
                        </div>
                        <div className="text-xs text-slate-400 mt-1">Ca. 7 timer og 15 min.</div>
                      </div>

                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="font-bold text-slate-700">Lynlader (150+ kW)</span>
                          <span className="text-slate-500">10-80%</span>
                        </div>
                        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-600 w-1/4 rounded-full animate-pulse"></div>
                        </div>
                        <div className="text-xs text-slate-400 mt-1">Ca. 28 min.</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 p-4 bg-blue-50 rounded-xl flex items-start gap-3">
                    <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    <div className="text-sm text-blue-900">
                      <span className="font-bold">Vidste du?</span> Vi leverer en ladebrik med i prisen, så du kan lade på over 300.000 ladestandere i hele Europa.
                    </div>
                  </div>
                </div>
              </div>

              {/* Savings Calculator */}
              <div className="mt-8 bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 border border-green-100">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="flex-1">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold uppercase tracking-wider mb-4">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      Økonomi
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Spar penge hver måned</h3>
                    <p className="text-slate-600 mb-6">
                      Ved at skifte fra benzin til el kan du opnå store besparelser på brændstof. 
                      Beregningen tager udgangspunkt i {annualMileage.toLocaleString('da-DK')} km/år.
                    </p>
                    
                    <div className="flex items-center gap-8">
                      <div>
                        <div className="text-xs text-slate-500 uppercase font-bold mb-1">Benzinbil</div>
                        <div className="text-lg font-bold text-slate-400 line-through decoration-red-500/50">
                          {fmt(Math.round((annualMileage / 15) * 14 / 12))} kr./md
                        </div>
                      </div>
                      <div className="w-px h-10 bg-slate-200"></div>
                      <div>
                        <div className="text-xs text-green-600 uppercase font-bold mb-1">Elbil (Hjemmeladning)</div>
                        <div className="text-2xl font-bold text-slate-900">
                          {fmt(Math.round((annualMileage / 5) * 2.5 / 12))} kr./md
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-green-100 text-center min-w-[200px]">
                    <div className="text-sm text-slate-500 font-medium mb-1">Din besparelse</div>
                    <div className="text-3xl font-bold text-green-600 mb-1">
                      {fmt(Math.round(((annualMileage / 15) * 14 / 12) - ((annualMileage / 5) * 2.5 / 12)))} kr.
                    </div>
                    <div className="text-xs text-slate-400">pr. måned</div>
                  </div>
                </div>
              </div>

              {/* Tech Highlights */}
              <div className="mt-8">
                <h3 className="text-xl font-bold text-slate-900 mb-6">Teknologi i særklasse</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm mb-4 text-blue-600">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                    </div>
                    <h4 className="font-bold text-slate-900 mb-2">App Styring</h4>
                    <p className="text-sm text-slate-500">Styr klima, opladning og nøglefri adgang direkte fra din smartphone.</p>
                  </div>
                  <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm mb-4 text-blue-600">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    <h4 className="font-bold text-slate-900 mb-2">Sikkerhedssystemer</h4>
                    <p className="text-sm text-slate-500">Avancerede assistentsystemer der holder øje med trafikken 360 grader rundt.</p>
                  </div>
                  <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm mb-4 text-blue-600">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    </div>
                    <h4 className="font-bold text-slate-900 mb-2">Over-the-air Updates</h4>
                    <p className="text-sm text-slate-500">Bilen bliver bedre over tid med trådløse softwareopdateringer.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Leasing Info */}
            <div className="lg:col-span-4">
              <div className="sticky top-28 bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-8 border border-slate-100">
                <div className="mb-6">
                  <div className="text-sm font-bold uppercase tracking-wider text-blue-600 mb-2">{vehicle.make}</div>
                  <h1 className="text-3xl font-bold text-slate-900 mb-2">{vehicle.model}</h1>
                  <div className="text-slate-500 font-medium">{vehicle.year} • {details.power} • {details.range}</div>
                </div>

                {/* Leasing Toggle */}
                <div className="bg-slate-100 p-1 rounded-xl flex mb-6">
                  {(['privat', 'erhverv', 'split'] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() => setLeasingType(type)}
                      className={`flex-1 py-2 text-sm font-bold rounded-lg capitalize transition-all ${
                        leasingType === type 
                          ? 'bg-white text-slate-900 shadow-sm' 
                          : 'text-slate-500 hover:text-slate-700'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>

                <div className="bg-slate-50 rounded-2xl p-6 mb-8 border border-slate-100">
                  <div className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Månedlig ydelse</div>
                  <div className="text-4xl font-bold text-slate-900 mb-6">{fmt(calculatedMonthly)} <span className="text-lg font-normal text-slate-500">kr. /md</span></div>
                  
                  {/* Interactive Slider */}
                  <div className="mb-6">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-600 font-medium">Udbetaling</span>
                      <span className="font-bold text-slate-900">{fmt(calculatedDown)} kr.</span>
                    </div>
                    <input 
                      type="range" 
                      min="-2" 
                      max="4" 
                      step="1" 
                      value={downPaymentStep}
                      onChange={(e) => setDownPaymentStep(parseInt(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                    <div className="flex justify-between text-xs text-slate-400 mt-2">
                      <span>Lav udbetaling</span>
                      <span>Høj udbetaling</span>
                    </div>
                  </div>

                  {/* Mileage Selector */}
                  <div className="mb-6">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-600 font-medium">Årligt kørselsbehov</span>
                      <span className="font-bold text-slate-900">{annualMileage.toLocaleString('da-DK')} km</span>
                    </div>
                    <div className="flex bg-white rounded-lg border border-slate-200 p-1">
                      {[15000, 20000, 25000].map((km) => (
                        <button
                          key={km}
                          onClick={() => setAnnualMileage(km)}
                          className={`flex-1 py-1.5 text-xs font-bold rounded transition-all ${
                            annualMileage === km 
                              ? 'bg-slate-900 text-white shadow-sm' 
                              : 'text-slate-500 hover:bg-slate-50'
                          }`}
                        >
                          {km / 1000}k
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Insurance Toggle */}
                  <div className="mb-8">
                    <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-white cursor-pointer hover:border-blue-400 transition-colors group">
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${includeInsurance ? 'bg-blue-600 border-blue-600' : 'border-slate-300 bg-slate-50'}`}>
                          {includeInsurance && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                        </div>
                        <div>
                          <div className="text-sm font-bold text-slate-900">Inkl. forsikring</div>
                          <div className="text-xs text-slate-500">Ansvar & kasko (Elitebilist)</div>
                        </div>
                      </div>
                      <div className="text-sm font-bold text-slate-900">+599 kr.</div>
                      <input 
                        type="checkbox" 
                        className="hidden" 
                        checked={includeInsurance} 
                        onChange={(e) => setIncludeInsurance(e.target.checked)} 
                      />
                    </label>
                  </div>

                  <div className="space-y-3 text-sm border-t border-slate-200 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">Løbetid</span>
                      <span className="font-bold text-slate-900">12 mdr.</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">Restværdi</span>
                      <span className="font-bold text-slate-900">
                        {currentLeasing.residual === "0" ? "Vi indestår" : `${currentLeasing.residual} kr.`}
                      </span>
                    </div>
                    {currentLeasing.total && (
                      <div className="flex justify-between items-center pt-2 border-t border-slate-200/50">
                        <span className="text-slate-600 font-medium">Samlet i perioden</span>
                        <span className="font-bold text-slate-900">
                          {/* Recalculate total based on new monthly */}
                          {fmt(parseInt(currentLeasing.total.replace(/\./g, '')) + (calculatedMonthly - baseMonthly) * 12)} kr.
                        </span>
                      </div>
                    )}
                    {currentLeasing.tax && (
                      <div className="flex justify-between items-center pt-2 border-t border-slate-200/50">
                        <span className="text-slate-600 font-medium">Beskatningsgrundlag</span>
                        <span className="font-bold text-slate-900">{currentLeasing.tax} kr.</span>
                      </div>
                    )}
                  </div>

                  {/* Included Badges */}
                  <div className="mt-6 pt-4 border-t border-slate-200 grid grid-cols-2 gap-2">
                    <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
                      <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      Serviceaftale
                    </div>
                    <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
                      <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      Vejhjælp
                    </div>
                    <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
                      <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      Sommerdæk
                    </div>
                    <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
                      <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      Ladebrik
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Link href="/contact" className="block w-full bg-slate-900 text-white text-center font-bold py-4 rounded-xl hover:bg-blue-600 transition-colors shadow-lg shadow-slate-900/20">
                    Kontakt os om denne bil
                  </Link>
                  <button 
                    onClick={() => setIsTestDriveModalOpen(true)}
                    className="block w-full bg-white text-slate-900 border-2 border-slate-200 text-center font-bold py-4 rounded-xl hover:border-slate-900 transition-colors"
                  >
                    Book prøvetur
                  </button>
                </div>

                {/* Advisor Profile */}
                <div className="mt-8 pt-6 border-t border-slate-200">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-slate-200 overflow-hidden relative">
                      <Image src="/images/washngo-coming-soon.png?v=2" alt="Advisor" fill className="object-cover" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 font-medium uppercase">Din specialist</div>
                      <div className="text-sm font-bold text-slate-900">Mikkel Hansen</div>
                      <div className="text-xs text-blue-600 hover:underline cursor-pointer">mikkel@washngo.dk</div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 text-center">
                  <p className="text-xs text-slate-400">
                    {leasingType === 'privat' ? 'Alle priser er inkl. moms.' : 'Alle priser er ekskl. moms.'} 
                    Forbehold for trykfejl og prisændringer.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Content Tabs Section */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden mb-20">
            <div className="flex border-b border-slate-100 overflow-x-auto">
              <button 
                onClick={() => setActiveTab('specs')}
                className={`px-8 py-5 text-sm font-bold uppercase tracking-wider transition-colors whitespace-nowrap ${activeTab === 'specs' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50' : 'text-slate-500 hover:text-slate-900'}`}
              >
                Specifikationer
              </button>
              <button 
                onClick={() => setActiveTab('equipment')}
                className={`px-8 py-5 text-sm font-bold uppercase tracking-wider transition-colors whitespace-nowrap ${activeTab === 'equipment' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50' : 'text-slate-500 hover:text-slate-900'}`}
              >
                Udstyrsliste
              </button>
              <button 
                onClick={() => setActiveTab('description')}
                className={`px-8 py-5 text-sm font-bold uppercase tracking-wider transition-colors whitespace-nowrap ${activeTab === 'description' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50' : 'text-slate-500 hover:text-slate-900'}`}
              >
                Beskrivelse
              </button>
            </div>

            <div className="p-8 lg:p-12">
              {activeTab === 'specs' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-8">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-6 pb-2 border-b border-slate-100">Ydelse & Kørsel</h3>
                    <dl className="space-y-4">
                      <div className="flex justify-between">
                        <dt className="text-slate-500">Rækkevidde (WLTP)</dt>
                        <dd className="font-bold text-slate-900">{details.range}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-slate-500">0-100 km/t</dt>
                        <dd className="font-bold text-slate-900">{details.acceleration}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-slate-500">Tophastighed</dt>
                        <dd className="font-bold text-slate-900">{details.topSpeed}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-slate-500">Hestekræfter</dt>
                        <dd className="font-bold text-slate-900">{details.power}</dd>
                      </div>
                    </dl>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-6 pb-2 border-b border-slate-100">Batteri & Opladning</h3>
                    <dl className="space-y-4">
                      <div className="flex justify-between">
                        <dt className="text-slate-500">Batterikapacitet</dt>
                        <dd className="font-bold text-slate-900">{details.battery}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-slate-500">Max ladeeffekt (DC)</dt>
                        <dd className="font-bold text-slate-900">{details.charging}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-slate-500">Drivlinje</dt>
                        <dd className="font-bold text-slate-900">{details.drivetrain}</dd>
                      </div>
                    </dl>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-6 pb-2 border-b border-slate-100">Dimensioner</h3>
                    <dl className="space-y-4">
                      <div className="flex justify-between">
                        <dt className="text-slate-500">Karrosseri</dt>
                        <dd className="font-bold text-slate-900 capitalize">{vehicle.bodyType}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-slate-500">Årgang</dt>
                        <dd className="font-bold text-slate-900">{vehicle.year}</dd>
                      </div>
                    </dl>
                  </div>
                </div>
              )}

              {activeTab === 'equipment' && (
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-8">Højdepunkter fra udstyrslisten</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {details.equipment.map((item: string, idx: number) => (
                      <div key={idx} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                        </div>
                        <span className="text-slate-700 font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'description' && (
                <div className="max-w-3xl">
                  <h3 className="text-2xl font-bold text-slate-900 mb-6">Om {vehicle.make} {vehicle.model}</h3>
                  <div className="prose prose-slate prose-lg text-slate-600">
                    <p>{details.description}</p>
                    <p className="mt-4">
                      Bilen står klar til omgående levering. Kontakt os for en fremvisning eller prøvetur. 
                      Vi tilbyder attraktiv finansiering og leasing til både private og erhverv.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

              {/* Delivery Timeline */}
              <div className="mt-12 mb-12">
                <h3 className="text-xl font-bold text-slate-900 mb-8">Din vej til ny bil</h3>
                <div className="relative">
                  {/* Line */}
                  <div className="absolute top-5 left-0 w-full h-0.5 bg-slate-100 hidden md:block"></div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {[
                      { title: 'Bestil online', desc: 'Udfyld formularen eller book en prøvetur.', icon: '1' },
                      { title: 'Kreditgodkendelse', desc: 'Vi behandler din ansøgning indenfor 24 timer.', icon: '2' },
                      { title: 'Kontrakt', desc: 'Underskriv leasingaftalen digitalt med MitID.', icon: '3' },
                      { title: 'Levering', desc: 'Hent bilen eller få den leveret til døren.', icon: '4' }
                    ].map((step, i) => (
                      <div key={i} className="relative z-10 flex md:block items-start gap-4 md:gap-0">
                        <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-sm shadow-lg shadow-slate-900/20 mb-4 flex-shrink-0">
                          {step.icon}
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900 mb-1">{step.title}</h4>
                          <p className="text-sm text-slate-500">{step.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

          {/* Trade In Section */}
          <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden mb-20">
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
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></svg>
                    Byt til nyt
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
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
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

          {/* Similar Vehicles */}
          {similarVehicles.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-8">Lignende biler</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {similarVehicles.map(v => (
                  <VehicleCard key={v.id} {...v} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
      
      <TestDriveModal 
        isOpen={isTestDriveModalOpen} 
        onClose={() => setIsTestDriveModalOpen(false)} 
        vehicleName={`${vehicle.make} ${vehicle.model}`} 
      />

      {/* Gallery Modal */}
      {isGalleryOpen && (
        <div className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-sm flex flex-col items-center justify-center" onClick={() => setIsGalleryOpen(false)}>
          {/* Close Button */}
          <button 
            className="absolute top-6 right-6 text-white/70 hover:text-white z-50 p-2 bg-white/10 rounded-full backdrop-blur-md transition-colors"
            onClick={() => setIsGalleryOpen(false)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>

          {/* Nav Buttons */}
          <button 
            className="absolute left-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white z-50 p-4 bg-white/10 rounded-full backdrop-blur-md transition-colors hover:bg-white/20 hidden md:block"
            onClick={prevImage}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          </button>

          <button 
            className="absolute right-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white z-50 p-4 bg-white/10 rounded-full backdrop-blur-md transition-colors hover:bg-white/20 hidden md:block"
            onClick={nextImage}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
          </button>

          {/* Main Image */}
          <div className="relative w-full h-[70vh] max-w-7xl p-4 flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <div className="relative w-full h-full">
              <Image
                src={galleryImages[currentImageIndex]}
                alt={`Gallery image ${currentImageIndex + 1}`}
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
          
          {/* Thumbnails strip */}
          <div className="w-full max-w-4xl px-4 mt-4 overflow-x-auto flex justify-center gap-3 pb-4" onClick={(e) => e.stopPropagation()}>
             {galleryImages.map((img, idx) => (
               <button
                 key={idx}
                 onClick={() => setCurrentImageIndex(idx)}
                 className={`relative w-20 h-14 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${currentImageIndex === idx ? 'border-blue-500 scale-110 ring-2 ring-blue-500/50' : 'border-transparent opacity-40 hover:opacity-100'}`}
               >
                 <Image src={img} alt="Thumbnail" fill className="object-cover" />
               </button>
             ))}
          </div>
          
          <div className="text-white/50 text-sm mt-2 font-medium">
            {currentImageIndex + 1} / {galleryImages.length}
          </div>
        </div>
      )}
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const filePath = path.join(process.cwd(), 'data', 'vehicles.json')
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const vehicles = JSON.parse(fileContents)

  const paths = vehicles.map((vehicle: Vehicle) => ({
    params: { id: vehicle.id },
  }))

  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const filePath = path.join(process.cwd(), 'data', 'vehicles.json')
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const vehicles = JSON.parse(fileContents)
  
  const vehicle = vehicles.find((v: Vehicle) => v.id === params?.id)
  const details = EXTENDED_DATA[vehicle.id] || EXTENDED_DATA['default']
  
  // Find similar vehicles (same body type, excluding current)
  const similarVehicles = vehicles
    .filter((v: Vehicle) => v.bodyType === vehicle.bodyType && v.id !== vehicle.id)
    .slice(0, 3)

  return {
    props: {
      vehicle,
      details,
      similarVehicles
    },
  }
}