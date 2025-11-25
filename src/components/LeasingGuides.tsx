import Link from 'next/link'
import Image from 'next/image'

const Icons = {
  ArrowRight: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
    </svg>
  ),
  BookOpen: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
    </svg>
  )
}

const guides = [
  {
    title: 'Hvad er flexleasing?',
    excerpt: 'Forstå fordelene ved flexleasing og hvorfor det ofte kan betale sig frem for køb.',
    category: 'Guide',
    readTime: '5 min læsning',
    href: '/docs',
    image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'Beskatning af fri bil 2025',
    excerpt: 'Få overblik over de nyeste regler for beskatning af firmabil og hvad det betyder for dig.',
    category: 'Lovgivning',
    readTime: '3 min læsning',
    href: '/docs',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'Restværdi forklaret',
    excerpt: 'Hvad betyder restværdi, og hvorfor er det den vigtigste faktor i din leasingaftale?',
    category: 'Økonomi',
    readTime: '4 min læsning',
    href: '/docs',
    image: 'https://images.unsplash.com/photo-1591696205602-2f950c417cb9?auto=format&fit=crop&w=800&q=80'
  }
]

export default function LeasingGuides() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Bliv klogere på leasing
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl">
              Vi har samlet en række guides der hjælper dig med at forstå leasingmarkedet.
            </p>
          </div>
          <Link 
            href="/docs" 
            className="hidden md:flex items-center text-slate-900 font-bold hover:text-slate-700 transition-colors mt-4 md:mt-0"
          >
            Se alle guides <Icons.ArrowRight className="ml-2" size={20} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {guides.map((guide, index) => (
            <Link 
              key={index} 
              href={guide.href}
              className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-slate-100 hover:shadow-xl transition-all duration-300"
            >
              <div className="h-48 bg-slate-100 relative overflow-hidden">
                <Image 
                  src={guide.image} 
                  alt={guide.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full text-xs font-bold text-slate-900 uppercase tracking-wider shadow-sm z-10">
                  {guide.category}
                </div>
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-sky-600 transition-colors">
                  {guide.title}
                </h3>
                <p className="text-slate-600 mb-4 flex-grow">
                  {guide.excerpt}
                </p>
                <div className="flex items-center text-sm text-slate-500 mt-auto pt-4 border-t border-slate-100">
                  <span>{guide.readTime}</span>
                  <span className="mx-2">•</span>
                  <span className="group-hover:text-sky-600 transition-colors flex items-center">
                    Læs artikel <Icons.ArrowRight size={14} className="ml-1" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="mt-8 text-center md:hidden">
          <Link 
            href="/docs" 
            className="inline-flex items-center text-slate-900 font-bold hover:text-slate-700 transition-colors"
          >
            Se alle guides <Icons.ArrowRight className="ml-2" size={20} />
          </Link>
        </div>
      </div>
    </section>
  )
}
