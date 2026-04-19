import { useState } from 'react'
import { X, ExternalLink, Mail, Loader2, TrendingUp, AlertTriangle, Swords, Building, User, Calendar, Target } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { scoreBg, urgencyColor, formatDays, formatRevenue } from '../../utils/formatters'
import { SIGNAL_TYPES } from '../../utils/constants'
import { api } from '../../services/api'

const typeIcons = {
  new_lead: TrendingUp,
  churn_risk: AlertTriangle,
  competitive_displacement: Swords,
}

export default function SignalDetail({ signal, onClose }) {
  const navigate = useNavigate()
  const [generating, setGenerating] = useState(false)
  const TypeIcon = typeIcons[signal.type] || TrendingUp
  const typeConfig = SIGNAL_TYPES[signal.type]

  const handleGenerateOutreach = async () => {
    setGenerating(true)
    try {
      await api.generateOutreach(signal.id)
      toast.success('Outreach generated!')
      navigate(`/outreach/${signal.id}`)
    } catch (err) {
      toast.error('Failed to generate outreach')
    } finally {
      setGenerating(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 bg-slate-900 border-b border-slate-800 px-6 py-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Signal Detail</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex items-center gap-3">
            <span className={`text-sm font-semibold uppercase ${signal.type === 'new_lead' ? 'text-emerald-400' : signal.type === 'churn_risk' ? 'text-red-400' : 'text-violet-400'}`}>
              {typeConfig?.label}
            </span>
            <div className={`${scoreBg(signal.score)} border rounded-lg px-3 py-1`}>
              <span className="text-sm font-bold text-white">Score: {signal.score}</span>
            </div>
            <span className={`${urgencyColor(signal.urgency)} text-xs font-bold px-2.5 py-1 rounded-full uppercase`}>
              {signal.urgency}
            </span>
            {signal.person.days_since_transition != null && (
              <span className="text-xs text-slate-500">{formatDays(signal.person.days_since_transition)}</span>
            )}
          </div>

          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <User className="h-4 w-4 text-slate-400" />
              <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider">Person</h3>
            </div>
            <p className="text-xl font-semibold text-white">{signal.person.name}</p>
            <p className="text-slate-300 mt-1">{signal.person.title} at {signal.person.new_company}</p>
            {signal.person.previous_company && (
              <p className="text-slate-500 text-sm mt-1">Previously: {signal.person.previous_company}</p>
            )}
            {signal.person.linkedin_url && (
              <a
                href={signal.person.linkedin_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-violet-400 text-sm mt-2 hover:text-violet-300"
              >
                LinkedIn <ExternalLink className="h-3 w-3" />
              </a>
            )}
          </div>

          {signal.target_company && (
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <Building className="h-4 w-4 text-slate-400" />
                <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider">Target Company</h3>
              </div>
              <p className="text-lg font-semibold text-white">{signal.target_company.name}</p>
              <div className="flex gap-6 mt-2 text-sm text-slate-400">
                {signal.target_company.size && (
                  <span>{signal.target_company.size.toLocaleString()} employees</span>
                )}
                {(signal.target_company.revenue_lower || signal.target_company.revenue_upper) && (
                  <span>Revenue: {formatRevenue(signal.target_company.revenue_lower, signal.target_company.revenue_upper)}</span>
                )}
              </div>
            </div>
          )}

          {signal.reasoning && (
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <Target className="h-4 w-4 text-slate-400" />
                <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider">Why This Signal</h3>
              </div>
              <p className="text-slate-300 leading-relaxed">{signal.reasoning}</p>
            </div>
          )}

          {signal.suggested_action && (
            <div className="bg-violet-500/10 border border-violet-500/30 rounded-xl p-5">
              <h3 className="text-sm font-medium text-violet-300 uppercase tracking-wider mb-2">Recommended Action</h3>
              <p className="text-slate-300">{signal.suggested_action}</p>
            </div>
          )}

          <button
            onClick={handleGenerateOutreach}
            disabled={generating}
            className="w-full bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-500 hover:to-pink-500 disabled:opacity-60 text-white py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
          >
            {generating ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" /> Generating Outreach...
              </>
            ) : (
              <>
                <Mail className="h-5 w-5" /> Generate Outreach Email
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
