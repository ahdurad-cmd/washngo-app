import type { NextApiRequest, NextApiResponse } from 'next'

// Simple weather proxy using Open-Meteo (no key required)
// Copenhagen coordinates used as example.
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const url = 'https://api.open-meteo.com/v1/forecast?latitude=55.6761&longitude=12.5683&current_weather=true&hourly=precipitation_probability'
    const r = await fetch(url)
    if (!r.ok) {
      return res.status(200).json({ temp: 12, condition: 'Ukendt', rainChance: 20 })
    }
    const json = await r.json()
    const current = json.current_weather || {}
    // precipitation probability: take first hourly value if available
    const rainChance = Array.isArray(json?.hourly?.precipitation_probability) ? json.hourly.precipitation_probability[0] : 0
    const code = current.weathercode
    // Map weather codes to simple condition strings
    const conditions: Record<number, string> = {
      0: 'Klar himmel',
      1: 'Hovedsageligt klar',
      2: 'Delvist skyet',
      3: 'Overskyet',
      45: 'Tåge',
      51: 'Let støvregn',
      53: 'Støvregn',
      55: 'Kraftig støvregn',
      61: 'Let regn',
      63: 'Moderat regn',
      65: 'Kraftig regn',
      71: 'Let sne',
      73: 'Sne',
      75: 'Kraftig sne',
      95: 'Tordenbyger'
    }
    const condition = conditions[code] || 'Vejr'
    res.status(200).json({
      temp: typeof current.temperature === 'number' ? Math.round(current.temperature) : 12,
      condition,
      rainChance: rainChance ?? 0
    })
  } catch (e) {
    res.status(200).json({ temp: 12, condition: 'Delvist skyet', rainChance: 20 })
  }
}
