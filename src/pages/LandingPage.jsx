import { Link } from 'react-router-dom'
import { Zap, Users, Shield, Target, ArrowRight } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-b from-violet-600/10 via-transparent to-transparent pointer-events-none" />

      <section className="max-w-5xl mx-auto px-4 pt-24 pb-16 text-center relative">
        <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/30 rounded-full px-4 py-1.5 mb-8">
          <Zap className="h-4 w-4 text-violet-400" />
          <span className="text-sm text-violet-300 font-medium">Powered by CrustData</span>
        </div>

        <h1 className="text-5xl sm:text-7xl font-extrabold text-white leading-tight mb-6">
          Every leadership change<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-pink-400">
            is a stack decision.
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10">
          StackShift detects when senior leaders switch companies and predicts which tools they'll bring or kill. Know who to sell to <strong className="text-white">this week</strong> — before your competitor does.
        </p>

        <div className="flex items-center justify-center gap-4">
          <Link
            to="/onboard"
            className="bg-violet-600 hover:bg-violet-500 text-white px-8 py-3.5 rounded-xl text-lg font-semibold transition-all hover:shadow-lg hover:shadow-violet-500/25 flex items-center gap-2"
          >
            Get Started <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-24">
        <div className="grid md:grid-cols-3 gap-6">
          <FeatureCard
            icon={<Users className="h-8 w-8 text-emerald-400" />}
            title="Champion Tracker"
            description="Track when your product's champions leave customer companies. Get two signals: a warm lead at their new company and a churn risk at the old one."
            color="emerald"
          />
          <FeatureCard
            icon={<Target className="h-8 w-8 text-violet-400" />}
            title="Competitor Analyzer"
            description="Discover your competitor's customers through job descriptions. Track leadership changes and find displacement opportunities."
            color="violet"
          />
          <FeatureCard
            icon={<Shield className="h-8 w-8 text-red-400" />}
            title="AI Outreach"
            description="Generate personalized outreach emails powered by Claude AI. Reference the person's background, timing, and context automatically."
            color="red"
          />
        </div>
      </section>

      <section className="border-t border-slate-800 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">How it works</h2>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <Step number="1" title="Add your customers" desc="Tell us which companies use your product and who your competitors are." />
            <Step number="2" title="Scan for signals" desc="We track leadership transitions using CrustData's real-time people intelligence." />
            <Step number="3" title="Act on signals" desc="Get scored, prioritized signals with AI-generated outreach ready to send." />
          </div>
        </div>
      </section>
    </div>
  )
}

function FeatureCard({ icon, title, description, color }) {
  return (
    <div className={`bg-slate-900/50 border border-slate-800 rounded-2xl p-8 hover:border-${color}-500/40 transition-colors`}>
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
      <p className="text-slate-400 leading-relaxed">{description}</p>
    </div>
  )
}

function Step({ number, title, desc }) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-12 h-12 rounded-full bg-violet-600 flex items-center justify-center text-white font-bold text-lg mb-4">
        {number}
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-slate-400 text-sm">{desc}</p>
    </div>
  )
}
