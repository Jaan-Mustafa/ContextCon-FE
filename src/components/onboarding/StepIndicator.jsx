import { Check } from 'lucide-react'

const steps = ['Product Info', 'Customers', 'Competitors']

export default function StepIndicator({ currentStep }) {
  return (
    <div className="flex items-center justify-center gap-2">
      {steps.map((label, i) => {
        const stepNum = i + 1
        const isActive = stepNum === currentStep
        const isDone = stepNum < currentStep

        return (
          <div key={label} className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                  isDone
                    ? 'bg-violet-600 text-white'
                    : isActive
                      ? 'bg-violet-600 text-white'
                      : 'bg-slate-800 text-slate-500'
                }`}
              >
                {isDone ? <Check className="h-4 w-4" /> : stepNum}
              </div>
              <span className={`text-sm ${isActive ? 'text-white font-medium' : 'text-slate-500'}`}>
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className={`w-12 h-0.5 mx-1 ${isDone ? 'bg-violet-600' : 'bg-slate-800'}`} />
            )}
          </div>
        )
      })}
    </div>
  )
}
