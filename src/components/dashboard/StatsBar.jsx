import { Flame, Sun, Snowflake } from 'lucide-react'

export default function StatsBar({ stats }) {
  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      <StatCard icon={<Flame className="h-5 w-5 text-red-400" />} label="Hot Signals" count={stats.hot} color="red" />
      <StatCard icon={<Sun className="h-5 w-5 text-amber-400" />} label="Warm Signals" count={stats.warm} color="amber" />
      <StatCard icon={<Snowflake className="h-5 w-5 text-blue-400" />} label="Cool Signals" count={stats.cool} color="blue" />
    </div>
  )
}

function StatCard({ icon, label, count, color }) {
  return (
    <div className={`bg-slate-900 border border-slate-800 rounded-xl p-5 flex items-center gap-4`}>
      <div className={`bg-${color}-500/10 rounded-lg p-2.5`}>{icon}</div>
      <div>
        <div className="text-2xl font-bold text-white">{count}</div>
        <div className="text-sm text-slate-400">{label}</div>
      </div>
    </div>
  )
}
