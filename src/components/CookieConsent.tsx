import { useEffect, useState } from 'react'

const STORAGE_KEY = 'washngobilcenter_consent_analytics'

export default function CookieConsent(){
  const [visible, setVisible] = useState(false)
  const [consent, setConsent] = useState<boolean | null>(null)

  useEffect(() => {
    try{
      const v = localStorage.getItem(STORAGE_KEY)
      if(v === null) setVisible(true)
      else setConsent(v === 'true')
    }catch(e){
      // ignore
    }
  }, [])

  function accept(){
    try{ localStorage.setItem(STORAGE_KEY, 'true') }catch(e){}
    setConsent(true)
    setVisible(false)
    // dispatch event so other components can react
    window.dispatchEvent(new CustomEvent('consent:changed', { detail: { analytics: true } }))
  }
  function decline(){
    try{ localStorage.setItem(STORAGE_KEY, 'false') }catch(e){}
    setConsent(false)
    setVisible(false)
    window.dispatchEvent(new CustomEvent('consent:changed', { detail: { analytics: false } }))
  }

  if(!visible) return null

  return (
    <div className="fixed left-4 right-4 bottom-4 bg-white border shadow p-4 rounded-md z-50">
      <div className="flex items-center justify-between gap-4">
        <div className="text-sm text-gray-700">Vi bruger kun analytics til at forbedre tjenesten. Accepter for at aktivere anonym måling (ingen cookies ved Plausible).</div>
        <div className="flex items-center gap-2">
          <button onClick={decline} className="px-3 py-2 border rounded">Afvis</button>
          <button onClick={accept} className="px-3 py-2 bg-primary text-white rounded">Accepter</button>
        </div>
      </div>
    </div>
  )
}
