import './SkeletonComponents.css'

export function SkeletonLeftSidebar() {
  return (
    <div className="skeleton-left-sidebar">
      <div className="skeleton-section">
        <div className="skeleton-title"></div>
        <div className="skeleton-item"></div>
        <div className="skeleton-item"></div>
      </div>
      <div className="skeleton-section">
        <div className="skeleton-title"></div>
        <div className="skeleton-item"></div>
        <div className="skeleton-item"></div>
      </div>
    </div>
  )
}

export function SkeletonChatList() {
  return (
    <div className="skeleton-chat-list">
      <div className="skeleton-header">
        <div className="skeleton-line short"></div>
        <div className="skeleton-line short"></div>
      </div>
      <div className="skeleton-search"></div>
      <div className="skeleton-filters">
        <div className="skeleton-filter"></div>
        <div className="skeleton-filter"></div>
      </div>
      <div className="skeleton-chat-items">
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className="skeleton-chat-item">
            <div className="skeleton-avatar"></div>
            <div className="skeleton-chat-info">
              <div className="skeleton-line"></div>
              <div className="skeleton-line short"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function SkeletonChatPanel() {
  return (
    <div className="skeleton-chat-panel">
      <div className="skeleton-header">
        <div className="skeleton-line medium"></div>
      </div>
      <div className="skeleton-messages">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className={`skeleton-message ${i % 2 === 0 ? 'right' : 'left'}`}>
            <div className="skeleton-message-bubble"></div>
          </div>
        ))}
      </div>
      <div className="skeleton-input"></div>
    </div>
  )
}

export function SkeletonDetailsPanel() {
  return (
    <div className="skeleton-details-panel">
      <div className="skeleton-header">
        <div className="skeleton-line short"></div>
      </div>
      <div className="skeleton-details-content">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="skeleton-detail-section">
            <div className="skeleton-title"></div>
            <div className="skeleton-detail-item"></div>
            <div className="skeleton-detail-item"></div>
          </div>
        ))}
      </div>
    </div>
  )
}

