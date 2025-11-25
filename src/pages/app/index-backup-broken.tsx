import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

// Mock Data for Wash Types (since services.json is more for detailing)
const washTypes = [
  {
    id: 'bronze',
    name: 'Bronze Vask',
    price: 69,
    color: 'from-orange-400 to-amber-600',
    features: ['Skumforvask', 'Hjulvask', 'Vask & Tørring'],
    popular: false
  },
  {
    id: 'silver',
    name: 'Sølv Vask',
    price: 99,
    color: 'from-slate-300 to-slate-500',
    features: ['Alt fra Bronze', 'Undervognsskyl', 'Voksbehandling'],
    popular: true
  },
  {
    id: 'gold',
    name: 'Guld Vask',
    price: 149,
    color: 'from-yellow-400 to-yellow-600',
    features: ['Alt fra Sølv', 'Polering', 'Insektrens', 'Ekstra Tørring'],
    popular: false
  },
  {
    id: 'platinum',
    name: 'Platinum Vask',
    price: 199,
    color: 'from-purple-400 to-indigo-600',
    features: ['Premium pakke', 'Nanoforsegling', 'Dækshine', 'Indvendig luft'],
    popular: false
  }
]

// Wash Stations
const washStations = [
  { id: 1, name: 'Station 1', status: 'available', estimatedWait: 0 },
  { id: 2, name: 'Station 2', status: 'available', estimatedWait: 0 },
  { id: 3, name: 'Station 3', status: 'occupied', estimatedWait: 5 },
  { id: 4, name: 'Station 4', status: 'available', estimatedWait: 0 }
]

// Mock Data for Products (based on products.json)
const products = [
  {
    id: "apc-1l",
    name: "All Purpose Cleaner 1 ltr.",
    category: "Før vask",
    price: 149,
    img: "/images/products/placeholder.svg"
  },
  {
    id: "insect-500",
    name: "Insektfjerner 500 ml.",
    category: "Før vask",
    price: 129,
    img: "/images/products/placeholder.svg"
  },
  {
    id: "magma-500",
    name: "Magma 500 ml.",
    category: "Fælgrens",
    price: 199,
    img: "/images/products/placeholder.svg"
  }
]

// Mock Data for Services (based on services.json)
const services = [
  {
    id: "interior-clean",
    title: "Indvendig rengøring",
    desc: "Grundig støvsugning og rens.",
    price: "Fra 595 kr",
    icon: "✨"
  },
  {
    id: "in-out-clean",
    title: "Ind- og udvendig",
    desc: "Den komplette pakke.",
    price: "Fra 895 kr",
    icon: "💎"
  },
  {
    id: "tire-change",
    title: "Hjulskift",
    desc: "Vi skifter dine hjul.",
    price: "Fra 399 kr",
    icon: "🔧"
  }
]

