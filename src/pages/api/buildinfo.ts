import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  const sha = process.env.VERCEL_GIT_COMMIT_SHA || 'local-dev'
  const ref = process.env.VERCEL_GIT_COMMIT_REF || 'unknown-ref'
  const version = (global as any).APP_DEPLOY_VERSION || 'no-global'
  res.setHeader('Cache-Control', 'no-store, must-revalidate')
  res.status(200).json({ sha, ref, version, timestamp: new Date().toISOString() })
}
