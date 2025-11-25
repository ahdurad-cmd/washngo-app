import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'

const DATA_FILE = path.join(process.cwd(), 'data', 'contacts.json')

export default function handler(req: NextApiRequest, res: NextApiResponse){
  if(req.method === 'POST'){
    try{
      const entry = { id: Date.now(), ...req.body }
      let existing: any[] = []
      if(fs.existsSync(DATA_FILE)) existing = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'))
      existing.push(entry)
      fs.writeFileSync(DATA_FILE, JSON.stringify(existing, null, 2))
      return res.status(201).json({ ok: true })
    }catch(e){
      return res.status(500).json({ error: 'Kunne ikke gemme kontakt' })
    }
  }
  res.setHeader('Allow', ['POST'])
  res.status(405).end('Method Not Allowed')
}
