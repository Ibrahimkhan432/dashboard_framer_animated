import { useState } from 'react'
import { Search, Edit, ChevronLeft } from 'lucide-react'
import './ChatListPanel.css'

function ChatListPanel({ chats, selectedChat, onChatSelect, isOpen, onToggle }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('Open')
  const [sortFilter, setSortFilter] = useState('Newest')

  const filteredChats = chats.filter(chat =>
    chat.contactName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <>
      <button 
        className={`chat-list-toggle ${!isOpen ? 'collapsed' : ''}`}
        onClick={onToggle}
        title={isOpen ? 'Hide chat list' : 'Show chat list'}
      >
        <ChevronLeft size={18} className={isOpen ? '' : 'flipped'} />
      </button>
      <div className={`chat-list-panel ${isOpen ? 'open' : 'closed'}`}>
      <div className="chat-list-header">
        <div className="chat-list-title">
          <span>Michael Johnson</span>
          <button className="edit-icon"><Edit size={14} /></button>
        </div>
        <div className="chat-list-title">
          <span>{selectedChat?.contactName || 'Select a chat'}</span>
          <button className="edit-icon"><Edit size={14} /></button>
        </div>
      </div>

      <div className="chat-list-search">
        <input
          type="text"
          placeholder="Q Search Chat"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <button className="filter-icon"><Search size={18} /></button>
      </div>

      <div className="chat-list-filters">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="filter-select"
        >
          <option>Open</option>
          <option>Closed</option>
          <option>All</option>
        </select>
        <select
          value={sortFilter}
          onChange={(e) => setSortFilter(e.target.value)}
          className="filter-select"
        >
          <option>Newest</option>
          <option>Oldest</option>
          <option>Name</option>
        </select>
      </div>

      <div className="chat-list">
        {filteredChats.map(chat => (
          <div
            key={chat.id}
            className={`chat-item ${selectedChat?.id === chat.id ? 'active' : ''}`}
            onClick={() => onChatSelect(chat)}
          >
            <div className="chat-avatar">
              {chat.initial}
            </div>
            <div className="chat-info">
              <div className="chat-name-row">
                <span className="chat-name">{chat.contactName}</span>
                <span className="chat-time">{chat.time}</span>
              </div>
              <div className="chat-message-preview">
                {chat.lastMessage}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  )
}

export default ChatListPanel

