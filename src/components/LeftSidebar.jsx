import { useState } from 'react'
import { ChevronDown, MessageCircle, ChevronRight } from 'lucide-react'
import './LeftSidebar.css'

function LeftSidebar({
  inboxes,
  selectedInbox,
  selectedTeam,
  selectedUser,
  selectedChannel,
  onInboxSelect,
  onTeamSelect,
  onUserSelect,
  onChannelSelect,
  isOpen,
  onToggle
}) {
  const [teamsExpanded, setTeamsExpanded] = useState(true)
  const [usersExpanded, setUsersExpanded] = useState(true)
  const [channelsExpanded, setChannelsExpanded] = useState(true)

  return (
    <>
      <button 
        className={`sidebar-toggle ${!isOpen ? 'collapsed' : ''}`}
        onClick={onToggle}
        title={isOpen ? 'Hide sidebar' : 'Show sidebar'}
      >
        {isOpen ? <ChevronRight size={18} /> : <ChevronRight size={18} className="flipped" />}
      </button>
      <div className={`left-sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-section">
        <div className="section-title">Inbox</div>
        <div className="section-items">
          <div
            className={`sidebar-item ${selectedInbox === 'all' ? 'active' : ''}`}
            onClick={() => onInboxSelect('all')}
          >
            <span className="item-label">All</span>
            <span className="item-count">{inboxes.myInbox.all}</span>
          </div>
          <div
            className={`sidebar-item ${selectedInbox === 'unassigned' ? 'active' : ''}`}
            onClick={() => onInboxSelect('unassigned')}
          >
            <span className="item-label">Unassigned</span>
            <span className="item-count">{inboxes.myInbox.unassigned}</span>
          </div>
        </div>
      </div>

      <div className="sidebar-section">
        <div
          className="section-header"
          onClick={() => setTeamsExpanded(!teamsExpanded)}
        >
          <span className="section-title">Teams</span>
          <ChevronDown 
            className={`expand-icon ${teamsExpanded ? 'expanded' : ''}`}
            size={14}
          />
        </div>
        {teamsExpanded && (
          <div className="section-items">
            <div
              className={`sidebar-item ${selectedTeam === 'Sales' ? 'active' : ''}`}
              onClick={() => onTeamSelect('Sales')}
            >
              <span className="item-label">Sales</span>
              <span className="item-count">{inboxes.teams.sales}</span>
            </div>
            <div
              className={`sidebar-item ${selectedTeam === 'Customer Support' ? 'active' : ''}`}
              onClick={() => onTeamSelect('Customer Support')}
            >
              <span className="item-label">Customer Support</span>
              <span className="item-count">{inboxes.teams.customerSupport}</span>
            </div>
          </div>
        )}
      </div>

      <div className="sidebar-section">
        <div
          className="section-header"
          onClick={() => setUsersExpanded(!usersExpanded)}
        >
          <span className="section-title">Users</span>
          <ChevronDown 
            className={`expand-icon ${usersExpanded ? 'expanded' : ''}`}
            size={14}
          />
        </div>
        {usersExpanded && (
          <div className="section-items">
            {inboxes.users.map((user, index) => (
              <div
                key={index}
                className={`sidebar-item ${selectedUser === user ? 'active' : ''}`}
                onClick={() => onUserSelect(user)}
              >
                <span className="item-label">{user}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="sidebar-section">
        <div
          className="section-header"
          onClick={() => setChannelsExpanded(!channelsExpanded)}
        >
          <span className="section-title">Channels</span>
          <ChevronDown 
            className={`expand-icon ${channelsExpanded ? 'expanded' : ''}`}
            size={14}
          />
        </div>
        {channelsExpanded && (
          <div className="section-items">
            {inboxes.channels.map((channel, index) => (
              <div
                key={index}
                className={`sidebar-item ${selectedChannel === channel ? 'active' : ''}`}
                onClick={() => onChannelSelect(channel)}
              >
                <MessageCircle className="channel-icon" size={16} />
                <span className="item-label">{channel}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    </>
  )
}

export default LeftSidebar

