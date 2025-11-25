import Header from '../components/Header'
import Hero from '../components/Hero'
import Footer from '../components/Footer'
import FAQ from '../components/FAQ'
import Testimonials from '../components/Testimonials'
import SEO from '../components/SEO'
import ExperienceTimeline from '../components/ExperienceTimeline'
import MembershipCTA from '../components/MembershipCTA'
import PartnerMarquee from '../components/PartnerMarquee'
import LeasingTypes from '../components/LeasingTypes'
import PriceCheckSection from '../components/PriceCheckSection'
import TrustBar from '../components/TrustBar'
import FeaturedCars from '../components/FeaturedCars'
import LeasingMatchmaker from '../components/LeasingMatchmaker'
import ProductShowcase from '../components/ProductShowcase'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <SEO
        title="Forside"
        description="WashNGo BilCenter i Svenstrup – Danmarks største gør-det-selv vaskeanlæg med professionel bilpleje. Book tid, se services og få en skarp pris."
      />
      <Header />
      <TrustBar />
      <main className="relative overflow-hidden bg-slate-50">
        
        {/* Background decoration */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-100/40 rounded-full blur-3xl mix-blend-multiply opacity-60" />
          <div className="absolute top-[800px] left-0 w-[600px] h-[600px] bg-indigo-100/40 rounded-full blur-3xl mix-blend-multiply opacity-60" />
        </div>

        {/* Hero Section */}
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6">
          <Hero />
          <PartnerMarquee />
        </div>

        {/* Featured Cars */}
        <FeaturedCars />

        {/* Leasing Matchmaker */}
        <LeasingMatchmaker />

        {/* Leasing Types */}
        <div className="relative z-10">
          <LeasingTypes />
        </div>

        {/* Price Check */}
        <div className="relative z-10">
          <PriceCheckSection />
        </div>

        {/* Experience Timeline */}
        <div className="relative z-10">
          <ExperienceTimeline />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-24 space-y-24">
          <Testimonials />
          
          <section className="relative overflow-hidden rounded-3xl bg-slate-900 px-6 py-16 sm:px-12 sm:py-24 lg:px-16 shadow-2xl">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/30 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
            </div>
            
            <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-4 py-1.5 text-sm font-medium text-blue-400 ring-1 ring-inset ring-blue-500/20 mb-6">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                  </span>
                  Webshop
                </div>
                
                <h2 className="text-4xl font-bold text-white sm:text-5xl mb-6 tracking-tight">
                  Professionel bilpleje <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                    til hjemmebrug
                  </span>
                </h2>
                
                <p className="text-lg text-slate-400 leading-relaxed mb-8 max-w-lg">
                  Vi har samlet de bedste produkter fra vores egen vaskehal. Køb de samme midler som de professionelle bruger, og giv din bil den kærlighed den fortjener.
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <Link href="/webshop" className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-4 text-base font-bold text-slate-900 shadow-lg shadow-white/10 transition-all hover:bg-blue-50 hover:scale-105">
                    Besøg webshop
                    <svg className="w-5 h-5 text-slate-400 group-hover:text-blue-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>

              {/* Visual Side */}
              <div className="relative lg:h-full min-h-[300px] flex items-center justify-center">
                 <ProductShowcase />
              </div>
            </div>
          </section>
          
          <MembershipCTA />
          <FAQ />
        </div>
      </main>
      <Footer />
    </>
  )
}
