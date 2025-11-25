const items = [
  {
    q: 'Sælger I primært elbiler?',
    a: 'Ja, vores fokus er på elbiler og ladbare modeller. Vi hjælper dig med at vælge en bil, der passer til dit kørselsbehov, rækkevidde og budget – og vi gennemgår gerne både fordele og ulemper ved skiftet til elbil.'
  },
  {
    q: 'Kan I hjælpe med leasing eller finansiering?',
    a: 'Vi samarbejder med udvalgte finansierings- og leasingselskaber. Sammen gennemgår vi kontantkøb, lån og leasing, så du får en løsning, der passer til din økonomi og dit kørselsmønster – uden små skrift-fælder.'
  },
  {
    q: 'Tager I min nuværende bil i bytte?',
    a: 'Ja, vi tager gerne din nuværende bil i bytte – også hvis det ikke er en elbil. Vi vurderer bilen ud fra stand, kilometer og markedssituation og giver dig et uforpligtende byttebud, som du kan bruge direkte i handlen på din næste bil.'
  },
  {
    q: 'Hvordan fungerer jeres gør-det-selv vask og bilpleje?',
    a: 'Vores gør-det-selv vaskeanlæg er døgnåbent, så du kan vaske bilen, når det passer dig. Derudover tilbyder vi professionel bilpleje – fx udvendig håndvask, indvendig rengøring og komplet klargøring – så både elbil og byttebil kan stå skarpt.'
  }
]

export default function FAQ() {
  return (
    <section aria-labelledby="faq-title" className="mx-auto mt-20 max-w-4xl">
      <div className="text-center">
        <p className="text-sm font-bold uppercase tracking-widest text-blue-600">FAQ</p>
        <h2 id="faq-title" className="mt-4 text-3xl font-bold text-slate-900">Ofte stillede spørgsmål</h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-600">
          Her finder du korte svar på de mest almindelige spørgsmål om elbiler, leasing, byttebil og gør-det-selv vask.
        </p>
      </div>
      <div className="mt-10 space-y-4">
        {items.map((item) => (
          <details
            key={item.q}
            className="group rounded-3xl border border-slate-100 bg-white p-6 text-left shadow-sm transition-colors duration-300 hover:border-blue-200"
          >
            <summary className="flex cursor-pointer items-center justify-between gap-4 text-base font-bold text-slate-900">
              <span>{item.q}</span>
              <span className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-xs font-semibold tracking-[0.2em] text-blue-600 group-open:rotate-90 transition-transform">
                +
              </span>
            </summary>
            <div className="mt-3 text-sm leading-relaxed text-slate-600">{item.a}</div>
          </details>
        ))}
      </div>
    </section>
  )
}
