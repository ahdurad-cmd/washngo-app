import { FormEvent, useMemo, useState } from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import ProductCard, { ProductProps } from '../components/ProductCard'
import products from '../../data/products.json'

// Simple SVG Icons
const ShoppingBagIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
)

const FilterIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
)

const XIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
)

const CheckIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="20 6 9 17 4 12"/></svg>
)

type Product = (typeof products)[number]

const FILTERS = [
  { id: 'all', label: 'Alle produkter' },
  { id: 'prewash', label: 'Før vask' },
  { id: 'wash', label: 'Vask' },
  { id: 'wheels', label: 'Fælge & dæk' },
  { id: 'interior', label: 'Kabine' },
  { id: 'finish', label: 'Finish & glas' }
]

function getFilterForProduct(product: Product): string {
  if (product.category.startsWith('Før vask')) return 'prewash'
  if (product.category.startsWith('Vask')) return 'wash'
  if (product.category.includes('fælg') || product.category.includes('dæk')) return 'wheels'
  if (product.category.toLowerCase().includes('kabine') || product.category.toLowerCase().includes('interiør')) return 'interior'
  if (product.category.toLowerCase().includes('sigt') || product.category.toLowerCase().includes('finish')) return 'finish'
  return 'all'
}

export default function Webshop() {
  const [activeFilter, setActiveFilter] = useState<string>('all')
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [basket, setBasket] = useState<ProductProps[]>([])
  const [email, setEmail] = useState('')
  const [note, setNote] = useState('')
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null)
  const [sending, setSending] = useState(false)

  const filteredProducts = useMemo(() => {
    if (activeFilter === 'all') return products
    return products.filter((p) => getFilterForProduct(p) === activeFilter)
  }, [activeFilter])

  const cartTotal = useMemo(() => {
    const toNumber = (price: string) => {
      const cleaned = price.replace(/[^0-9,\.]/g, '').replace('.', '').replace(',', '.')
      const value = parseFloat(cleaned)
      return Number.isNaN(value) ? 0 : value
    }
    return basket.reduce((sum, item) => sum + toNumber(item.price), 0)
  }, [basket])

  function toggleInBasket(product: Product) {
    setBasket((prev) => {
      const exists = prev.find((p) => p.id === product.id)
      if (exists) {
        return prev.filter((p) => p.id !== product.id)
      }
      const { id, brand, name, category, description, note, price, img } = product
      return [...prev, { id, brand, name, category, description, note, price, img }]
    })
  }

  async function submitBasket(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!basket.length) {
      setStatus({ type: 'error', message: 'Vælg mindst ét produkt, før du sender en forespørgsel.' })
      return
    }
    if (!email.trim()) {
      setStatus({ type: 'error', message: 'Skriv din email, så vi kan svare dig.' })
      return
    }

    setSending(true)
    setStatus(null)

    const payload = {
      topic: 'webshop-cart',
      email: email.trim(),
      message: note.trim() || 'Ordre fra WashNGo BilCenter webshop (ikke-betalende).',
      products: basket.map((p) => ({ id: p.id, name: p.name, brand: p.brand, price: p.price }))
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      if (res.ok) {
        setStatus({ type: 'success', message: 'Tak! Vi har modtaget din forespørgsel og vender tilbage hurtigst muligt.' })
        setBasket([])
        setEmail('')
        setNote('')
      } else {
        setStatus({ type: 'error', message: 'Der skete en fejl. Prøv igen eller kontakt os direkte.' })
      }
    } catch (err) {
      setStatus({ type: 'error', message: 'Netværksfejl. Tjek din forbindelse.' })
    } finally {
      setSending(false)
    }
  }

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
                Webshop
              </span>
              <h1 className="text-4xl md:text-6xl font-bold text-slate-900 tracking-tight mb-6">
                Professionelle <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  plejeprodukter
                </span>
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed">
                Vi forhandler kun de produkter vi selv bruger i vores daglige arbejde. 
                Kvalitetstestet og godkendt af vores egne specialister.
              </p>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="lg:w-3/4">
              {/* Filters */}
              <div className="flex flex-wrap items-center gap-3 mb-8 p-4 bg-white rounded-xl shadow-sm border border-slate-100">
                <div className="flex items-center gap-2 text-slate-500 mr-2">
                  <FilterIcon className="w-4 h-4" />
                  <span className="text-sm font-medium">Kategori:</span>
                </div>
                
                {FILTERS.map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => setActiveFilter(filter.id)}
                    className={`px-4 py-2 rounded-full text-sm transition-all ${
                      activeFilter === filter.id
                        ? 'bg-slate-900 text-white shadow-md'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>

              {/* Product Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    {...product}
                    onSelect={() => setSelectedProduct(product)}
                    onAddToCart={() => toggleInBasket(product)}
                    isSelected={!!basket.find(p => p.id === product.id)}
                  />
                ))}
              </div>
            </div>

            {/* Sidebar / Cart */}
            <div className="lg:w-1/4">
              <div className="sticky top-24 space-y-6">
                {/* Cart Widget */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-50">
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                      <ShoppingBagIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900">Din kurv</h3>
                      <p className="text-xs text-slate-500">{basket.length} produkter valgt</p>
                    </div>
                  </div>

                  {basket.length === 0 ? (
                    <div className="text-center py-8 text-slate-400 text-sm">
                      Din kurv er tom
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <ul className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                        {basket.map((item) => (
                          <li key={item.id} className="flex justify-between items-start text-sm group">
                            <div>
                              <div className="font-medium text-slate-900">{item.name}</div>
                              <div className="text-xs text-slate-500">{item.brand}</div>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="font-medium text-slate-900">{item.price}</span>
                              <button 
                                onClick={() => toggleInBasket(item as any)}
                                className="text-slate-300 hover:text-red-500 transition-colors"
                              >
                                <XIcon className="w-4 h-4" />
                              </button>
                            </div>
                          </li>
                        ))}
                      </ul>
                      
                      <div className="pt-4 border-t border-slate-100 flex justify-between items-center font-bold text-slate-900">
                        <span>I alt (ca.)</span>
                        <span>{cartTotal.toLocaleString('da-DK', { minimumFractionDigits: 2 })} kr.</span>
                      </div>

                      <form onSubmit={submitBasket} className="space-y-4 pt-4">
                        <div>
                          <label htmlFor="email" className="sr-only">Email</label>
                          <input
                            type="email"
                            id="email"
                            required
                            placeholder="Din email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
                          />
                        </div>
                        <div>
                          <label htmlFor="note" className="sr-only">Besked</label>
                          <textarea
                            id="note"
                            placeholder="Evt. besked / spørgsmål..."
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all h-24"
                          />
                        </div>

                        {status && (
                          <div className={`p-3 rounded-lg text-xs ${status.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                            {status.message}
                          </div>
                        )}

                        <button
                          type="submit"
                          disabled={sending}
                          className="w-full py-3 px-4 bg-slate-900 text-white text-sm font-medium rounded-xl hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {sending ? 'Sender...' : 'Send forespørgsel'}
                        </button>
                        <p className="text-[10px] text-center text-slate-400">
                          Dette er en forespørgsel. Vi kontakter dig for betaling og afhentning.
                        </p>
                      </form>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Product Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 md:p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2">{selectedProduct.brand}</div>
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900">{selectedProduct.name}</h2>
                </div>
                <button 
                  onClick={() => setSelectedProduct(null)}
                  className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                >
                  <XIcon className="w-6 h-6 text-slate-500" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="max-w-none">
                  <p className="text-slate-600 leading-relaxed text-sm">{selectedProduct.description}</p>
                  <p className="text-slate-500 text-xs mt-4 italic">{selectedProduct.note}</p>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                  <div className="text-2xl font-bold text-slate-900">{selectedProduct.price}</div>
                  <button
                    onClick={() => {
                      toggleInBasket(selectedProduct)
                      setSelectedProduct(null)
                    }}
                    className={`px-6 py-3 rounded-xl text-sm font-medium transition-colors ${
                      basket.find(p => p.id === selectedProduct.id)
                        ? 'bg-red-50 text-red-600 hover:bg-red-100'
                        : 'bg-slate-900 text-white hover:bg-slate-800'
                    }`}
                  >
                    {basket.find(p => p.id === selectedProduct.id) ? 'Fjern fra kurv' : 'Læg i kurv'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
