import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { Loader2, Radar, RefreshCw } from 'lucide-react'
import { api } from '../services/api'
import StatsBar from '../components/dashboard/StatsBar'
import FilterBar from '../components/dashboard/FilterBar'
import SignalFeed from '../components/dashboard/SignalFeed'
import SignalDetail from '../components/dashboard/SignalDetail'

export default function DashboardPage({ userId }) {
  const [signals, setSignals] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [scanning, setScanning] = useState(false)
  const [selectedSignal, setSelectedSignal] = useState(null)
  const [filters, setFilters] = useState({ type: null, urgency: null, sort: 'score' })

  const fetchSignals = async () => {
    setLoading(true)
    try {
      const params = { sort: filters.sort }
      if (filters.type) params.type = filters.type
      if (filters.urgency) params.urgency = filters.urgency
      const res = await api.getSignals(userId, params)
      setSignals(res.data.signals)
      setTotal(res.data.total)
    } catch (err) {
      toast.error('Failed to load signals')
    } finally {
      setLoading(false)
    }
  }

  const handleScan = async () => {
    setScanning(true)
    try {
      const res = await api.scan(userId)
      const d = res.data
      toast.success(`Found ${d.signals_generated} signals! (${d.breakdown.new_leads} leads, ${d.breakdown.churn_risks} risks, ${d.breakdown.competitive_displacements} competitive)`)
      await fetchSignals()
    } catch (err) {
      toast.error('Scan failed — check API keys')
    } finally {
      setScanning(false)
    }
  }

  useEffect(() => {
    fetchSignals()
  }, [filters])

  const stats = {
    hot: signals.filter((s) => s.urgency === 'hot').length,
    warm: signals.filter((s) => s.urgency === 'warm').length,
    cool: signals.filter((s) => s.urgency === 'cool').length,
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Signal Dashboard</h1>
          <p className="text-slate-400 text-sm mt-1">{total} signals detected</p>
        </div>
        <button
          onClick={handleScan}
          disabled={scanning}
          className="bg-violet-600 hover:bg-violet-500 disabled:opacity-60 text-white px-6 py-2.5 rounded-lg font-medium transition-colors flex items-center gap-2"
        >
          {scanning ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Scanning...
            </>
          ) : (
            <>
              <Radar className="h-4 w-4" /> Scan Now
            </>
          )}
        </button>
      </div>

      <StatsBar stats={stats} />
      <FilterBar filters={filters} onChange={setFilters} />

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 text-violet-400 animate-spin" />
        </div>
      ) : signals.length === 0 ? (
        <div className="text-center py-20">
          <Radar className="h-16 w-16 text-slate-700 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No signals yet</h3>
          <p className="text-slate-400 mb-6">Hit "Scan Now" to detect leadership transitions at your customer companies.</p>
          <button
            onClick={handleScan}
            disabled={scanning}
            className="bg-violet-600 hover:bg-violet-500 text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
          >
            Run First Scan
          </button>
        </div>
      ) : (
        <SignalFeed signals={signals} onSelect={setSelectedSignal} />
      )}

      {selectedSignal && (
        <SignalDetail signal={selectedSignal} onClose={() => setSelectedSignal(null)} userId={userId} />
      )}
    </div>
  )
}
