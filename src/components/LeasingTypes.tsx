import Link from 'next/link'

// Simple SVG icons to replace lucide-react since we can't install packages right now
const Icons = {
  User: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
    </svg>
  ),
  Briefcase: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
    </svg>
  ),
  PieChart: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/>
    </svg>
  ),
  Calendar: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/>
    </svg>
  ),
  ArrowRight: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
    </svg>
  )
}

const leasingTypes = [
  {
    title: 'Privatleasing',
    description: 'Kør i drømmebilen med fuld budgetsikkerhed og ingen uforudsete udgifter.',
    icon: Icons.User,
    href: '/leasing/privat',
    color: 'bg-blue-500'
  },
  {
    title: 'Erhvervsleasing',
    description: 'Attraktive beskatningsgrundlag og fleksible løsninger til din virksomhed.',
    icon: Icons.Briefcase,
    href: '/leasing/erhverv',
    color: 'bg-slate-700'
  },
  {
    title: 'Splitleasing',
    description: 'Del omkostningerne mellem privat og erhverv. Betal kun for det du kører.',
    icon: Icons.PieChart,
    href: '/leasing/split',
    color: 'bg-sky-600'
  },
  {
    title: 'Sæsonleasing',
    description: 'Kør cabriolet om sommeren og SUV om vinteren. Betal kun registreringsafgift i sæsonen.',
    icon: Icons.Calendar,
    href: '/leasing/saeson',
    color: 'bg-indigo-600'
  }
]

export default function LeasingTypes() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Vælg den rette leasingform
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Vi tilbyder skræddersyede leasingløsninger der passer til dine behov. 
            Uanset om det er til privat eller erhverv.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {leasingTypes.map((type) => (
            <Link 
              key={type.title} 
              href={type.href}
              className="group relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col"
            >
              <div className={`w-12 h-12 rounded-xl ${type.color} flex items-center justify-center mb-6 text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <type.icon size={24} />
              </div>
              
              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-sky-600 transition-colors">
                {type.title}
              </h3>
              
              <p className="text-slate-600 mb-6 flex-grow">
                {type.description}
              </p>
              
              <div className="flex items-center text-sky-600 font-medium group-hover:translate-x-2 transition-transform duration-300">
                Læs mere <Icons.ArrowRight size={16} className="ml-2" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
