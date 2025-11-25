import Image from 'next/image'

export interface ProductProps {
  id: string
  brand: string
  name: string
  category: string
  description: string
  note: string
  price: string
  img: string
}

interface Props extends ProductProps {
  onSelect?: () => void
  onAddToCart?: () => void
  isSelected?: boolean
}

export default function ProductCard(props: Props) {
  const { brand, name, category, description, note, price, img, onSelect, onAddToCart, isSelected } = props

  return (
    <article 
      onClick={onSelect}
      className={`group relative flex flex-col h-full overflow-hidden rounded-3xl bg-white transition-all duration-300 cursor-pointer ${isSelected ? 'ring-2 ring-blue-500 shadow-xl' : 'border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1'}`}
    >
      
      {/* Image Section */}
      <div className="relative aspect-square w-full overflow-hidden bg-slate-50 p-8 flex items-center justify-center group-hover:bg-blue-50/30 transition-colors duration-500">
        {/* Brand Badge */}
        <div className="absolute top-4 left-4 z-10">
          <span className="inline-flex items-center rounded-lg bg-white/90 backdrop-blur px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-900 shadow-sm border border-slate-100">
            {brand}
          </span>
        </div>

        {/* Product Image / Placeholder */}
        <div className="relative w-full h-full transition-transform duration-500 group-hover:scale-110">
          {img.includes('placeholder') ? (
            <svg className="w-full h-full text-slate-200 drop-shadow-lg" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M70 180H130C141.046 180 150 171.046 150 160V80C150 68.9543 141.046 60 130 60H115V40H125V20H75V40H85V60H70C58.9543 60 50 68.9543 50 80V160C50 171.046 58.9543 180 70 180Z" fill="currentColor" />
               <path d="M50 120H150" stroke="white" strokeWidth="2" strokeOpacity="0.5"/>
               <rect x="70" y="90" width="60" height="60" rx="4" fill="white" fillOpacity="0.2"/>
            </svg>
          ) : (
            <Image src={img} alt={name} fill className="object-contain" />
          )}
        </div>

        {/* Quick Add Button (Visible on Hover) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (onAddToCart) onAddToCart();
            else if (onSelect) onSelect();
          }}
          className={`absolute bottom-4 right-4 h-10 w-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${isSelected ? 'bg-green-500 text-white scale-100' : 'bg-slate-900 text-white translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 hover:bg-blue-600'}`}
        >
          {isSelected ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          )}
        </button>
      </div>

      {/* Content Section */}
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-4">
          <p className="text-xs font-medium text-slate-400 mb-1">{category}</p>
          <h3 className="text-lg font-bold text-slate-900 leading-tight group-hover:text-blue-600 transition-colors">
            {name}
          </h3>
        </div>
        
        <p className="text-sm text-slate-500 line-clamp-2 mb-6 flex-1">
          {description}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-slate-50 mt-auto">
          <div className="flex flex-col">
            <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">Pris</span>
            <span className="text-xl font-bold text-slate-900">{price}</span>
          </div>
          
          {/* Add to Cart Button */}
          <button 
            onClick={(e) => {
              e.stopPropagation();
              if (onAddToCart) onAddToCart();
              else if (onSelect) onSelect();
            }}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-colors flex items-center gap-2 ${isSelected ? 'bg-green-50 text-green-700' : 'bg-slate-100 text-slate-900 hover:bg-slate-200'}`}
          >
            {isSelected ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                <span>I kurv</span>
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                <span>Læg i kurv</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  )
}
