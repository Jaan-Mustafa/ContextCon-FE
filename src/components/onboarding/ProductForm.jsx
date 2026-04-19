import { ArrowRight } from 'lucide-react'

export default function ProductForm({ data, onChange, onNext }) {
  const isValid = data.email && data.company_name && data.product_name

  return (
    <div>
      <h2 className="text-xl font-semibold text-white mb-1">What product do you sell?</h2>
      <p className="text-slate-400 text-sm mb-6">We'll use this to match signals to your product.</p>

      <div className="space-y-4">
        <Field label="Your Email" value={data.email} onChange={(v) => onChange({ email: v })} placeholder="sales@company.com" />
        <Field label="Your Company" value={data.company_name} onChange={(v) => onChange({ company_name: v })} placeholder="Datadog" />
        <Field label="Product Name" value={data.product_name} onChange={(v) => onChange({ product_name: v })} placeholder="Datadog" />
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5">Product Description</label>
          <textarea
            value={data.product_description}
            onChange={(e) => onChange({ product_description: e.target.value })}
            placeholder="Cloud monitoring and observability platform"
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 resize-none"
            rows={3}
          />
        </div>
      </div>

      <div className="flex justify-end mt-8">
        <button
          onClick={onNext}
          disabled={!isValid}
          className="bg-violet-600 hover:bg-violet-500 disabled:opacity-40 disabled:cursor-not-allowed text-white px-6 py-2.5 rounded-lg font-medium transition-colors flex items-center gap-2"
        >
          Next <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

function Field({ label, value, onChange, placeholder }) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-300 mb-1.5">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
      />
    </div>
  )
}
