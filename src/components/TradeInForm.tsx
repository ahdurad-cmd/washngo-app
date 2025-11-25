import { FormEvent, useState } from 'react'

const inputBase =
  'w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all disabled:cursor-not-allowed disabled:opacity-60'

type StatusState = { type: 'success' | 'error'; message: string } | null

export default function TradeInForm({ minimal = false }: { minimal?: boolean }) {
  const [plate, setPlate] = useState('')
  const [mileage, setMileage] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [note, setNote] = useState('')
  const [status, setStatus] = useState<StatusState>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (!plate.trim() || !name.trim() || !phone.trim()) {
      setStatus({
        type: 'error',
        message: 'Udfyld nummerplade, navn og telefon, så giver vi et hurtigt byttebud.'
      })
      return
    }

    setIsSubmitting(true)
    setStatus(null)

    const payload = {
      plate: plate.trim(),
      mileage: mileage.trim(),
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      note: note.trim(),
      topic: 'trade-in'
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      if (res.ok) {
        setStatus({
          type: 'success',
          message: 'Tak! Vi slår din bil op og vender tilbage med et uforpligtende byttebud.'
        })
        setPlate('')
        setMileage('')
        setName('')
        setPhone('')
        setEmail('')
        setNote('')
      } else {
        setStatus({
          type: 'error',
          message: 'Der skete en fejl. Prøv igen, eller kontakt os direkte på info@washngo.dk eller +45 21 75 91 49.'
        })
      }
    } catch (err) {
      setStatus({
        type: 'error',
        message: 'Netværksfejl. Tjek forbindelsen og prøv igen, eller ring til os direkte.'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form
      onSubmit={submit}
      className={minimal ? "space-y-6" : "relative flex flex-col gap-6 rounded-3xl border border-slate-100 bg-white p-8 shadow-xl shadow-slate-200/50"}
      aria-label="Få byttebud via nummerplade"
    >
      {!minimal && (
        <div className="relative z-10">
          <div className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-600 ring-1 ring-inset ring-blue-600/20 mb-4">
            Byttebil
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">Få et hurtigt bud på din byttebil</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Skriv din nummerplade, så slår vi bilen op, vurderer den og giver dig et uforpligtende byttebud, du kan bruge i handlen på din næste elbil.
          </p>
        </div>
      )}

      <div className={`relative z-10 grid gap-5 ${minimal ? 'grid-cols-1' : 'md:grid-cols-2'}`}>
        <div className={minimal ? '' : 'md:col-span-2'}>
          <label htmlFor="tradein-plate" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5 ml-1">
            Nummerplade
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none z-10">
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 37 28" className="h-5 w-auto shadow-sm ring-1 ring-black/5 rounded-[1px]">
                 <path fill="#C8102E" d="M0 0h37v28H0z"/>
                 <path fill="#fff" d="M10 0h4v28h-4zM0 12h37v4H0z"/>
               </svg>
            </div>
            <input
              id="tradein-plate"
              aria-required="true"
              className="w-full rounded-lg border-2 border-[#C8102E] bg-white px-4 py-4 text-lg text-slate-900 placeholder:text-slate-300 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 pl-14 uppercase tracking-[0.3em] font-mono font-bold shadow-sm"
              placeholder="AB12345"
              value={plate}
              onChange={(e) => setPlate(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label htmlFor="tradein-mileage" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5 ml-1">
            Kilometerstand
          </label>
          <input
            id="tradein-mileage"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all duration-200"
            placeholder="F.eks. 120.000"
            value={mileage}
            onChange={(e) => setMileage(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="tradein-phone" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5 ml-1">
            Telefon
          </label>
          <input
            id="tradein-phone"
            type="tel"
            aria-required="true"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all duration-200"
            placeholder="Dit nummer"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="tradein-name" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5 ml-1">
            Navn
          </label>
          <input
            id="tradein-name"
            aria-required="true"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all duration-200"
            placeholder="Dit fulde navn"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="tradein-email" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5 ml-1">
            Email <span className="text-slate-400 font-normal normal-case">(valgfri)</span>
          </label>
          <input
            id="tradein-email"
            type="email"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all duration-200"
            placeholder="mail@eksempel.dk"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="tradein-note" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5 ml-1">
            Ekstra info
          </label>
          <textarea
            id="tradein-note"
            rows={3}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all duration-200"
            placeholder="Skriv gerne hvis der er skader, ekstraudstyr eller særlige forhold vi skal tage højde for..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>
      </div>

      <div className="relative z-10 pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-xl bg-slate-900 px-6 py-4 text-sm font-bold text-white shadow-lg shadow-slate-900/20 hover:bg-blue-600 hover:shadow-blue-600/30 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Sender...' : 'Få byttebud på min bil'}
        </button>
        <p className="mt-3 text-center text-xs text-slate-400">
          Vi vender normalt tilbage inden for samme hverdag i butikkens åbningstid.
        </p>
      </div>

      {status && (
        <div
          className={`relative z-10 rounded-xl p-4 text-sm font-medium ${
            status.type === 'success'
              ? 'bg-green-50 text-green-700 border border-green-100'
              : 'bg-red-50 text-red-700 border border-red-100'
          }`}
        >
          {status.message}
        </div>
      )}
    </form>
  )
}

