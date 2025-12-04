import { useState } from 'react'
import { ChevronDown, MessageCircle, ChevronRight, Mail, List, UserX, TrendingUp, Headphones, Users, User } from 'lucide-react'
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
  onToggle,
  elementsVisible = {
    inboxTitle: true,
    myinboxItem: true,
    allItem: true,
    unassignedItem: true,
    teamsTitle: true,
    teamsItems: true,
    usersTitle: true,
    usersItems: true,
    channelsTitle: true,
    channelsItems: true
  }
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
        {elementsVisible.inboxTitle ? (
          <div className="section-title fade-in-element">
            <span className="sidebar-title sidebar-title-text">Inbox</span>
          </div>
        ) :(
          <div className="sidebar-item skeleton-placeholder"></div>
        )}
        {elementsVisible.myinboxItem ? (
          <div
            className={`sidebar-item fade-in-element ${selectedInbox === 'myinbox' ? 'active' : ''}`}
            onClick={() => onInboxSelect('myinbox')}
          >
            <User size={16} className="item-icon" fill='#010101'/>
            <span className="item-label">My Inbox</span>
            <span className="item-count">{inboxes.myInbox.myinbox}</span>
          </div>
        ) : (
          <div className="section-title skeleton-placeholder"></div>
        )}
        <div className="section-items">
          {elementsVisible.allItem ? (
            <div
              className={`sidebar-item fade-in-element ${selectedInbox === 'all' ? 'active' : ''}`}
              onClick={() => onInboxSelect('all')}
            >
              <Users size={16} className="item-icon" color='#010101' fill='#010101' stroke='#010101' />
              <span className="item-label">All</span>
              <span className="item-count">{inboxes.myInbox.all}</span>
            </div>
          )  : (
            <div className="sidebar-item skeleton-placeholder"></div>
          )}
          {elementsVisible.unassignedItem ? (
            <div
              className={`sidebar-item fade-in-element ${selectedInbox === 'unassigned' ? 'active' : ''}`}
              onClick={() => onInboxSelect('unassigned')}
            >
              <UserX size={16} className="item-icon" fill='#010101'/>
              <span className="item-label">Unassigned</span>
              <span className="item-count">{inboxes.myInbox.unassigned}</span>
            </div>
          ) : ( <div className="sidebar-item skeleton-placeholder"></div>
          )}
        </div>
      </div>

      <div className="sidebar-section">
        {elementsVisible.teamsTitle ? (
          <div
            className="section-header fade-in-element"
            onClick={() => setTeamsExpanded(!teamsExpanded)}
          >
            <span className="section-title">Teams</span>
            <ChevronDown 
              className={`expand-icon ${teamsExpanded ? 'expanded' : ''}`}
              size={14}
            />
          </div>
        ) : (
          <div className="section-header skeleton-placeholder">
            <div className="section-title"></div>
          </div>
        )}
        {teamsExpanded && (
          <div className="section-items">
            {elementsVisible.teamsItems ? (
              <>
                <div
                  className={`sidebar-item fade-in-element ${selectedTeam === 'Sales' ? 'active' : ''}`}
                  onClick={() => onTeamSelect('Sales')}
                >
                  <TrendingUp size={16} className="item-icon" />
                  <span className="item-label">Sales</span>
                  <span className="item-count">{inboxes.teams.sales}</span>
                </div>
                <div
                  className={`sidebar-item fade-in-element ${selectedTeam === 'Customer Support' ? 'active' : ''}`}
                  onClick={() => onTeamSelect('Customer Support')}
                >
                  <Headphones size={16} className="item-icon" />
                  <span className="item-label">Customer Support</span>
                  <span className="item-count">{inboxes.teams.customerSupport}</span>
                </div>
              </>
            ) : (
              <>
                <div className="sidebar-item skeleton-placeholder"></div>
                <div className="sidebar-item skeleton-placeholder"></div>
              </>
            )}
          </div>
        )}
      </div>

      <div className="sidebar-section">
        {elementsVisible.myinboxItem ? (
          <div
            className="section-header fade-in-element"
            onClick={() => setUsersExpanded(!usersExpanded)}
          >
            <span className="section-title">My Inbox</span>
            <ChevronDown 
              className={`expand-icon ${usersExpanded ? 'expanded' : ''}`}
              size={14}
            />
          </div>
        ) : (
          <div className="section-header skeleton-placeholder">
            <div className="section-title"></div>
          </div>
        )}
        {usersExpanded && (
          <div className="section-items">
            {elementsVisible.usersItems ? (
              inboxes.users.map((user, index) => (
                <div
                  key={index}
                  className={`sidebar-item fade-in-element ${selectedUser === user ? 'active' : ''}`}
                  onClick={() => onUserSelect(user)}
                >
                  <span className="item-label">{user}</span>
                </div>
              ))
            ) : (
              inboxes.users.map((user, index) => (
                <div key={index} className="sidebar-item skeleton-placeholder"></div>
              ))
            )}
          </div>
        )}
      </div>

      <div className="sidebar-section">
        {elementsVisible.channelsTitle ? (
          <div
            className="section-header fade-in-element"
            onClick={() => setChannelsExpanded(!channelsExpanded)}
          >
            <span className="section-title">Channels</span>
            <ChevronDown 
              className={`expand-icon ${channelsExpanded ? 'expanded' : ''}`}
              size={14}
            />
          </div>
        ) : (
          <div className="section-header skeleton-placeholder">
            <div className="section-title"></div>
          </div>
        )}
        {channelsExpanded && (
          <div className="section-items">
            {elementsVisible.channelsItems ? (
              inboxes.channels.map((channel, index) => (
                <div
                  key={index}
                  className={`sidebar-item fade-in-element ${selectedChannel === channel ? 'active' : ''}`}
                  onClick={() => onChannelSelect(channel)}
                >
                  <MessageCircle className="channel-icon" size={16} />
                  <span className="item-label">{channel}</span>
                </div>
              ))
            ) : (
              inboxes.channels.map((channel, index) => (
                <div key={index} className="sidebar-item skeleton-placeholder"></div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
    </>
  )
}

export default LeftSidebar

