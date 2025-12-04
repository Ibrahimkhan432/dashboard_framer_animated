import { useState } from 'react'
import LandingPage from './components/LandingPage'
import Dashboard from './components/Dashboard'
import './App.css'

function App() {
  const [showLanding, setShowLanding] = useState(true)
  const [dashboardLoaded, setDashboardLoaded] = useState(false)
  const [isFullScreen, setIsFullScreen] = useState(false)
  const [activatedComponents, setActivatedComponents] = useState({
    sidebar: false,
    contacts: false
  })

  const handleIconReachTarget = (targetComponent) => {
    if (targetComponent === 'sidebar') {
      setActivatedComponents(prev => ({ ...prev, sidebar: true }))
    } else if (targetComponent === 'contacts') {
      setActivatedComponents(prev => ({ ...prev, contacts: true }))
    }
  }

  const handleTransitionComplete = () => {
    setDashboardLoaded(true)
    setTimeout(() => {
      setShowLanding(false)
      setIsFullScreen(true)
    }, 500)
  }

  return (
    <div className="app">
      <Dashboard 
        isLoaded={dashboardLoaded} 
        isFullScreen={isFullScreen}
        activatedComponents={activatedComponents}
      />
      {showLanding && (
        <LandingPage 
          onTransitionComplete={handleTransitionComplete}
          onIconReachTarget={handleIconReachTarget}
        />
      )}
    </div>
  )
}

export default App

