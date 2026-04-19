import { Routes, Route, Navigate } from 'react-router-dom'
import { useState } from 'react'
import LandingPage from './pages/LandingPage'
import OnboardingPage from './pages/OnboardingPage'
import DashboardPage from './pages/DashboardPage'
import OutreachPage from './pages/OutreachPage'
import Navbar from './components/layout/Navbar'

function App() {
  const [userId, setUserId] = useState(localStorage.getItem('stackshift_user_id'))

  const handleOnboarded = (id) => {
    localStorage.setItem('stackshift_user_id', id)
    setUserId(id)
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar userId={userId} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/onboard" element={<OnboardingPage onOnboarded={handleOnboarded} />} />
        <Route
          path="/dashboard"
          element={userId ? <DashboardPage userId={userId} /> : <Navigate to="/onboard" />}
        />
        <Route
          path="/outreach/:signalId"
          element={userId ? <OutreachPage userId={userId} /> : <Navigate to="/onboard" />}
        />
      </Routes>
    </div>
  )
}

export default App
