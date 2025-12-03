import { useState } from 'react'
import TopNavigationBar from './TopNavigationBar'
import MainNavigationBar from './MainNavigationBar'
import LeftSidebar from './LeftSidebar'
import ChatListPanel from './ChatListPanel'
import ChatPanel from './ChatPanel'
import DetailsPanel from './DetailsPanel'
import './Dashboard.css'

// Mock data
const mockChats = [
  {
    id: 1,
    contactName: 'Olivia Mckinsey',
    lastMessage: "Oh my god I'll try it ASAP, thank..",
    time: '23:23',
    initial: 'O',
    messages: [
      {
        id: 1,
        sender: 'user',
        text: "Hi, I recently joined Fit4Life and I'm trying to access my workout plan, but I can't login. Can you help?",
        time: '23:08'
      },
      {
        id: 2,
        sender: 'assistant',
        text: "Hello Olivia 👋 I'm Michael, your AI customer support assistant. Let's fix this quickly. Could you confirm the email address?",
        time: '23:08',
        read: true
      },
      {
        id: 3,
        sender: 'user',
        text: "Yes, it's olivia.Mckinsey@gmail.com",
        time: '23:16'
      },
      {
        id: 4,
        sender: 'assistant',
        text: "Thanks! Looks like your reset wasn't completed. I've sent a new link - please check your inbox.",
        time: '23:16',
        read: true
      },
      {
        id: 5,
        sender: 'user',
        text: "I see it. resetting now...",
        time: '23:17'
      },
      {
        id: 6,
        sender: 'user',
        text: "Done! I'm logged in. Thanks!",
        time: '23:20'
      },
      {
        id: 7,
        sender: 'assistant',
        text: 'Perfect 🎉 Your plan is ready under "My Programs". Since you\'re starting out, I suggest our Premium Guide - it boosts results and is 20% off here 👇 www.Fit4Life.com/Premium',
        time: '23:20',
        read: true
      },
      {
        id: 8,
        sender: 'user',
        text: "Oh my god 😍 I'll try it ASAP, thank you so much!!",
        time: '23:23'
      }
    ],
    contact: {
      firstName: 'Olivia',
      lastName: 'Mckinsey',
      phone: '+1 (312) 555-0134',
      email: 'olivia.Mckinsey@gmail.com'
    },
    assignee: 'James West',
    team: 'Sales Team',
    labels: ['Closed Won', 'Chicago'],
    notes: ['Strong potential for future upgrades']
  },
  {
    id: 2,
    contactName: 'Sara Williams',
    lastMessage: 'Good Evening, Emily! Hope you are..',
    time: '23:16',
    initial: 'S',
    messages: [],
    contact: {
      firstName: 'Sara',
      lastName: 'Williams',
      phone: '+1 (312) 555-0135',
      email: 'sara.williams@gmail.com'
    },
    assignee: 'Michael Johnson',
    team: 'Customer Support',
    labels: [],
    notes: []
  },
  {
    id: 3,
    contactName: 'Frank Thompson',
    lastMessage: 'Thank you for signing up Frank! If t..',
    time: '22:28',
    initial: 'F',
    messages: [],
    contact: {
      firstName: 'Frank',
      lastName: 'Thompson',
      phone: '+1 (312) 555-0136',
      email: 'frank.thompson@gmail.com'
    },
    assignee: 'James West',
    team: 'Sales Team',
    labels: [],
    notes: []
  }
]

const mockInboxes = {
  myInbox: {
    all: 28,
    unassigned: 5
  },
  teams: {
    sales: 7,
    customerSupport: 16
  },
  users: ['Michael Johnson', 'James West', 'Sarah Connor', 'John Doe'],
  channels: ['Fit4Life']
}

function Dashboard() {
  const [selectedChat, setSelectedChat] = useState(mockChats[0])
  const [selectedInbox, setSelectedInbox] = useState('all')
  const [selectedTeam, setSelectedTeam] = useState(null)
  const [selectedUser, setSelectedUser] = useState(null)
  const [selectedChannel, setSelectedChannel] = useState(null)
  const [activeTab, setActiveTab] = useState('Inbox')
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true)
  const [chatListOpen, setChatListOpen] = useState(true)
  const [detailsPanelOpen, setDetailsPanelOpen] = useState(true)

  const handleChatSelect = (chat) => {
    setSelectedChat(chat)
  }

  const handleInboxSelect = (inbox) => {
    setSelectedInbox(inbox)
    setSelectedTeam(null)
    setSelectedUser(null)
    setSelectedChannel(null)
    // Filter chats based on selection
    // In a real app, this would fetch from API
  }

  const handleTeamSelect = (team) => {
    setSelectedTeam(team)
    setSelectedInbox(null)
    setSelectedUser(null)
    setSelectedChannel(null)
  }

  const handleUserSelect = (user) => {
    setSelectedUser(user)
    setSelectedInbox(null)
    setSelectedTeam(null)
    setSelectedChannel(null)
  }

  const handleChannelSelect = (channel) => {
    setSelectedChannel(channel)
    setSelectedInbox(null)
    setSelectedTeam(null)
    setSelectedUser(null)
  }

  // Filter chats based on current selection
  const getFilteredChats = () => {
    let filtered = [...mockChats]
    
    if (selectedTeam === 'Sales') {
      filtered = filtered.filter(chat => chat.team === 'Sales Team')
    } else if (selectedTeam === 'Customer Support') {
      filtered = filtered.filter(chat => chat.team === 'Customer Support')
    }
    
    if (selectedUser) {
      filtered = filtered.filter(chat => chat.assignee === selectedUser)
    }
    
    if (selectedChannel) {
      // Filter by channel if needed
    }
    
    if (selectedInbox === 'unassigned') {
      filtered = filtered.filter(chat => !chat.assignee)
    }
    
    return filtered
  }

  const filteredChats = getFilteredChats()

  return (
    <div className="dashboard">
      <MainNavigationBar activeTab={activeTab} setActiveTab={setActiveTab} />
      {/* <TopNavigationBar /> */}
      
      <div className="dashboard-content">
        <LeftSidebar
          inboxes={mockInboxes}
          selectedInbox={selectedInbox}
          selectedTeam={selectedTeam}
          selectedUser={selectedUser}
          selectedChannel={selectedChannel}
          onInboxSelect={handleInboxSelect}
          onTeamSelect={handleTeamSelect}
          onUserSelect={handleUserSelect}
          onChannelSelect={handleChannelSelect}
          isOpen={leftSidebarOpen}
          onToggle={() => setLeftSidebarOpen(!leftSidebarOpen)}
        />
        <div className="main-content">
          <ChatListPanel
            chats={filteredChats}
            selectedChat={selectedChat}
            onChatSelect={handleChatSelect}
            isOpen={chatListOpen}
            onToggle={() => setChatListOpen(!chatListOpen)}
          />
          <ChatPanel 
            chat={selectedChat}
            onToggleChatList={() => setChatListOpen(!chatListOpen)}
            chatListOpen={chatListOpen}
          />
          <DetailsPanel 
            chat={selectedChat}
            isOpen={detailsPanelOpen}
            onToggle={() => setDetailsPanelOpen(!detailsPanelOpen)}
          />
        </div>
      </div>
    </div>
  )
}

export default Dashboard

