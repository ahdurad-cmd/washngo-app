import { FormEvent, useState } from 'react'

const fieldStyles = 'w-full rounded-xl border-0 bg-slate-50 px-4 py-4 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-blue-600 transition-all shadow-sm ring-1 ring-inset ring-slate-200'

export default function BookingForm() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [service, setService] = useState('')
  const [date, setDate] = useState('')
  const [location, setLocation] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<null | string>(null)

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!name || !phone || !date) {
      setStatus('Udfyld navn, telefon og ønsket dato.')
      return
    }
    const payload = { name, phone, email, service, date, location, message }
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      if (res.ok) {
        setStatus('Booking modtaget — vi vender tilbage hurtigst muligt i åbningstiden.')
        setName('')
        setPhone('')
        setEmail('')
        setService('')
        setDate('')
        setLocation('')
        setMessage('')
      } else {
        setStatus('Der skete en fejl. Kontakt os på info@washngo.dk.')
      }
    } catch (err) {
      setStatus('Netværksfejl. Tjek forbindelsen og prøv igen.')
    }
  }

  return (
    <form onSubmit={submit} className="bg-white rounded-3xl shadow-2xl shadow-slate-200/50 p-8 lg:p-10 space-y-6" aria-label="Booking formular">
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="booking-name" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 ml-1">
            Navn
          </label>
          <input id="booking-name" aria-required="true" className={fieldStyles} placeholder="Fulde navn" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label htmlFor="booking-phone" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 ml-1">
            Telefon
          </label>
          <input id="booking-phone" aria-required="true" className={fieldStyles} placeholder="Telefon" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="booking-email" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 ml-1">
            Email
          </label>
          <input id="booking-email" className={fieldStyles} placeholder="Email (valgfri)" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label htmlFor="booking-service" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 ml-1">
            Service
          </label>
          <select id="booking-service" className={`${fieldStyles} bg-slate-50`} value={service} onChange={(e) => setService(e.target.value)}>
            <option value="">Vælg ønsket vask eller service</option>
            <option value="selfwash">Gør-det-selv bilvask</option>
            <option value="handwash">Udvendig håndvask</option>
            <option value="interior">Indvendig rengøring</option>
            <option value="full-care">Komplet bilpleje</option>
          </select>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="booking-date" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 ml-1">
            Dato og tid
          </label>
          <input id="booking-date" type="datetime-local" className={fieldStyles} value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div>
          <label htmlFor="booking-location" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 ml-1">
            Lokation
          </label>
          <input id="booking-location" className={fieldStyles} placeholder="Adresse eller ønsket lokation" value={location} onChange={(e) => setLocation(e.target.value)} />
        </div>
      </div>

      <div>
        <label htmlFor="booking-message" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 ml-1">
          Bemærkninger
        </label>
        <textarea id="booking-message" className={`${fieldStyles} min-h-[140px] rounded-2xl resize-none`} placeholder="Beskriv bilen, særlige ønsker eller referencer" value={message} onChange={(e) => setMessage(e.target.value)} />
      </div>

      <div className="pt-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <button className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-8 py-4 text-sm font-bold text-white transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/30 w-full md:w-auto" type="submit">
          Send bookingforespørgsel
        </button>
        {status && <div className="text-xs font-medium text-slate-500 md:w-1/2 text-right">{status}</div>}
      </div>
    </form>
  )
}
