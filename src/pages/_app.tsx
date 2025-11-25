import '../../styles/globals.css'
import type { AppProps } from 'next/app'
import Script from 'next/script'
import { Inter, Playfair_Display } from 'next/font/google'
import { useEffect, useState } from 'react'
import CookieConsent from '../components/CookieConsent'

function Plausible({ domain }: { domain?: string }){
  if(!domain) return null
  return <Script src="https://plausible.io/js/plausible.js" strategy="afterInteractive" data-domain={domain} />
}

const inter = Inter({ subsets: ['latin'], variable: '--font-body' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-display' })

export default function App({ Component, pageProps }: AppProps) {
  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN
  const [consent, setConsent] = useState<boolean | null>(null)

  useEffect(() => {
    try{
      const v = localStorage.getItem('washngobilcenter_consent_analytics')
      setConsent(v === 'true' ? true : v === 'false' ? false : null)
    }catch(e){ setConsent(null) }

    function onConsent(e: any){
      const a = e?.detail?.analytics
      setConsent(!!a)
    }
    window.addEventListener('consent:changed', onConsent as EventListener)
    return () => window.removeEventListener('consent:changed', onConsent as EventListener)
  }, [])

  // Only inject Plausible script if domain is set and user has accepted analytics
  const showPlausible = !!plausibleDomain && consent === true

  return (
    <div className={`${inter.variable} ${playfair.variable} font-sans`}> 
      {showPlausible && <Plausible domain={plausibleDomain} />}
      <Component {...pageProps} />
      <CookieConsent />
    </div>
  )
}
