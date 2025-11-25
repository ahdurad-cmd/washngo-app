import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'

const DATA_FILE = path.join(process.cwd(), 'data', 'bookings.json')

export default function handler(req: NextApiRequest, res: NextApiResponse){
  if(req.method === 'POST'){
    const booking = { ...req.body, id: Date.now() }
    try{
      let existing: any[] = []
      if(fs.existsSync(DATA_FILE)){
        existing = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'))
      }
      existing.push(booking)
      fs.writeFileSync(DATA_FILE, JSON.stringify(existing, null, 2))
      return res.status(201).json({ success: true })
    }catch(e){
      return res.status(500).json({ error: 'Kunne ikke gemme booking.' })
    }
  }
  res.setHeader('Allow', ['POST'])
  res.status(405).end('Method Not Allowed')
}