export default function WebApp() {
  const [activeTab, setActiveTab] = useState('home')
  const [queueStatus, setQueueStatus] = useState<'low' | 'medium' | 'high'>('low')
  const [selectedWash, setSelectedWash] = useState<string | null>(null)
  const [selectedStation, setSelectedStation] = useState<number | null>(null)
  const [isScanning, setIsScanning] = useState(false)

  // Simulate queue status change
  useEffect(() => {
    const statuses: ('low' | 'medium' | 'high')[] = ['low', 'medium', 'high']
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)]
    setQueueStatus(randomStatus)
  }, [])

  const getQueueColor = () => {
    if (queueStatus === 'low') return 'bg-green-500'
    if (queueStatus === 'medium') return 'bg-yellow-500'
    return 'bg-red-500'
  }

  const getQueueText = () => {
    if (queueStatus === 'low') return 'Ingen kø - Kør bare ind!'
    if (queueStatus === 'medium') return 'Lidt kø - ca. 5-10 min.'
    return 'Lang kø - over 15 min.'
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-24 max-w-md mx-auto shadow-2xl overflow-hidden relative">
      <Head>
        <title>WashNGo App</title>
        <meta name="theme-color" content="#2563eb" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
      </Head>

      {/* App Header */}
      <header className="bg-blue-600 text-white p-6 rounded-b-[2.5rem] shadow-lg relative z-10">
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-blue-100 text-sm font-medium">Velkommen tilbage</p>
            <h1 className="text-2xl font-bold">WashNGo</h1>
          </div>
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </div>
        </div>

        {/* Status Card - Only show on Home */}
        {activeTab === 'home' && (
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 flex items-center gap-4">
            <div className={`w-3 h-3 rounded-full ${getQueueColor()} animate-pulse shadow-[0_0_10px_currentColor]`} />
            <div>
              <p className="text-xs text-blue-100 uppercase tracking-wider font-bold">Live Status</p>
              <p className="font-medium text-sm">{getQueueText()}</p>
            </div>
          </div>
        )}
      </header>

      <main className="px-4 pt-6 space-y-8">
        
        {/* HOME VIEW */}
        {activeTab === 'home' && (
          <>
            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => setIsScanning(true)}
                className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center gap-2 active:scale-95 transition-transform"
              >
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                  </svg>
                </div>
                <span className="font-bold text-slate-900 text-sm">Start Vask</span>
              </button>
              
              <button className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center gap-2 active:scale-95 transition-transform">
                <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <span className="font-bold text-slate-900 text-sm">Klippekort</span>
              </button>
            </div>

            {/* Station Selector */}
            <div>
              <h2 className="text-lg font-bold text-slate-900 mb-4 px-2">Vælg Station</h2>
              <div className="grid grid-cols-2 gap-3">
                {washStations.map((station) => {
                  const isAvailable = station.status === 'available'
                  return (
                    <button
                      key={station.id}
                      onClick={() => setSelectedStation(station.id)}
                      disabled={!isAvailable}
                      className={`p-4 rounded-2xl border-2 transition-all ${
                        selectedStation === station.id
                          ? 'border-blue-600 bg-blue-50 scale-[1.02]'
                          : isAvailable
                          ? 'border-slate-200 bg-white hover:border-blue-300'
                          : 'border-slate-100 bg-slate-50 opacity-50 cursor-not-allowed'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-slate-900">{station.name}</span>
                        <div
                          className={`w-3 h-3 rounded-full ${
                            isAvailable ? 'bg-green-500' : 'bg-red-500'
                          } animate-pulse`}
                        />
                      </div>
                      <p className="text-xs text-slate-600">
                        {isAvailable ? 'Ledig nu' : `Optaget - ${station.estimatedWait} min`}
                      </p>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Wash Selector */}
            <div>
              <h2 className="text-lg font-bold text-slate-900 mb-4 px-2">Vælg Vask</h2>
              <div className="space-y-4">
                {washTypes.map((wash) => (
                  <div 
                    key={wash.id}
                    onClick={() => setSelectedWash(wash.id)}
                    className={`relative overflow-hidden rounded-3xl p-1 transition-all duration-300 ${selectedWash === wash.id ? 'ring-2 ring-blue-600 scale-[1.02]' : ''}`}
                  >
                    <div className={`bg-gradient-to-r ${wash.color} p-6 rounded-[1.3rem] text-white relative overflow-hidden`}>
                      {/* Background Pattern */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10" />
                      
                      <div className="flex justify-between items-start relative z-10">
                        <div>
                          <h3 className="text-xl font-bold mb-1">{wash.name}</h3>
                          <p className="text-white/80 text-sm mb-4">{wash.features.join(' • ')}</p>
                          <span className="text-2xl font-bold">{wash.price},-</span>
                        </div>
                        {wash.popular && (
                          <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                            Populær
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div>
              <h2 className="text-lg font-bold text-slate-900 mb-4 px-2">Seneste vaske</h2>
              <div className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100 space-y-4">
                {[
                  { date: '22. Nov', type: 'Sølv Vask', price: '99,-' },
                  { date: '15. Nov', type: 'Bronze Vask', price: '69,-' }
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center border-b border-slate-50 last:border-0 pb-4 last:pb-0">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 text-sm">{item.type}</p>
                        <p className="text-xs text-slate-500">{item.date}</p>
                      </div>
                    </div>
                    <span className="font-medium text-slate-900">{item.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* SHOP VIEW */}
        {activeTab === 'shop' && (
          <div className="space-y-6">
            <div className="bg-blue-50 p-6 rounded-3xl">
              <h2 className="text-xl font-bold text-blue-900 mb-2">Klargøringsshop</h2>
              <p className="text-blue-700 text-sm">Køb professionelle produkter med hjem.</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {products.map((product) => (
                <div key={product.id} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col">
                  <div className="aspect-square bg-slate-50 rounded-xl mb-3 relative overflow-hidden">
                    {/* Placeholder for product image */}
                    <div className="absolute inset-0 flex items-center justify-center text-slate-300">
                      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-blue-600 font-bold uppercase mb-1">{product.category}</p>
                    <h3 className="font-bold text-slate-900 text-sm mb-1 line-clamp-2">{product.name}</h3>
                    <p className="font-bold text-slate-900">{product.price},-</p>
                  </div>
                  <button className="mt-3 w-full bg-slate-900 text-white py-2 rounded-xl text-xs font-bold">
                    Læg i kurv
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SERVICES VIEW */}
        {activeTab === 'services' && (
          <div className="space-y-6">
            <div className="bg-indigo-50 p-6 rounded-3xl">
              <h2 className="text-xl font-bold text-indigo-900 mb-2">Special Services</h2>
              <p className="text-indigo-700 text-sm">Bestil tid til klargøring og service.</p>
            </div>

            <div className="space-y-4">
              {services.map((service) => (
                <div key={service.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
                  <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-2xl">
                    {service.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-slate-900">{service.title}</h3>
                    <p className="text-xs text-slate-500">{service.desc}</p>
                    <p className="text-sm font-bold text-indigo-600 mt-1">{service.price}</p>
                  </div>
                  <button className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-xs font-bold">
                    Bestil
                  </button>
                </div>
              ))}
            </div>
            
            <div className="bg-slate-900 text-white p-6 rounded-3xl mt-8">
              <h3 className="font-bold mb-2">Har du brug for hjælp?</h3>
              <p className="text-sm text-slate-400 mb-4">Vi sidder klar til at rådgive dig om den rette behandling.</p>
              <a href="tel:+4521759149" className="block w-full bg-white text-slate-900 text-center py-3 rounded-xl font-bold text-sm">
                Ring til os
              </a>
            </div>
          </div>
        )}

      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-6 py-4 pb-8 flex justify-between items-center z-50 max-w-md mx-auto">
        <button 
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center gap-1 ${activeTab === 'home' ? 'text-blue-600' : 'text-slate-400'}`}
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span className="text-[10px] font-medium">Hjem</span>
        </button>
        
        <button 
          onClick={() => setActiveTab('shop')}
          className={`flex flex-col items-center gap-1 ${activeTab === 'shop' ? 'text-blue-600' : 'text-slate-400'}`}
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <span className="text-[10px] font-medium">Shop</span>
        </button>

        <button 
          onClick={() => setActiveTab('services')}
          className={`flex flex-col items-center gap-1 ${activeTab === 'services' ? 'text-blue-600' : 'text-slate-400'}`}
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
          <span className="text-[10px] font-medium">Services</span>
        </button>

        <button 
          onClick={() => setActiveTab('profile')}
          className={`flex flex-col items-center gap-1 ${activeTab === 'profile' ? 'text-blue-600' : 'text-slate-400'}`}
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span className="text-[10px] font-medium">Profil</span>
        </button>
      </nav>

      {/* Scanner Modal Overlay */}
      <AnimatePresence>
        {isScanning && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-[60] flex flex-col items-center justify-center p-4"
          >
            <div className="w-full max-w-xs aspect-square border-2 border-blue-500 rounded-3xl relative overflow-hidden mb-8">
              <div className="absolute inset-0 bg-gradient-to-b from-blue-500/20 to-transparent animate-scan" />
              <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-blue-500 rounded-tl-xl" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-blue-500 rounded-tr-xl" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-blue-500 rounded-bl-xl" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-blue-500 rounded-br-xl" />
            </div>
            <p className="text-white font-medium mb-8">Scan QR koden ved vaskehallen</p>
            <button 
              onClick={() => setIsScanning(false)}
              className="bg-white text-slate-900 px-8 py-3 rounded-full font-bold"
            >
              Luk Scanner
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
