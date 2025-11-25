import Header from '../components/Header'
import Footer from '../components/Footer'
import BookingForm from '../components/BookingForm'

// Simple SVG Icons
const CheckIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="20 6 9 17 4 12"/></svg>
)

const InfoIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
)

export default function BookingPage() {
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
                    Online Booking
                  </span>
                  <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 tracking-tight mb-6">
                    Din bil fortjener <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">det bedste</span>
                  </h1>
                  <p className="text-lg text-slate-600 leading-relaxed max-w-lg">
                    Uanset om du har brug for en hurtig vask eller en komplet klargøring, står vi klar. Book din tid nemt og hurtigt her.
                  </p>
                </div>

                <div className="space-y-8">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">Det får du hos os</h3>
                    <ul className="space-y-4">
                      {[
                        'Døgnåbent gør-det-selv anlæg',
                        'Professionel klargøring af eksperter',
                        'Miljøvenlige vaskeprodukter',
                        'Lounge med kaffe mens du venter'
                      ].map((item, i) => (
                        <li key={i} className="flex items-center gap-4 group">
                          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white border border-slate-100 flex items-center justify-center shadow-sm group-hover:border-blue-200 group-hover:scale-110 transition-all duration-300">
                            <CheckIcon className="w-5 h-5 text-blue-600" />
                          </div>
                          <span className="text-slate-700 font-medium">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-slate-900 rounded-2xl p-8 text-white shadow-xl shadow-slate-900/5 transform transition-transform hover:-translate-y-1">
                    <div className="flex items-start gap-4">
                      <InfoIcon className="w-6 h-6 text-blue-400 shrink-0 mt-1" />
                      <div>
                        <h4 className="font-bold text-lg mb-2">Har du spørgsmål?</h4>
                        <p className="text-slate-300 text-sm leading-relaxed mb-4">
                          Er du i tvivl om hvilken behandling din bil har brug for? Ring til os eller kig forbi butikken i åbningstiden.
                        </p>
                        <div className="text-sm font-bold text-blue-400">
                          +45 21 75 91 49
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Form */}
              <div className="relative lg:mt-0">
                <BookingForm />
              </div>

            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
