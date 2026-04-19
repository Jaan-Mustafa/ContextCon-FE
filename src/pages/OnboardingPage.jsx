import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { api } from '../services/api'
import ProductForm from '../components/onboarding/ProductForm'
import CustomerInput from '../components/onboarding/CustomerInput'
import CompetitorInput from '../components/onboarding/CompetitorInput'
import StepIndicator from '../components/onboarding/StepIndicator'

export default function OnboardingPage({ onOnboarded }) {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    company_name: '',
    product_name: '',
    product_description: '',
    customers: [],
    competitors: [],
  })

  const updateForm = (fields) => setFormData((prev) => ({ ...prev, ...fields }))

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const res = await api.onboard(formData)
      onOnboarded(res.data.user_id)
      toast.success(`Tracking ${res.data.customers_tracked} customers and ${res.data.competitors_tracked} competitors`)
      navigate('/dashboard')
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Onboarding failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-white mb-2">Set up StackShift</h1>
        <p className="text-slate-400">Tell us about your product, customers, and competitors</p>
      </div>

      <StepIndicator currentStep={step} />

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 mt-8">
        {step === 1 && (
          <ProductForm
            data={formData}
            onChange={updateForm}
            onNext={() => setStep(2)}
          />
        )}
        {step === 2 && (
          <CustomerInput
            customers={formData.customers}
            onChange={(customers) => updateForm({ customers })}
            onBack={() => setStep(1)}
            onNext={() => setStep(3)}
          />
        )}
        {step === 3 && (
          <CompetitorInput
            competitors={formData.competitors}
            onChange={(competitors) => updateForm({ competitors })}
            onBack={() => setStep(2)}
            onSubmit={handleSubmit}
            loading={loading}
          />
        )}
      </div>
    </div>
  )
}
