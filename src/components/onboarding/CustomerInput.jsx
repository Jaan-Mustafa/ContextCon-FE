import { useState } from 'react'
import { ArrowLeft, ArrowRight, Plus, X } from 'lucide-react'

export default function CustomerInput({ customers, onChange, onBack, onNext }) {
  const [name, setName] = useState('')
  const [url, setUrl] = useState('')

  const addCustomer = () => {
    if (!name.trim()) return
    onChange([...customers, { company_name: name.trim(), linkedin_url: url.trim() || null }])
    setName('')
    setUrl('')
  }

  const removeCustomer = (index) => {
    onChange(customers.filter((_, i) => i !== index))
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addCustomer()
    }
  }

  return (
    <div>
      <h2 className="text-xl font-semibold text-white mb-1">Add your current customers</h2>
      <p className="text-slate-400 text-sm mb-6">We'll track leadership changes at these companies to find signals.</p>

      <div className="flex gap-2 mb-2">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Company name (e.g., Acme Corp)"
          className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
        />
        <button
          onClick={addCustomer}
          disabled={!name.trim()}
          className="bg-violet-600 hover:bg-violet-500 disabled:opacity-40 text-white px-4 py-2.5 rounded-lg transition-colors"
        >
          <Plus className="h-5 w-5" />
        </button>
      </div>
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="LinkedIn URL (optional)"
        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 mb-4"
      />

      {customers.length > 0 && (
        <div className="space-y-2 mb-6">
          {customers.map((c, i) => (
            <div key={i} className="flex items-center justify-between bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3">
              <div>
                <span className="text-white font-medium">{c.company_name}</span>
                {c.linkedin_url && (
                  <span className="text-slate-500 text-sm ml-2">{c.linkedin_url}</span>
                )}
              </div>
              <button onClick={() => removeCustomer(i)} className="text-slate-500 hover:text-red-400 transition-colors">
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {customers.length === 0 && (
        <div className="text-center py-8 text-slate-500 text-sm">
          No customers added yet. Add at least one to continue.
        </div>
      )}

      <div className="flex justify-between mt-8">
        <button onClick={onBack} className="text-slate-400 hover:text-white px-4 py-2.5 flex items-center gap-2 transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
        <button
          onClick={onNext}
          disabled={customers.length === 0}
          className="bg-violet-600 hover:bg-violet-500 disabled:opacity-40 disabled:cursor-not-allowed text-white px-6 py-2.5 rounded-lg font-medium transition-colors flex items-center gap-2"
        >
          Next <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
