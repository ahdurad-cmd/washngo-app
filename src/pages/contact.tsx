import Header from '../components/Header'
import Footer from '../components/Footer'
import ContactForm from '../components/ContactForm'

// Simple SVG Icons
const PhoneIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
)

const MailIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
)

const MapPinIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
)

const ClockIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
)

export default function Contact() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <main className="relative overflow-hidden">
        <div className="relative z-10 pt-6 pb-16 container mx-auto px-4">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-white shadow-2xl shadow-slate-200/50 border border-slate-100 px-6 py-16 lg:px-12">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 -mt-20 -mr-20 w-[600px] h-[600px] bg-blue-100/40 rounded-full blur-3xl mix-blend-multiply opacity-70 pointer-events-none" />
            <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-[500px] h-[500px] bg-indigo-100/40 rounded-full blur-3xl mix-blend-multiply opacity-70 pointer-events-none" />

            <div className="grid lg:grid-cols-2 gap-16 items-start relative z-10">
              
              {/* Left Column: Content */}
              <div className="space-y-12 pt-8">
                <div>
                  <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-600 ring-1 ring-inset ring-blue-600/20 mb-6">
                    Kontakt Os
                  </span>
                  <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 tracking-tight mb-6">
                    Vi er klar til at <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">hjælpe dig</span>
                  </h1>
                  <p className="text-lg text-slate-600 leading-relaxed max-w-lg">
                    Har du spørgsmål om biler, vask eller leasing? Vi sidder klar ved telefonen og tasterne for at give dig den bedste service.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow group">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 mb-4 group-hover:scale-110 transition-transform">
                      <PhoneIcon className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-slate-900 mb-1">Ring til os</h3>
                    <p className="text-sm text-slate-500 mb-3">Vi svarer i åbningstiden</p>
                    <a href="tel:+4521759149" className="text-lg font-bold text-blue-600 hover:text-blue-700">
                      +45 21 75 91 49
                    </a>
                  </div>

                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow group">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 mb-4 group-hover:scale-110 transition-transform">
                      <MailIcon className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-slate-900 mb-1">Send en mail</h3>
                    <p className="text-sm text-slate-500 mb-3">Svar indenfor 24 timer</p>
                    <a href="mailto:info@washngo.dk" className="text-lg font-bold text-blue-600 hover:text-blue-700">
                      info@washngo.dk
                    </a>
                  </div>

                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow group sm:col-span-2">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0 group-hover:scale-110 transition-transform">
                        <MapPinIcon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 mb-1">Besøg os</h3>
                        <p className="text-slate-600 font-medium">WashNGo BilCenter</p>
                        <p className="text-slate-600">Atletikvej 9, 9230 Svenstrup J</p>
                        <p className="text-sm text-slate-500 mt-2">Tæt ved IKEA Aalborg og E45</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900 rounded-2xl p-8 text-white shadow-xl shadow-slate-900/5">
                  <div className="flex items-start gap-4">
                    <ClockIcon className="w-6 h-6 text-blue-400 shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-lg mb-4">Åbningstider</h4>
                      <div className="space-y-2 text-sm text-slate-300">
                        <div className="flex justify-between border-b border-slate-800 pb-2">
                          <span>Butik & Værksted</span>
                          <span className="font-medium text-white">09:00 - 17:00</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-800 pb-2">
                          <span>Weekend</span>
                          <span className="font-medium text-white">Efter aftale</span>
                        </div>
                        <div className="flex justify-between pt-2">
                          <span>Gør-det-selv vask</span>
                          <span className="font-bold text-blue-400">Døgnåbent</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Form */}
              <div className="relative lg:mt-0">
                <ContactForm />
              </div>

            </div>

            {/* Interactive Map Section */}
            <div className="mt-16 rounded-3xl overflow-hidden shadow-xl border border-slate-100 h-[450px] relative z-10 bg-slate-100 group">
              <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl shadow-sm border border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-xs font-bold text-slate-900">Live kort</span>
                </div>
              </div>
              <iframe 
                width="100%" 
                height="100%" 
                title="Kort over WashNGo BilCenter"
                src="https://maps.google.com/maps?q=Atletikvej%209%2C%209230%20Svenstrup%20J&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                className="w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700"
                loading="lazy"
              ></iframe>
            </div>

          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}