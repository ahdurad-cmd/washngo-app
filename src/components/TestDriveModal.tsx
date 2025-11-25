import { FormEvent, useState, useEffect } from 'react'

type Props = {
  isOpen: boolean
  onClose: () => void
  vehicleName: string
}

export default function TestDriveModal({ isOpen, onClose, vehicleName }: Props) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [date, setDate] = useState('')
  const [status, setStatus] = useState<null | string>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setStatus(null)
      setName('')
      setPhone('')
      setEmail('')
      setDate('')
    }
  }, [isOpen])

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setStatus('Tak for din forespørgsel! Vi kontakter dig hurtigst muligt for at bekræfte tiden.')
    setIsSubmitting(false)
    
    // Close after success (optional delay)
    // setTimeout(onClose, 3000)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* Modal Panel */}
      <div className="relative w-full max-w-lg transform overflow-hidden rounded-3xl bg-white p-8 shadow-2xl transition-all sm:p-10">
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>

        <div className="mb-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-600 mb-4">
            Book prøvetur
          </div>
          <h2 className="text-2xl font-bold text-slate-900">
            Oplev {vehicleName}
          </h2>
          <p className="mt-2 text-slate-600">
            Udfyld formularen herunder, så finder vi en tid der passer dig.
          </p>
        </div>

        {status ? (
          <div className="rounded-2xl bg-green-50 p-6 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <h3 className="text-lg font-bold text-green-900">Forespørgsel sendt!</h3>
            <p className="mt-2 text-green-700">{status}</p>
            <button 
              onClick={onClose}
              className="mt-6 w-full rounded-xl bg-green-600 px-4 py-3 font-bold text-white hover:bg-green-700 transition-colors"
            >
              Luk vindue
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 ml-1">Navn</label>
              <input
                type="text"
                id="name"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full rounded-xl border-0 bg-slate-50 px-4 py-3 text-slate-900 ring-1 ring-inset ring-slate-200 focus:ring-2 focus:ring-blue-600 transition-all"
                placeholder="Dit fulde navn"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 ml-1">Telefon</label>
                <input
                  type="tel"
                  id="phone"
                  required
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="w-full rounded-xl border-0 bg-slate-50 px-4 py-3 text-slate-900 ring-1 ring-inset ring-slate-200 focus:ring-2 focus:ring-blue-600 transition-all"
                  placeholder="88 88 88 88"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 ml-1">Email</label>
                <input
                  type="email"
                  id="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full rounded-xl border-0 bg-slate-50 px-4 py-3 text-slate-900 ring-1 ring-inset ring-slate-200 focus:ring-2 focus:ring-blue-600 transition-all"
                  placeholder="mail@eksempel.dk"
                />
              </div>
            </div>

            <div>
              <label htmlFor="date" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 ml-1">Ønsket dato</label>
              <input
                type="date"
                id="date"
                required
                value={date}
                onChange={e => setDate(e.target.value)}
                className="w-full rounded-xl border-0 bg-slate-50 px-4 py-3 text-slate-900 ring-1 ring-inset ring-slate-200 focus:ring-2 focus:ring-blue-600 transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-4 w-full rounded-xl bg-slate-900 px-4 py-4 font-bold text-white hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sender...
                </>
              ) : (
                'Send forespørgsel'
              )}
            </button>
            
            <p className="text-center text-xs text-slate-400 mt-4">
              Ved at indsende accepterer du vores privatlivspolitik.
            </p>
          </form>
        )}
      </div>
    </div>
  )
}