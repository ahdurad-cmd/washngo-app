import Image from 'next/image'
import Link from 'next/link'

type Props = { id: string; make: string; model: string; year?: number; price?: string; monthlyPrice?: string; img?: string }

export default function VehicleCard({ id, make, model, year, price, monthlyPrice, img }: Props) {
  return (
    <Link href={`/vehicles/${id}`} className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-xl shadow-slate-200/50 border border-slate-100 transition-all duration-300 hover:shadow-2xl hover:shadow-slate-200/80 hover:-translate-y-2">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
        <Image 
          src="/images/washngo-coming-soon.png?v=2" 
          alt={`${make} ${model}`} 
          fill 
          className="object-cover transition duration-700 group-hover:scale-105" 
        />
        <div className="absolute top-4 right-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold uppercase tracking-wider text-slate-900 backdrop-blur-md shadow-sm">
          På lager
        </div>
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-slate-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-6">
          <div className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">{make}</div>
          <h3 className="text-xl font-bold text-slate-900">
            {model} {year && <span className="font-normal text-slate-500">({year})</span>}
          </h3>
        </div>
        
        <div className="mt-auto pt-6 border-t border-slate-100">
          {monthlyPrice ? (
            <div className="flex items-end justify-between">
              <div>
                <span className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Leasing fra</span>
                <div className="text-2xl font-bold text-slate-900">{monthlyPrice} <span className="text-sm font-medium text-slate-500">/md</span></div>
              </div>
              <button className="rounded-full bg-slate-900 p-2 text-white transition-transform group-hover:scale-110 group-hover:bg-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </button>
            </div>
          ) : (
             price && (
               <div className="flex items-center justify-between">
                 <div className="text-xl font-bold text-slate-900">{price}</div>
                 <button className="rounded-full bg-slate-900 p-2 text-white transition-transform group-hover:scale-110 group-hover:bg-blue-600">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </button>
               </div>
             )
          )}
        </div>
      </div>
    </Link>
  )
}
