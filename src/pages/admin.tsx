import { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Admin(){
  const [file, setFile] = useState<File | null>(null)
  const [status, setStatus] = useState<string | null>(null)

  async function upload(){
    if(!file){ setStatus('Vælg en fil først'); return }
    const reader = new FileReader()
    reader.onload = async () => {
      const base64 = (reader.result as string).split(',')[1]
      const payload = { filename: file.name, content: base64 }
      setStatus('Uploader...')
      const res = await fetch('/api/upload', { method: 'POST', headers: { 'Content-Type':'application/json' }, body: JSON.stringify(payload) })
      if(res.ok) setStatus('Upload OK — filen ligger i public/docs')
      else setStatus('Upload fejlede')
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <main className="relative overflow-hidden">
        <div className="relative z-10 pt-6 pb-16 container mx-auto px-4">
          {/* Hero Section */}
          <div className="relative overflow-hidden rounded-[2.5rem] bg-white shadow-2xl shadow-slate-200/50 border border-slate-100 px-6 py-24 text-center mb-20">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 -mt-20 -mr-20 w-[600px] h-[600px] bg-blue-100/40 rounded-full blur-3xl mix-blend-multiply opacity-60 pointer-events-none" />
            <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-[500px] h-[500px] bg-indigo-100/40 rounded-full blur-3xl mix-blend-multiply opacity-60 pointer-events-none" />

            <div className="relative z-10 max-w-3xl mx-auto">
              <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-600 ring-1 ring-inset ring-blue-600/20 mb-6">
                Administration
              </span>
              <h1 className="text-4xl font-bold text-slate-900 tracking-tight mb-4">
                Dokument <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  Upload
                </span>
              </h1>
              <p className="text-lg text-slate-600">
                Upload PDF-dokumenter som skal være tilgængelige under `/docs/`.
              </p>
            </div>
          </div>
            
          <div className="max-w-2xl mx-auto">
            
            <div className="bg-white rounded-2xl shadow-xl shadow-blue-900/5 border border-slate-100 p-8">
            <div className="max-w-lg">
              <input 
                type="file" 
                accept="application/pdf" 
                onChange={e => setFile(e.target.files?.[0] ?? null)}
                className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              <div className="mt-6">
                <button 
                  onClick={upload} 
                  className="px-6 py-2 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-colors font-medium"
                >
                  Upload dokument
                </button>
              </div>
              {status && (
                <div className={`mt-4 p-3 rounded-lg text-sm ${status.includes('OK') ? 'bg-green-50 text-green-700' : 'bg-slate-100 text-slate-700'}`}>
                  {status}
                </div>
              )}
            </div>
          </div>
          
          <div className="mt-8 p-4 bg-amber-50 border border-amber-100 rounded-xl text-sm text-amber-800">
            Bemærk: På hostingplatforme som Vercel er filsystemet read-only i produktion. Denne upload fungerer kun lokalt.
          </div>
        </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
