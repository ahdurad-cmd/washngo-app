import React, { useMemo, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  weather: { temp: number; condition: string; rainChance: number }
  washHistory: Array<{ station: string; date: string; cost: number; xpEarned: number }>
  onSelect: (washDurationTokens: number) => void
}

// Simple heuristic to recommend a program
// Could be expanded with backend ML later
const SmartRecommendation: React.FC<Props> = ({ weather, washHistory, onSelect }) => {
  // Compute hours since last wash from provided history
  const hoursSinceLast = useMemo(() => {
    if (!washHistory.length) return null
    const raw = washHistory[0].date // assume sorted newest first
    // Example format: '24. Nov 2024, 14:30'
    try {
      const parts = raw.split(',')
      const datePart = parts[0].trim() // '24. Nov 2024'
      const timePart = (parts[1] || '').trim() // '14:30'
      const [dayStr, monthStr, yearStr] = datePart.split(' ').filter(Boolean)
      const day = parseInt(dayStr.replace('.', ''), 10)
      const monthMap: Record<string, number> = { Jan:1, Feb:2, Mar:3, Apr:4, Maj:5, Jun:6, Jul:7, Aug:8, Sep:9, Okt:10, Nov:11, Dec:12 }
      const month = monthMap[monthStr] || 11
      const year = parseInt(yearStr, 10)
      const [hourStr, minuteStr] = timePart.split(':')
      const hour = parseInt(hourStr || '12', 10)
      const minute = parseInt(minuteStr || '0', 10)
      const dt = new Date(year, month - 1, day, hour, minute)
      const diffMs = Date.now() - dt.getTime()
      return Math.max(0, Math.round(diffMs / (1000 * 60 * 60)))
    } catch (e) {
      return null
    }
  }, [washHistory])

  const [selected, setSelected] = useState(false)
  const [collapsed, setCollapsed] = useState(false)

  const recommendation = useMemo(() => {
    // Available program options (example pricing)
    const programs = [
      { id: 'basic', name: 'Basis Vask', tokens: 2, currentPrice: 59, basePrice: 70, features: ['hurtig'] },
      { id: 'premium', name: 'Premium Vask', tokens: 3, currentPrice: 79, basePrice: 95, features: ['grundig'] },
      { id: 'premium_plus', name: 'Premium Plus Vask', tokens: 4, currentPrice: 99, basePrice: 120, features: ['voks', 'shine'] },
      { id: 'ceramic', name: 'Ceramic Protect', tokens: 5, currentPrice: 129, basePrice: 150, features: ['keramisk', 'maks beskyttelse'] }
    ]

    const rain = weather.rainChance
    let chosen = programs[2] // default Premium Plus

    // Adjust based on rain chance and time since last wash
    if (rain > 70) {
      // High rain soon: suggest cheaper quick wash to avoid wasted protection
      chosen = programs[0]
    } else if (rain > 40) {
      // Moderate rain: keep protective wax but avoid most expensive ceramic
      chosen = programs[2]
    } else if (rain <= 40) {
      if (hoursSinceLast != null && hoursSinceLast > 72) {
        // Long time since last + low rain: go for ceramic protection
        chosen = programs[3]
      } else if (hoursSinceLast != null && hoursSinceLast < 24) {
        // Very recent wash + low rain: lighter premium
        chosen = programs[1]
      } else {
        chosen = programs[2]
      }
    }

    const reasons: Array<{ icon: string; text: string }> = []
    if (rain > 40) reasons.push({ icon: 'cloudRain', text: 'Regn forventet' })
    if (chosen.features.includes('voks') || chosen.features.includes('keramisk')) reasons.push({ icon: 'zap', text: 'Voks anbefalet' })
    reasons.push({ icon: 'star', text: 'Populært valg' })
    if (chosen.features.includes('keramisk')) reasons.push({ icon: 'shield', text: 'Langtidsholdbar beskyttelse' })

    // Match score heuristic
    let matchScore = 0.85
    if (hoursSinceLast != null) {
      if (hoursSinceLast < 24) matchScore -= 0.1
      else if (hoursSinceLast > 72) matchScore += 0.07
    }
    if (rain > 70) matchScore -= 0.12
    else if (rain < 20) matchScore += 0.03
    if (chosen.id === 'ceramic') matchScore += 0.04
    matchScore = Math.min(0.99, Math.max(0.5, matchScore))

    const bestWindow = rain > 60 ? 'Efter regn' : 'Nu - kl. 11:00'
    return {
      program: chosen.name,
      tokens: chosen.tokens,
      basePrice: chosen.basePrice,
      currentPrice: chosen.currentPrice,
      reasons,
      matchScore,
      bestWindow,
      hoursSinceLast,
      rainChance: rain
    }
  }, [weather, washHistory, hoursSinceLast])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-3xl p-5 border border-blue-700 bg-gradient-to-br from-slate-800 to-slate-900 shadow-lg"
    >
      {/* Info Modal */}
      <RecommendationInfo />
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_left,#0066CC,transparent_60%)] pointer-events-none" />
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="text-xs uppercase tracking-wider font-bold text-blue-400 mb-1">Smart anbefaling</div>
          <h3 className="text-xl font-black text-white flex items-center gap-2">
            {recommendation.program}
            <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-blue-600/20 text-blue-300 border border-blue-600/30">AI</span>
          </h3>
          <p className="text-[11px] text-slate-400 mt-1">Baseret på vejr og din vaskhistorik</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCollapsed(c => !c)}
            className="w-8 h-8 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-200 flex items-center justify-center text-sm font-bold"
            aria-label={collapsed ? 'Udvid' : 'Skjul'}
          >
            {collapsed ? '▸' : '▾'}
          </button>
          <InfoButton recommendation={recommendation} />
        </div>
      </div>

      {!collapsed && (
        <>
          {/* Pricing (dynamic) */}
          <div className="flex items-end gap-3 mb-4">
            <div className="text-3xl font-black text-white leading-none">{recommendation.currentPrice},-</div>
            <div className="text-sm line-through text-slate-500">{recommendation.basePrice},-</div>
            <div className="text-xs font-bold text-green-400 bg-green-900/30 px-2 py-1 rounded-full border border-green-700/40">Spar {Math.round(((recommendation.basePrice - recommendation.currentPrice)/recommendation.basePrice)*100)}%</div>
          </div>

          {/* Reasons */}
          <div className="flex flex-wrap gap-2 mb-4">
            {recommendation.reasons.map(r => (
              <div key={r.text} className="flex items-center gap-1 text-[11px] font-medium px-2 py-1 rounded-full bg-slate-700/60 border border-slate-600 text-slate-200">
                <span>{r.icon === 'cloudRain' ? '🌧️' : r.icon === 'zap' ? '⚡' : r.icon === 'shield' ? '🛡️' : '💎'}</span>{r.text}
              </div>
            ))}
          </div>

          {/* Match + Timing */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="p-3 rounded-2xl bg-blue-900/30 border border-blue-700/40">
              <div className="text-[10px] font-semibold text-blue-300 mb-1">Match</div>
              <div className="text-xl font-black text-white">{Math.round(recommendation.matchScore*100)}%</div>
              <div className="text-[10px] text-slate-400">Til din nuværende situation</div>
            </div>
            <div className="p-3 rounded-2xl bg-indigo-900/30 border border-indigo-700/40">
              <div className="text-[10px] font-semibold text-indigo-300 mb-1">Bedste tidspunkt</div>
              <div className="text-sm font-bold text-white">{recommendation.bestWindow}</div>
              <div className="text-[10px] text-slate-400">Udnyt vejrforhold</div>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => { onSelect(recommendation.tokens); setSelected(true); }}
            className={`w-full py-4 rounded-xl font-bold text-white flex items-center justify-center gap-2 shadow-lg transition ${selected ? 'bg-gradient-to-r from-green-600 to-green-500 shadow-green-500/40' : 'bg-gradient-to-r from-[#0066CC] to-[#004C99] shadow-blue-500/30'}`}
          >
            {selected ? (
              <>
                <span className="text-lg">✅</span> Valgt
              </>
            ) : (
              `Vælg ${recommendation.program}`
            )}
          </motion.button>
        </>
      )}

      {collapsed && (
        <div className="mt-2 text-[11px] text-slate-400">Skjult – tryk ▸ for detaljer</div>
      )}
    </motion.div>
  )
}

