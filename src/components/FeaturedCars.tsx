import Image from 'next/image'
import Link from 'next/link'

const cars = [
  {
    id: '1',
    tag: 'Familiefavoritten',
    make: 'Tesla',
    model: 'Model Y',
    price: '3.495',
    image: '/images/washngo-coming-soon.png?v=2',
    features: ['Rækkevidde: 533 km', 'Bagagerum: 854 L']
  },
  {
    id: '2',
    tag: 'Luksusvalget',
    make: 'Audi',
    model: 'Q4 e-tron',
    price: '4.195',
    image: '/images/washngo-coming-soon.png?v=2',
    features: ['Rækkevidde: 508 km', 'Matrix LED']
  },
  {
    id: '3',
    tag: 'Bedst til prisen',
    make: 'Polestar',
    model: '2',
    price: '3.195',
    image: '/images/washngo-coming-soon.png?v=2',
    features: ['Rækkevidde: 551 km', 'Google System']
  }
]

export default function FeaturedCars() {
  return (
    <section className="py-16 relative z-10">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Månedens Udvalgte</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">Vi har håndplukket tre skarpe tilbud, der giver dig mest værdi for pengene lige nu.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cars.map((car) => (
            <Link href={`/vehicles/${car.id}`} key={car.id} className="group bg-white rounded-3xl shadow-lg shadow-slate-200/50 border border-slate-100 overflow-hidden hover:-translate-y-1 transition-all duration-300">
              <div className="relative aspect-[4/3] bg-slate-100">
                <Image 
                  src={car.image} 
                  alt={`${car.make} ${car.model}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-slate-900/90 backdrop-blur text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
                  {car.tag}
                </div>
              </div>
              
              <div className="p-6">
                <div className="mb-4">
                  <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">{car.make}</div>
                  <h3 className="text-xl font-bold text-slate-900">{car.model}</h3>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {car.features.map((feature, i) => (
                    <span key={i} className="text-xs font-medium text-slate-500 bg-slate-50 px-2 py-1 rounded-md border border-slate-100">
                      {feature}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div>
                    <div className="text-xs text-slate-400 font-medium uppercase">Fra</div>
                    <div className="text-xl font-bold text-slate-900">{car.price} <span className="text-sm font-normal text-slate-500">kr./md</span></div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
