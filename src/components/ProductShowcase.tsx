import Image from 'next/image'

const products = [
  {
    id: 1,
    name: 'Nano Shampoo',
    price: '149,-',
    image: '/images/products/shampoo.png', // Placeholder path
    color: 'bg-blue-500'
  },
  {
    id: 2,
    name: 'Ceramic Wax',
    price: '299,-',
    image: '/images/products/wax.png', // Placeholder path
    color: 'bg-purple-500'
  },
  {
    id: 3,
    name: 'Rim Cleaner',
    price: '129,-',
    image: '/images/products/rim.png', // Placeholder path
    color: 'bg-red-500'
  }
]

export default function ProductShowcase() {
  return (
    <div className="relative w-full h-[400px] flex items-center justify-center perspective-1000">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse" />
      
      <div className="relative grid grid-cols-2 gap-4 transform rotate-y-12 rotate-x-6 transition-transform duration-500 hover:rotate-0">
        {products.map((product, index) => (
          <div 
            key={product.id}
            className={`
              relative bg-slate-800/90 backdrop-blur-md border border-slate-700 p-4 rounded-2xl shadow-xl
              transform transition-all duration-500 hover:scale-110 hover:z-10
              ${index === 0 ? 'col-span-2 translate-y-4' : ''}
              ${index === 1 ? '-rotate-6' : ''}
              ${index === 2 ? 'rotate-6' : ''}
            `}
          >
            <div className={`w-full h-32 ${product.color} rounded-xl mb-4 flex items-center justify-center opacity-80`}>
              <svg className="w-16 h-16 text-white opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <div className="font-bold text-white">{product.name}</div>
            <div className="text-blue-400 font-mono text-sm">{product.price}</div>
            
            {/* Fake "Add" button */}
            <div className="absolute bottom-4 right-4 w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors cursor-pointer">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Badge */}
      <div className="absolute -bottom-4 -right-4 bg-slate-800/90 backdrop-blur-md border border-slate-700 p-4 rounded-2xl shadow-xl animate-bounce-slow">
        <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-green-500/20 flex items-center justify-center">
            <svg className="w-6 h-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            </div>
            <div>
            <p className="text-xs text-slate-400 uppercase font-bold">Lagerstatus</p>
            <p className="text-sm font-bold text-white">På lager</p>
            </div>
        </div>
      </div>
    </div>
  )
}
