import { Link } from 'react-router-dom'
import { Zap } from 'lucide-react'

export default function Navbar({ userId }) {
  return (
    <nav className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <Zap className="h-6 w-6 text-violet-400" />
            <span className="text-xl font-bold text-white">StackShift</span>
          </Link>
          <div className="flex items-center gap-4">
            {userId && (
              <Link
                to="/dashboard"
                className="text-slate-300 hover:text-white transition-colors text-sm font-medium"
              >
                Dashboard
              </Link>
            )}
            <Link
              to="/onboard"
              className="bg-violet-600 hover:bg-violet-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
