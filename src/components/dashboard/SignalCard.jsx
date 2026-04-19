import { TrendingUp, AlertTriangle, Swords, ArrowRight, ExternalLink } from 'lucide-react'
import { scoreBg, urgencyColor, signalTypeBg, formatDays } from '../../utils/formatters'
import { SIGNAL_TYPES } from '../../utils/constants'

const typeIcons = {
  new_lead: TrendingUp,
  churn_risk: AlertTriangle,
  competitive_displacement: Swords,
}

export default function SignalCard({ signal, onClick }) {
  const TypeIcon = typeIcons[signal.type] || TrendingUp
  const typeConfig = SIGNAL_TYPES[signal.type] || SIGNAL_TYPES.new_lead

  return (
    <div
      onClick={onClick}
      className="bg-slate-900 border border-slate-800 rounded-xl p-6 cursor-pointer hover:border-slate-700 transition-all hover:shadow-lg hover:shadow-slate-900/50 group"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`${signalTypeBg(signal.type)} border rounded-lg p-2`}>
            <TypeIcon className={`h-5 w-5 ${signal.type === 'new_lead' ? 'text-emerald-400' : signal.type === 'churn_risk' ? 'text-red-400' : 'text-violet-400'}`} />
          </div>
          <div>
            <span className={`text-xs font-semibold uppercase tracking-wider ${signal.type === 'new_lead' ? 'text-emerald-400' : signal.type === 'churn_risk' ? 'text-red-400' : 'text-violet-400'}`}>
              {typeConfig.label}
            </span>
            <span className="text-slate-600 mx-2">|</span>
            <span className="text-xs text-slate-500">{signal.flow === 'champion_tracker' ? 'Champion Tracker' : 'Competitor Analyzer'}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className={`${scoreBg(signal.score)} border rounded-lg px-3 py-1`}>
            <span className="text-sm font-bold text-white">{signal.score}</span>
          </div>
          <span className={`${urgencyColor(signal.urgency)} text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider`}>
            {signal.urgency}
          </span>
        </div>
      </div>

      <div className="mb-3">
        <h3 className="text-lg font-semibold text-white group-hover:text-violet-300 transition-colors">
          {signal.person.name}
          <span className="text-slate-400 font-normal"> → </span>
          <span className="text-slate-300">{signal.person.title}</span>
          <span className="text-slate-400 font-normal"> at </span>
          <span className="text-white">{signal.person.new_company || signal.target_company?.name}</span>
        </h3>
        {signal.person.previous_company && (
          <p className="text-sm text-slate-500 mt-1">
            Previously: {signal.person.title} at {signal.person.previous_company}
          </p>
        )}
      </div>

      {signal.reasoning && (
        <p className="text-sm text-slate-400 leading-relaxed mb-4 line-clamp-2">
          {signal.reasoning}
        </p>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 text-xs text-slate-500">
          {signal.person.days_since_transition != null && (
            <span>{formatDays(signal.person.days_since_transition)}</span>
          )}
          {signal.target_company?.size && (
            <span>{signal.target_company.size.toLocaleString()} employees</span>
          )}
        </div>
        <span className="text-violet-400 text-sm font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          View Details <ArrowRight className="h-3 w-3" />
        </span>
      </div>
    </div>
  )
}
