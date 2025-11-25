import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'
import { uploadToS3 } from '../../lib/storage'

export default async function handler(req: NextApiRequest, res: NextApiResponse){
  if(req.method !== 'POST') return res.status(405).end('Method Not Allowed')
  try{
    const { filename, content } = req.body
    if(!filename || !content) return res.status(400).json({ error: 'Manglende parameter' })

    const buf = Buffer.from(content, 'base64')

    // If S3 is configured, upload to S3 and return S3 path
    if(process.env.AWS_S3_BUCKET){
      try{
        const s3path = await uploadToS3(buf, filename)
        return res.status(200).json({ ok: true, path: s3path })
      }catch(err){
        // fallback to local storage if S3 fails
        console.error('S3 upload failed:', err)
      }
    }

    // Local fallback: write to public/docs
    const docsDir = path.join(process.cwd(), 'public', 'docs')
    if(!fs.existsSync(docsDir)) fs.mkdirSync(docsDir, { recursive: true })
    const filePath = path.join(docsDir, filename)
    fs.writeFileSync(filePath, buf)
    return res.status(200).json({ ok: true, path: `/docs/${filename}` })
  }catch(e){
    console.error(e)
    return res.status(500).json({ error: 'Kunne ikke gemme fil' })
  }
}
