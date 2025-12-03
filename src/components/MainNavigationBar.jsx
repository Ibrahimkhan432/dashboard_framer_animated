import { Mail, Users, Bot, Workflow, Megaphone } from 'lucide-react'
import './MainNavigationBar.css'

const tabs = [
    { id: 'Inbox', label: 'Inbox', icon: Mail },
    { id: 'Contacts', label: 'Contacts', icon: Users },
    { id: 'AI Employees', label: 'AI Employees', icon: Bot },
    { id: 'Workflows', label: 'Workflows', icon: Workflow },
    { id: 'Campaigns', label: 'Campaigns', icon: Megaphone }
]

function MainNavigationBar({ activeTab, setActiveTab }) {
    return (
        <div className="main-nav-bar">
            <div className="main-nav-tabs">
                <div className="top-nav-left">
                    <span className="boxpad-title">BOXpad</span>
                </div>

                {tabs.map(tab => {
                    const IconComponent = tab.icon
                    return (
                        <button
                            key={tab.id}
                            className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            <IconComponent className="tab-icon" size={16} />
                            <span className="tab-label">{tab.label}</span>
                        </button>
                    )
                })}
            </div>

            <div className="top-nav-right">
                <div className="user-profile">
                    <div className="user-avatar">MJ</div>
                    <span className="user-name">Michael Johnson</span>
                    <svg className="dropdown-arrow" width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
            </div>
        </div>
    )
}

export default MainNavigationBar
