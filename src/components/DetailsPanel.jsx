import { useState } from 'react'
import { ChevronDown, ChevronLeft, User, Users, MessageCircle, Check, MapPin, Plus, PanelRight } from 'lucide-react'
import './DetailsPanel.css'

function DetailsPanel({ chat, isOpen, onToggle }) {
  const [chatDataExpanded, setChatDataExpanded] = useState(true)
  const [contactDataExpanded, setContactDataExpanded] = useState(true)
  const [labelsExpanded, setLabelsExpanded] = useState(true)
  const [notesExpanded, setNotesExpanded] = useState(true)
  const [otherChatsExpanded, setOtherChatsExpanded] = useState(true)
  const [noteInput, setNoteInput] = useState('')

  if (!chat) {
    return (
      <>
        <button 
          className={`details-panel-toggle ${!isOpen ? 'collapsed' : ''}`}
          onClick={onToggle}
          title={isOpen ? 'Hide details' : 'Show details'}
        >
          <ChevronLeft size={18} className={isOpen ? '' : 'flipped'} />
        </button>
        <div className={`details-panel empty ${isOpen ? 'open' : 'closed'}`}>
          <div className="empty-state">Select a chat to view details</div>
        </div>
      </>
    )
  }

  const handleAddNote = (e) => {
    e.preventDefault()
    if (noteInput.trim()) {
      console.log('Adding note:', noteInput)
      setNoteInput('')
    }
  }

  return (
    <>
      <div className={`details-panel ${isOpen ? 'open' : 'closed'}`}>
      <div className="details-header">
        <span className="details-title">Details</span>
        <button className="collapse-icon" onClick={onToggle}>
          <PanelRight size={16} />
        </button>
      </div>

      <div className="details-content">
        <div className="details-section">
          <div
            className="section-header"
            onClick={() => setChatDataExpanded(!chatDataExpanded)}
          >
            <span className="section-title">Chat Data</span>
            <ChevronDown 
              className={`expand-icon ${chatDataExpanded ? 'expanded' : ''}`}
              size={14}
            />
          </div>
          {chatDataExpanded && (
            <div className="section-content">
              <div className="detail-item">
                <User className="detail-icon" size={18} />
                <div className="detail-info">
                  <span className="detail-label">Assignee</span>
                  <span className="detail-value">{chat.assignee}</span>
                </div>
              </div>
              <div className="detail-item">
                <Users className="detail-icon" size={18} />
                <div className="detail-info">
                  <span className="detail-label">Team</span>
                  <span className="detail-value">{chat.team}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="details-section">
          <div
            className="section-header"
            onClick={() => setContactDataExpanded(!contactDataExpanded)}
          >
            <span className="section-title">Contact Data</span>
            <ChevronDown 
              className={`expand-icon ${contactDataExpanded ? 'expanded' : ''}`}
              size={14}
            />
          </div>
          {contactDataExpanded && (
            <div className="section-content">
              <div className="detail-item">
                <span className="detail-label">First Name</span>
                <span className="detail-value">{chat.contact.firstName}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Last Name</span>
                <span className="detail-value">{chat.contact.lastName}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Phone number</span>
                <span className="detail-value">{chat.contact.phone}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Email</span>
                <span className="detail-value">{chat.contact.email}</span>
              </div>
              <a href="#" className="see-all-link">See all</a>
            </div>
          )}
        </div>

        <div className="details-section">
          <div
            className="section-header"
            onClick={() => setLabelsExpanded(!labelsExpanded)}
          >
            <span className="section-title">Contact Labels</span>
            <ChevronDown 
              className={`expand-icon ${labelsExpanded ? 'expanded' : ''}`}
              size={14}
            />
          </div>
          {labelsExpanded && (
            <div className="section-content">
              <div className="labels-container">
                {chat.labels && chat.labels.length > 0 ? (
                  chat.labels.map((label, index) => (
                    <div key={index} className="label-tag">
                      {label === 'Closed Won' && <Check className="label-icon" size={12} />}
                      {label === 'Chicago' && <MapPin className="label-icon" size={12} />}
                      <span>{label}</span>
                    </div>
                  ))
                ) : (
                  <span className="no-labels">No labels</span>
                )}
                <button className="add-label-btn"><Plus size={16} /></button>
              </div>
            </div>
          )}
        </div>

        <div className="details-section">
          <div
            className="section-header"
            onClick={() => setNotesExpanded(!notesExpanded)}
          >
            <span className="section-title">Notes</span>
            <ChevronDown 
              className={`expand-icon ${notesExpanded ? 'expanded' : ''}`}
              size={14}
            />
          </div>
          {notesExpanded && (
            <div className="section-content">
              <form onSubmit={handleAddNote} className="note-form">
                <input
                  type="text"
                  placeholder="Add a note"
                  value={noteInput}
                  onChange={(e) => setNoteInput(e.target.value)}
                  className="note-input"
                />
              </form>
              {chat.notes && chat.notes.length > 0 && (
                <div className="notes-list">
                  {chat.notes.map((note, index) => (
                    <div key={index} className="note-item highlighted">
                      {note}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="details-section">
          <div
            className="section-header"
            onClick={() => setOtherChatsExpanded(!otherChatsExpanded)}
          >
            <span className="section-title">Other Chats</span>
            <ChevronDown 
              className={`expand-icon ${otherChatsExpanded ? 'expanded' : ''}`}
              size={14}
            />
          </div>
          {otherChatsExpanded && (
            <div className="section-content">
              <div className="other-chat-item">
                <MessageCircle className="channel-icon" size={20} />
                <div className="other-chat-info">
                  <span className="other-chat-name">Fit4Life</span>
                  <span className="other-chat-message">On my way!</span>
                  <span className="other-chat-date">08/08/25</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  )
}

export default DetailsPanel

