export default function FilterBar({ filters, onChange }) {
  const typeOptions = [
    { value: null, label: 'All Types' },
    { value: 'new_lead', label: 'New Leads' },
    { value: 'churn_risk', label: 'Churn Risks' },
    { value: 'competitive_displacement', label: 'Competitive' },
  ]

  const urgencyOptions = [
    { value: null, label: 'All Urgency' },
    { value: 'hot', label: 'Hot' },
    { value: 'warm', label: 'Warm' },
    { value: 'cool', label: 'Cool' },
  ]

  return (
    <div className="flex items-center gap-3 mb-6 flex-wrap">
      <div className="flex bg-slate-900 border border-slate-800 rounded-lg overflow-hidden">
        {typeOptions.map((opt) => (
          <button
            key={opt.label}
            onClick={() => onChange({ ...filters, type: opt.value })}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              filters.type === opt.value
                ? 'bg-violet-600 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      <div className="flex bg-slate-900 border border-slate-800 rounded-lg overflow-hidden">
        {urgencyOptions.map((opt) => (
          <button
            key={opt.label}
            onClick={() => onChange({ ...filters, urgency: opt.value })}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              filters.urgency === opt.value
                ? 'bg-violet-600 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      <select
        value={filters.sort}
        onChange={(e) => onChange({ ...filters, sort: e.target.value })}
        className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-300 focus:outline-none focus:border-violet-500"
      >
        <option value="score">Sort by Score</option>
        <option value="date">Sort by Date</option>
      </select>
    </div>
  )
}
