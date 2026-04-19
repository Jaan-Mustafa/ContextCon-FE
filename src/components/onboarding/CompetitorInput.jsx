import { useState } from 'react'
import { ArrowLeft, Plus, X, Loader2, Rocket } from 'lucide-react'

export default function CompetitorInput({ competitors, onChange, onBack, onSubmit, loading }) {
  const [companyName, setCompanyName] = useState('')
  const [productName, setProductName] = useState('')

  const addCompetitor = () => {
    if (!companyName.trim() || !productName.trim()) return
    onChange([...competitors, { company_name: companyName.trim(), product_name: productName.trim() }])
    setCompanyName('')
    setProductName('')
  }

  const removeCompetitor = (index) => {
    onChange(competitors.filter((_, i) => i !== index))
  }

  return (
    <div>
      <h2 className="text-xl font-semibold text-white mb-1">Add competitors (optional)</h2>
      <p className="text-slate-400 text-sm mb-6">We'll find their customers and track leadership movements for displacement opportunities.</p>

      <div className="flex gap-2 mb-2">
        <input
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          placeholder="Company name"
          className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
        />
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          placeholder="Product name"
          className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
        />
        <button
          onClick={addCompetitor}
          disabled={!companyName.trim() || !productName.trim()}
          className="bg-violet-600 hover:bg-violet-500 disabled:opacity-40 text-white px-4 py-2.5 rounded-lg transition-colors"
        >
          <Plus className="h-5 w-5" />
        </button>
      </div>

      {competitors.length > 0 && (
        <div className="space-y-2 mt-4 mb-6">
          {competitors.map((c, i) => (
            <div key={i} className="flex items-center justify-between bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3">
              <div>
                <span className="text-white font-medium">{c.company_name}</span>
                <span className="text-slate-500 text-sm ml-2">({c.product_name})</span>
              </div>
              <button onClick={() => removeCompetitor(i)} className="text-slate-500 hover:text-red-400 transition-colors">
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {competitors.length === 0 && (
        <div className="text-center py-6 text-slate-500 text-sm">
          No competitors added. You can skip this step.
        </div>
      )}

      <div className="flex justify-between mt-8">
        <button onClick={onBack} className="text-slate-400 hover:text-white px-4 py-2.5 flex items-center gap-2 transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
        <button
          onClick={onSubmit}
          disabled={loading}
          className="bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-500 hover:to-pink-500 disabled:opacity-60 text-white px-8 py-2.5 rounded-lg font-semibold transition-all flex items-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Setting up...
            </>
          ) : (
            <>
              <Rocket className="h-4 w-4" /> Start Scanning
            </>
          )}
        </button>
      </div>
    </div>
  )
}
