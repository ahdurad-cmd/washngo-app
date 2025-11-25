import Header from '../components/Header'
import Footer from '../components/Footer'
import SEO from '../components/SEO'
import Image from 'next/image'

export default function About() {
  return (
    <div className="min-h-screen bg-slate-50">
      <SEO title="Om os" description="Mød teamet bag WashNGo BilCenter. Vi brænder for elbiler, god service og professionel bilpleje." />
      <Header />
      
      <main>
        {/* Hero Section with Pattern */}
        <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl">
                    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-100/40 rounded-full blur-3xl mix-blend-multiply opacity-60" />
                    <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-100/40 rounded-full blur-3xl mix-blend-multiply opacity-60" />
                </div>
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]" />
            </div>

            <div className="container mx-auto px-4 text-center relative z-10">
                <span className="inline-flex items-center rounded-full bg-white/80 backdrop-blur-sm px-4 py-1.5 text-sm font-bold uppercase tracking-wider text-blue-600 shadow-sm ring-1 ring-blue-100 mb-8">
                    Siden 2020
                </span>
                <h1 className="text-5xl lg:text-7xl font-bold text-slate-900 tracking-tight mb-8">
                    Mere end bare <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                        et bilhus
                    </span>
                </h1>
                <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                    WashNGo er historien om en passion for biler, der voksede fra en lokal vaskehal til et moderne center for elbiler og leasing.
                </p>
            </div>
        </div>

        {/* Image & Story Section - Overlapping Layout */}
        <div className="container mx-auto px-4 mb-32">
            <div className="relative rounded-[3rem] overflow-hidden bg-slate-900 shadow-2xl">
                <div className="grid lg:grid-cols-2 gap-0">
                    <div className="relative h-[400px] lg:h-auto min-h-[500px] group">
                        <Image 
                            src="/images/huset.png" 
                            alt="WashNGo Bilhus Facade" 
                            fill 
                            className="object-cover transition-transform duration-1000 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/50 to-transparent lg:bg-gradient-to-t" />
                    </div>
                    <div className="p-12 lg:p-20 flex flex-col justify-center relative">
                        {/* Decorative quote mark */}
                        <div className="absolute top-12 left-12 text-8xl text-slate-800 font-serif opacity-50">"</div>
                        
                        <h2 className="text-3xl font-bold text-white mb-6 relative z-10">Fra drøm til virkelighed</h2>
                        <div className="space-y-6 text-slate-300 text-lg leading-relaxed relative z-10">
                            <p>
                                Det hele startede med en simpel mission: At skabe byens bedste vaskehal. Men i takt med at vi lærte vores kunder at kende, voksede ambitionerne. Vi oplevede, at mange bilejere savnede et sted, der ikke bare handlede om transaktionen, men om hele ejerskabet – fra den første prøvetur til den ugentlige vask.
                            </p>
                            <p>
                                Vi så et behov for ærlig rådgivning i et marked, der ofte kan virke uoverskueligt – især når det gælder skiftet til elbil. Derfor udvidede vi med salg og leasing, hvor gennemsigtighed er nøgleordet. Vi tror på, at tryghed skabes gennem viden, og vi bruger tid på at klæde dig på til fremtiden, uanset om du er førstegangskøber eller erfaren elbilist.
                            </p>
                            <p>
                                Hos WashNGo handler det ikke kun om at få nøglerne i hånden. Det handler om følelsen af at køre i en bil, der altid står skarpt. Vores unikke kombination af bilhus og professionelt plejecenter betyder, at vi kan tilbyde en helhedsløsning, som de færreste kan matche. Vi er ikke bare sælgere; vi er nørder, der går op i alt fra batterikemi til lakforsegling.
                            </p>
                        </div>

                        <div className="mt-12 grid grid-cols-2 gap-8 border-t border-slate-800 pt-8">
                            <div>
                                <div className="text-4xl font-bold text-white mb-1">120+</div>
                                <div className="text-sm text-slate-400 uppercase tracking-wider">Solgte biler</div>
                            </div>
                            <div>
                                <div className="text-4xl font-bold text-white mb-1">15k+</div>
                                <div className="text-sm text-slate-400 uppercase tracking-wider">Glade vaskekunder</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Values Section */}
        <div className="bg-white py-24 border-y border-slate-100">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">Vores DNA</h2>
                    <p className="text-slate-600 text-lg">Vi driver forretning efter tre simple principper, der sikrer dig den bedste oplevelse.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        {
                            title: "Gennemsigtighed",
                            desc: "Ingen skjulte gebyrer eller med småt. Vi gennemgår alle tal med dig, så du er tryg fra start til slut.",
                            icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        },
                        {
                            title: "Kvalitet",
                            desc: "Vi udvælger kun de bedste biler og bruger professionelle produkter i vores klargøring. Vi går ikke på kompromis.",
                            icon: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                        },
                        {
                            title: "Service",
                            desc: "Vi er her også efter handlen. Vores værksted og vaskehal står altid klar til at hjælpe dig videre.",
                            icon: "M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        }
                    ].map((value, i) => (
                        <div key={i} className="group p-8 rounded-3xl bg-slate-50 hover:bg-blue-50 transition-colors duration-300">
                            <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 text-blue-600">
                                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={value.icon} />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">{value.title}</h3>
                            <p className="text-slate-600 leading-relaxed">{value.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {/* Team Section */}
        <div className="py-24 container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                <div>
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">Mød holdet</h2>
                    <p className="text-slate-600 max-w-xl">
                        Vi er et lille, dedikeret team, der hver dag arbejder for at give dig den bedste oplevelse.
                    </p>
                </div>
                <a href="/contact" className="text-blue-600 font-bold hover:text-blue-700 flex items-center gap-2 group">
                    Kontakt os
                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </a>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {[
                    { name: "Ansat 1", role: "Salgschef & Leasing", img: "/images/ansatte.png" },
                    { name: "Ansat 2", role: "Kunderådgiver", img: "/images/ansatte.png" },
                    { name: "Ansat 3", role: "Klargøringsekspert", img: "/images/ansatte.png" }
                ].map((member, i) => (
                    <div key={i} className="group relative">
                        <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-slate-100 mb-4 shadow-md">
                            <Image 
                                src={member.img} 
                                alt={member.name}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                <p className="text-white font-medium">"Jeg elsker at finde den helt rigtige løsning til kunden."</p>
                            </div>
                        </div>
                        <h3 className="text-xl font-bold text-slate-900">{member.name}</h3>
                        <p className="text-blue-600 font-medium">{member.role}</p>
                    </div>
                ))}
            </div>
        </div>

      </main>
      <Footer />
    </div>
  )
}
