import { FormEvent, useState } from 'react'

type StatusState = { type: 'success' | 'error'; message: string } | null

const fieldStyles = 'w-full rounded-xl border-0 bg-slate-50 px-4 py-4 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-blue-600 transition-all shadow-sm ring-1 ring-inset ring-slate-200'
const textareaStyles = 'w-full min-h-[160px] resize-none rounded-xl border-0 bg-slate-50 px-4 py-4 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-blue-600 transition-all shadow-sm ring-1 ring-inset ring-slate-200'

const topicOptions = [
  { value: '', label: 'Hvad vil du gerne tale om?' },
  { value: 'ev-sales', label: 'Spørgsmål til elbiler' },
  { value: 'leasing-financing', label: 'Leasing / finansiering' },
  { value: 'trade-in', label: 'Byttebil og vurdering' },
  { value: 'care-wash', label: 'Bilpleje og vask' },
  { value: 'other', label: 'Andet' }
]

export default function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [company, setCompany] = useState('')
  const [topic, setTopic] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<StatusState>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus({ type: 'error', message: 'Udfyld navn, email og din besked, så vender vi hurtigt tilbage.' })
      return
    }

    setIsSubmitting(true)
    setStatus(null)

    const payload = {
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      company: company.trim(),
      topic,
      message: message.trim()
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      if (res.ok) {
        setStatus({ type: 'success', message: 'Tak for din henvendelse. WashNGo BilCenter vender tilbage hurtigst muligt i butikkens åbningstid.' })
        setName('')
        setEmail('')
        setPhone('')
        setCompany('')
        setTopic('')
        setMessage('')
      } else {
        setStatus({ type: 'error', message: 'Der skete en fejl. Kontakt os på info@washngo.dk eller ring på +45 21 75 91 49.' })
      }
    } catch (err) {
      setStatus({ type: 'error', message: 'Netværksfejl. Tjek forbindelsen og prøv igen, eller ring til os direkte.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={submit} className="bg-white rounded-3xl shadow-2xl shadow-slate-200/50 p-8 lg:p-10 space-y-6" aria-label="Kontaktformular">
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 ml-1">
            Navn
          </label>
          <input
            id="contact-name"
            aria-required="true"
            className={fieldStyles}
            placeholder="Fulde navn"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isSubmitting}
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 ml-1">
            Email
          </label>
          <input
            id="contact-email"
            aria-required="true"
            className={fieldStyles}
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isSubmitting}
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="contact-phone" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 ml-1">
            Telefon
          </label>
          <input
            id="contact-phone"
            className={fieldStyles}
            placeholder="Telefonnummer"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            disabled={isSubmitting}
          />
        </div>
        <div>
          <label htmlFor="contact-company" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 ml-1">
            Firma
          </label>
          <input
            id="contact-company"
            className={fieldStyles}
            placeholder="Firma (valgfri)"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            disabled={isSubmitting}
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-topic" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 ml-1">
          Emne
        </label>
        <select
          id="contact-topic"
          className={fieldStyles}
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          disabled={isSubmitting}
        >
          {topicOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="contact-message" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 ml-1">
          Besked
        </label>
        <textarea
          id="contact-message"
          aria-required="true"
          className={textareaStyles}
          placeholder="Skriv din besked her..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={isSubmitting}
        />
      </div>

      {status && (
        <div className={`p-4 rounded-xl text-sm font-medium ${status.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'}`}>
          {status.message}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-xl bg-blue-600 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-blue-600/30 hover:bg-blue-700 hover:shadow-blue-600/40 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform active:scale-[0.98]"
      >
        {isSubmitting ? 'Sender...' : 'Send besked'}
      </button>
    </form>
  )
}
