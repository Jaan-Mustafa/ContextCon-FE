import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, Copy, RefreshCw, Mail, Clock, Loader2, Check } from 'lucide-react'
import toast from 'react-hot-toast'
import { api } from '../services/api'

export default function OutreachPage() {
  const { signalId } = useParams()
  const navigate = useNavigate()
  const [outreach, setOutreach] = useState(null)
  const [loading, setLoading] = useState(true)
  const [regenerating, setRegenerating] = useState(false)
  const [copied, setCopied] = useState(false)

  const fetchOutreach = async () => {
    try {
      const res = await api.generateOutreach(signalId)
      setOutreach(res.data)
    } catch (err) {
      toast.error('Failed to load outreach')
    } finally {
      setLoading(false)
    }
  }

  const handleRegenerate = async () => {
    setRegenerating(true)
    try {
      const res = await api.generateOutreach(signalId)
      setOutreach(res.data)
      toast.success('Outreach regenerated!')
    } catch (err) {
      toast.error('Failed to regenerate')
    } finally {
      setRegenerating(false)
    }
  }

  const handleCopy = () => {
    const text = `Subject: ${outreach.subject_line}\n\n${outreach.email_body}`
    navigator.clipboard.writeText(text)
    setCopied(true)
    toast.success('Copied to clipboard!')
    setTimeout(() => setCopied(false), 2000)
  }

  useEffect(() => {
    fetchOutreach()
  }, [signalId])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="text-center">
          <Loader2 className="h-10 w-10 text-violet-400 animate-spin mx-auto mb-4" />
          <p className="text-slate-400">Generating personalized outreach...</p>
        </div>
      </div>
    )
  }

  if (!outreach) return null

  const toneLabels = {
    warm_reconnect: 'Warm Reconnect',
    retention_save: 'Retention Save',
    competitive_pitch: 'Competitive Pitch',
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Link to="/dashboard" className="text-slate-400 hover:text-white text-sm flex items-center gap-1 mb-6 transition-colors">
        <ArrowLeft className="h-4 w-4" /> Back to Dashboard
      </Link>

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Outreach Composer</h1>
          <div className="flex items-center gap-3 mt-2">
            <span className="text-sm bg-violet-500/20 text-violet-300 border border-violet-500/30 px-3 py-1 rounded-full">
              {toneLabels[outreach.tone] || outreach.tone}
            </span>
            {outreach.timing_recommendation && (
              <span className="text-sm text-slate-400 flex items-center gap-1">
                <Clock className="h-3 w-3" /> {outreach.timing_recommendation}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden mb-6">
        <div className="border-b border-slate-800 px-6 py-4">
          <div className="flex items-center gap-2 text-sm text-slate-400 mb-2">
            <Mail className="h-4 w-4" /> Subject
          </div>
          <p className="text-white font-semibold text-lg">{outreach.subject_line}</p>
        </div>
        <div className="px-6 py-6">
          <pre className="text-slate-300 whitespace-pre-wrap font-sans leading-relaxed text-[15px]">
            {outreach.email_body}
          </pre>
        </div>
      </div>

      {outreach.talking_points && outreach.talking_points.length > 0 && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-6">
          <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-4">Talking Points</h3>
          <ul className="space-y-3">
            {outreach.talking_points.map((point, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-violet-400 mt-2 flex-shrink-0" />
                <span className="text-slate-300 text-sm leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex items-center gap-3">
        <button
          onClick={handleCopy}
          className="flex-1 bg-violet-600 hover:bg-violet-500 text-white py-3 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
        >
          {copied ? (
            <>
              <Check className="h-5 w-5" /> Copied!
            </>
          ) : (
            <>
              <Copy className="h-5 w-5" /> Copy Email
            </>
          )}
        </button>
        <button
          onClick={handleRegenerate}
          disabled={regenerating}
          className="bg-slate-800 hover:bg-slate-700 text-white py-3 px-6 rounded-xl font-medium transition-colors flex items-center gap-2"
        >
          {regenerating ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <RefreshCw className="h-5 w-5" />
          )}
          Regenerate
        </button>
      </div>
    </div>
  )
}
