type Props = { title: string; desc: string; price?: string }

export default function ServiceCard({ title, desc, price }: Props) {
  return (
    <article className="flex h-full flex-col justify-between rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl shadow-black/30 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-sky-400/60">
      <div>
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-slate-200">{desc}</p>
      </div>
      {price && <div className="mt-6 text-sm font-semibold uppercase tracking-[0.3em] text-sky-300">{price}</div>}
    </article>
  )
}