// Separate button + modal logic for clarity
const InfoButton: React.FC<{ recommendation: any }> = ({ recommendation }) => {
  const [open, setOpen] = useState(false)
  const [opens, setOpens] = useState<number>(() => {
    if (typeof window === 'undefined') return 0
    const raw = localStorage.getItem('smartRecInfoOpens')
    return raw ? parseInt(raw, 10) || 0 : 0
  })

  useEffect(() => {
    if (open) {
      setOpens(prev => {
        const next = prev + 1
        try { localStorage.setItem('smartRecInfoOpens', String(next)) } catch {}
        return next
      })
    }
  }, [open])
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="w-8 h-8 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-200 flex items-center justify-center transition-colors"
        aria-label="Forklaring"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] flex items-center justify-center px-4"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-sm w-full rounded-2xl bg-slate-900 border border-slate-700 p-5 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-black text-white">Hvorfor denne anbefaling?</h4>
                <button
                  onClick={() => setOpen(false)}
                  className="w-8 h-8 rounded-xl bg-slate-700 text-white flex items-center justify-center"
                  aria-label="Luk"
                >
                  ✕
                </button>
              </div>
              <ul className="space-y-3 text-sm">
                <li className="flex gap-2"><span>🌧️</span><span className="text-slate-300">Regnchance {recommendation.reasons.find((r: any) => r.icon==='cloudRain') ? 'høj' : 'lav'} ⇒ beskyttende voks anbefales.</span></li>
                <li className="flex gap-2"><span>🧪</span><span className="text-slate-300">Premium Plus giver bedre lakbeskyttelse før fugt.</span></li>
                <li className="flex gap-2"><span>📈</span><span className="text-slate-300">Populært valg blandt lignende brugere (social proof).</span></li>
                <li className="flex gap-2"><span>⏱️</span><span className="text-slate-300">Optimalt tidsvindue: {recommendation.bestWindow} (vejrets udvikling).</span></li>
                <li className="flex gap-2"><span>🎯</span><span className="text-slate-300">Matchscore {Math.round(recommendation.matchScore*100)}% baseret på historik + vejr.</span></li>
                {recommendation.hoursSinceLast != null && (
                  <li className="flex gap-2"><span>🕒</span><span className="text-slate-300">Sidste vask for ca. {recommendation.hoursSinceLast} timer siden.</span></li>
                )}
              </ul>
              <div className="mt-5 flex justify-between items-center">
                <div className="text-[11px] text-slate-500">Heuristik v1 · Åbnet {opens} gange</div>
                <button
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold"
                >Forstået</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// Placeholder for potential future portal/integration
const RecommendationInfo: React.FC = () => null

export default SmartRecommendation
