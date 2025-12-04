import { Mail, Users, Bot, Workflow, Megaphone, Settings } from 'lucide-react'
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
                <Settings className="settings-icon" size={16} />
                <div className="user-profile">
                    <div className="user-avatar">M</div>
                    <span className="user-name">Michael Johnson</span>
                </div>
            </div>
        </div>
    )
}

export default MainNavigationBar
