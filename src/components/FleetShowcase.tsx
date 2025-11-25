import Link from 'next/link'
import vehicles from '../../data/vehicles.json'
import VehicleCard from './VehicleCard'

export default function FleetShowcase() {
  const curated = vehicles.slice(0, 3)

  return (
    <section>
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-10">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Udvalgte biler</h2>
          <p className="mt-2 text-lg text-slate-600 max-w-2xl">
            Vi har altid et bredt udvalg af premium elbiler på lager.
          </p>
        </div>
        <Link href="/vehicles" className="text-sm font-semibold text-slate-900 hover:text-slate-700 flex items-center">
          Se alle biler <span aria-hidden="true" className="ml-1">&rarr;</span>
        </Link>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {curated.map((vehicle: any) => (
          <div key={vehicle.id} className="h-full">
            <VehicleCard {...vehicle} />
          </div>
        ))}
      </div>
    </section>
  )
}
