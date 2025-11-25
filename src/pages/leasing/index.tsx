import Link from 'next/link'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import LeasingTypes from '../../components/LeasingTypes'

export default function Leasing() {
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
                Leasing
              </span>
              <h1 className="text-4xl md:text-6xl font-bold text-slate-900 tracking-tight mb-6">
                Leasingformer <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  Find din løsning
                </span>
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed">
                Vi tilbyder fleksible leasingløsninger til både private og erhverv. 
                Uanset dine behov, har vi en model der passer til dig.
              </p>
            </div>
          </div>

          {/* Reuse the LeasingTypes component which now links to subpages */}
          <div className="-mt-20">
             <LeasingTypes />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
