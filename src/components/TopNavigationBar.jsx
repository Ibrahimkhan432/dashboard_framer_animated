import './TopNavigationBar.css'

function TopNavigationBar() {
  return (
    <div className="top-nav-bar">
      <div className="top-nav-left">
        <span className="boxpad-title">BOXpad</span>
      </div>
      <div className="top-nav-right">
        <div className="user-profile">
          <div className="user-avatar">MJ</div>
          <span className="user-name">Michael Johnson</span>
          <svg className="dropdown-arrow" width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </div>
  )
}

export default TopNavigationBar

