import Link from 'next/link'

const navItems = [
  { href: '/services', label: 'Bilpleje & services' },
  { href: '/vehicles', label: 'Elbiler til salg' },
  { 
    href: '/leasing', 
    label: 'Leasingformer',
    children: [
      { href: '/leasing/privat', label: 'Privatleasing' },
      { href: '/leasing/erhverv', label: 'Erhvervsleasing' },
      { href: '/leasing/split', label: 'Splitleasing' },
      { href: '/leasing/saeson', label: 'Sæsonleasing' },
    ]
  },
  { href: '/pricing', label: 'Priser & klippekort' },
  { href: '/about', label: 'Om os' },
  { href: '/webshop', label: 'Webshop' },
  { href: '/booking', label: 'Book tid' },
  { href: '/contact', label: 'Kontakt os' }
]

export default function Header() {
  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-slate-100 bg-white/90 backdrop-blur-xl transition-all duration-300">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-900 text-lg font-bold text-white">
              WB
            </span>
            <span className="flex flex-col">
              <span className="text-sm font-bold uppercase tracking-wider text-slate-900">WashNGo</span>
              <span className="text-[10px] font-medium text-slate-500 uppercase tracking-widest">BilCenter</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
            {navItems.map((item) => (
              item.children ? (
                <div key={item.href} className="relative group">
                  <Link href={item.href} className="flex items-center gap-1 transition-colors hover:text-slate-900 py-4">
                    {item.label}
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 transition-transform group-hover:rotate-180"><path d="m6 9 6 6 6-6"/></svg>
                  </Link>
                  <div className="absolute left-0 top-full pt-0 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                    <div className="bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden py-2">
                      {item.children.map((child) => (
                        <Link 
                          key={child.href} 
                          href={child.href}
                          className="block px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link key={item.href} href={item.href} className="transition-colors hover:text-slate-900">
                  {item.label}
                </Link>
              )
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Link href="/booking" className="hidden rounded-full bg-slate-900 px-6 py-2.5 text-sm font-bold text-white transition-transform hover:scale-105 hover:bg-slate-800 md:block shadow-lg shadow-slate-900/20">
              Book tid
            </Link>
            <button className="md:hidden p-2 text-slate-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
            </button>
          </div>
        </div>
      </header>
      {/* Spacer to prevent content from being hidden behind fixed header */}
      <div className="h-[74px]" />
    </>
  )
}
