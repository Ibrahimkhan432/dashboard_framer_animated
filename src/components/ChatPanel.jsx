import { useState } from 'react'
import { Edit, MoreVertical, Archive, Image, Video, FileText, Smile, Mic, ChevronLeft } from 'lucide-react'
import './ChatPanel.css'

function ChatPanel({ chat, onToggleChatList, chatListOpen }) {
  const [messageInput, setMessageInput] = useState('')

  if (!chat) {
    return (
      <div className="chat-panel empty">
        <div className="empty-state">Select a chat to view conversation</div>
      </div>
    )
  }

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (messageInput.trim()) {
      // In a real app, this would send the message
      console.log('Sending message:', messageInput)
      setMessageInput('')
    }
  }

  return (
    <div className="chat-panel">
      <div className="chat-panel-header">
        <div className="chat-header-left">
          {!chatListOpen && (
            <button 
              className="header-icon toggle-chat-list"
              onClick={onToggleChatList}
              title="Show chat list"
            >
              <ChevronLeft size={18} className="flipped" />
            </button>
          )}
          <span className="chat-contact-name">{chat.contactName}</span>
          <button className="header-icon"><Edit size={16} /></button>
        </div>
        <div className="chat-header-right">
          <button className="header-icon"><MoreVertical size={18} /></button>
          <button className="header-icon"><Archive size={18} /></button>
        </div>
      </div>

      <div className="chat-messages">
        <div className="date-separator">
          <span>28 August 2025</span>
        </div>
        {chat.messages && chat.messages.length > 0 ? (
          <div className="messages-list">
            {chat.messages.map(message => (
              <div
                key={message.id}
                className={`message ${message.sender === 'user' ? 'user-message' : 'assistant-message'}`}
              >
                <div className="message-content">
                  <p>{message.text}</p>
                  <div className="message-footer">
                    <span className="message-time">{message.time}</span>
                    {message.sender === 'assistant' && message.read && (
                      <span className="read-indicator">✓✓</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-messages">No messages yet</div>
        )}
      </div>

      <div className="chat-input-area">
        <form onSubmit={handleSendMessage} className="message-form">
          <div className="input-actions">
            <button type="button" className="action-icon"><Image size={18} /></button>
            <button type="button" className="action-icon"><Video size={18} /></button>
            <button type="button" className="action-icon"><FileText size={18} /></button>
          </div>
          <input
            type="text"
            placeholder="Type something...."
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            className="message-input"
          />
          <div className="input-actions">
            <button type="button" className="action-icon"><Smile size={18} /></button>
            <button type="button" className="action-icon"><Mic size={18} /></button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ChatPanel

