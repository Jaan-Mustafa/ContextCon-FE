export function scoreColor(score) {
  if (score >= 90) return 'text-red-400'
  if (score >= 70) return 'text-amber-400'
  return 'text-blue-400'
}

export function scoreBg(score) {
  if (score >= 90) return 'bg-red-500/20 border-red-500/40'
  if (score >= 70) return 'bg-amber-500/20 border-amber-500/40'
  return 'bg-blue-500/20 border-blue-500/40'
}

export function urgencyColor(urgency) {
  if (urgency === 'hot') return 'bg-red-500 text-white'
  if (urgency === 'warm') return 'bg-amber-500 text-black'
  return 'bg-slate-500 text-white'
}

export function signalTypeColor(type) {
  if (type === 'new_lead') return 'text-emerald-400'
  if (type === 'churn_risk') return 'text-red-400'
  return 'text-violet-400'
}

export function signalTypeBg(type) {
  if (type === 'new_lead') return 'bg-emerald-500/20 border-emerald-500/40'
  if (type === 'churn_risk') return 'bg-red-500/20 border-red-500/40'
  return 'bg-violet-500/20 border-violet-500/40'
}

export function formatDays(days) {
  if (!days && days !== 0) return 'Unknown'
  if (days === 0) return 'Today'
  if (days === 1) return '1 day ago'
  if (days < 30) return `${days} days ago`
  if (days < 60) return '1 month ago'
  return `${Math.floor(days / 30)} months ago`
}

export function formatRevenue(lower, upper) {
  const fmt = (n) => {
    if (!n) return '?'
    if (n >= 1e9) return `$${(n / 1e9).toFixed(1)}B`
    if (n >= 1e6) return `$${(n / 1e6).toFixed(0)}M`
    if (n >= 1e3) return `$${(n / 1e3).toFixed(0)}K`
    return `$${n}`
  }
  if (!lower && !upper) return 'Unknown'
  return `${fmt(lower)} - ${fmt(upper)}`
}
