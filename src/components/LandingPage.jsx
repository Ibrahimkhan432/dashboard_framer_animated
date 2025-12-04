import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import inboxIcon from '../assets/icons/inbox.png'
import sparkleIcon from '../assets/icons/Frame.png'
import contactsIcon from '../assets/icons/Frame.png'
import aiIcon from '../assets/icons/ai.png'
import workflowsIcon from '../assets/icons/ai.png'
import polygonImage from '../assets/icons/polygon.png'
import './LandingPage.css'

const icons = [
  { id: 'contacts', src: contactsIcon, label: 'Contacts', color: '#f59e0b', angle: 180, targetComponent: 'contacts' },
  { id: 'ai', src: aiIcon, label: 'AI Employees', color: '#10b981', angle: 210, targetComponent: null },
  { id: 'workflows', src: workflowsIcon, label: 'Workflows', color: '#8b5cf6', angle: 150, targetComponent: null },
  { id: 'inbox', src: inboxIcon, label: 'Inbox', color: '#667eea', angle: 0, targetComponent: 'sidebar' },
  { id: 'sparkle', src: sparkleIcon, label: '', color: '#3b82f6', angle: -30, targetComponent: null },
  { id: 'sparkle2', src: sparkleIcon, label: '', color: '#ffffff', angle: 30, targetComponent: null },
]


function LandingPage({ onTransitionComplete, onIconReachTarget }) {
  const [phase, setPhase] = useState('floating') 
  const [currentAnimatingIcon, setCurrentAnimatingIcon] = useState(null)
  const containerRef = useRef(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setPhase('transitioning')
      setCurrentAnimatingIcon('inbox')
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleIconAnimationComplete = (iconId, targetComponent) => {
    if (targetComponent && onIconReachTarget) {
      onIconReachTarget(targetComponent)
    }

    if (iconId === 'inbox') {
      setTimeout(() => {
        setCurrentAnimatingIcon('contacts')
      }, 2500)
    } else if (iconId === 'contacts') {
      setTimeout(() => {
        setPhase('complete')
        onTransitionComplete()
      }, 2500)
    }
  }

  return (
    <div className={`landing-page ${phase}`}>

      <div className="honeycomb-container" ref={containerRef}>
        <div className="central-ring">
          <div className="ring ring-1"></div>
          <div className="ring ring-2"></div>
        </div>

        {icons.map((iconItem, index) => {
          const isAnimating = currentAnimatingIcon === iconItem.id
          const hasAnimated = currentAnimatingIcon && 
            ((iconItem.id === 'inbox' && (currentAnimatingIcon === 'contacts' || phase === 'complete')) ||
             (iconItem.id === 'contacts' && phase === 'complete'))

          const radius = 300
          const angleRad = (iconItem.angle * Math.PI) / 180
          const initialX = Math.cos(angleRad) * radius
          const initialY = Math.sin(angleRad) * radius

          const getTransitionAnimation = () => {
            const vw = window.innerWidth
            const vh = window.innerHeight
            const containerCenterX = vw * 0.5
            const containerCenterY = vh * 0.25
            
            const dashboardWidth = Math.min(vw * 0.9, 1400)
            const dashboardLeft = containerCenterX - dashboardWidth / 2
            const dashboardTop = vh * 0.6
            const navBarHeight = 56
            const padding = 12
            
            if (iconItem.id === 'inbox') {
              const sidebarWidth = 240
              const sidebarCenterX = dashboardLeft + padding + sidebarWidth / 2
              const sidebarCenterY = dashboardTop + navBarHeight + padding + (vh * 0.5 - navBarHeight - padding * 2) / 2
              
              const targetX = sidebarCenterX - containerCenterX - initialX
              const targetY = sidebarCenterY - containerCenterY - initialY
              
              return {
                x: targetX,
                y: targetY,
                scale: [1, 1, 0.95],
                opacity: [1, 1, 1],
                transition: {
                  duration: 3,
                  ease: "easeInOut",
                }
              }
            } else if (iconItem.id === 'contacts') {
              const detailsWidth = 320
              const detailsCenterX = dashboardLeft + dashboardWidth - padding - detailsWidth / 2
              const detailsCenterY = dashboardTop + navBarHeight + padding + (vh * 0.5 - navBarHeight - padding * 2) / 2
              
              const targetX = detailsCenterX - containerCenterX - initialX
              const targetY = detailsCenterY - containerCenterY - initialY
              
              return {
                x: targetX,
                y: targetY,
                scale: [1, 1, 1],
                opacity: [1, 1, 1],
                transition: {
                  duration: 3,
                  ease: "easeInOut",
                }
              }
            }
            return null
          }
          
          const transitionAnimation = getTransitionAnimation()


          if (hasAnimated) return null

          return (
            <motion.div
              key={iconItem.id}
              data-icon={iconItem.id}
              className="hexagon-icon"
              style={{
                '--angle': iconItem.angle,
                '--radius': '300px',
                '--color': iconItem.color,
                zIndex: isAnimating ? 1000 : 10,
              }}
              initial={{
                x: initialX,
                y: initialY,
                scale: 1,
                opacity: 1,
                filter: 'blur(0px)',
                zIndex: 10
              }}
              animate={isAnimating && transitionAnimation ? transitionAnimation : {
                x: initialX,
                y: [initialY, initialY - 15, initialY - 20, initialY - 15, initialY],
                rotate: [0, 5, 0, -5, 0],
                filter: 'blur(0px)',
                transition: {
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.2
                }
              }}
              onAnimationComplete={isAnimating && iconItem.targetComponent ? 
                () => {
                  handleIconAnimationComplete(iconItem.id, iconItem.targetComponent)
                } : 
                undefined
              }
            >
              <div className="hexagon-shape">
                <img 
                  src={polygonImage}
                  alt="Polygon"
                  className="polygon-bg"
                  style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    zIndex: 0,
                    pointerEvents: 'none'
                  }}
                />
                
                <motion.img 
                  src={iconItem.src} 
                  alt={iconItem.label || iconItem.id}
                  className="icon-img"
                  style={{
                    position: 'relative',
                    zIndex: 1,
                    width: '28px',
                    height: '28px',
                    objectFit: 'contain',
                    filter: 'drop-shadow(0 0 6px rgba(160, 158, 158, 0.4))'
                  }}
                  whileHover={{
                    scale: 1.1,
                    filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.6))',
                    transition: { duration: 0.3 }
                  }}
                />
              </div>
            </motion.div>
          )
        })}
      </div>

      <div className="loading-text-container">
        <h2 className="extracting-text">Extracting Information...</h2>
        <p className="extracting-subtext">
          We are extracting information from the above honey combs to your system
        </p>
      </div>
    </div>
  )
}

export default LandingPage

