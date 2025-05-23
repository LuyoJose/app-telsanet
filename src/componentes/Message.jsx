import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar'; // Asegúrate de tener este componente

const users = [
  { id: 1, name: 'Betty Gregory', lastMessage: 'See you soon!', time: '1:25 pm' },
  { id: 2, name: 'Garrett Huff', lastMessage: 'Thanks!', time: '12:10 pm' },
  { id: 3, name: 'Janie Parker', lastMessage: "Let's meet tomorrow.", time: '11:00 am' },
];

const initialMessages = [
  { from: 'Betty Gregory', text: 'Hi! How are you?', time: '1:20 pm' },
  { from: 'Yo', text: 'I am good, thanks!', time: '1:21 pm' },
  { from: 'Betty Gregory', text: 'See you soon!', time: '1:25 pm' },
];

const Message = () => {
  const [selectedUser, setSelectedUser] = useState(users[0]);
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const [search, setSearch] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mainSidebarOpen, setMainSidebarOpen] = useState(false);

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 600);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app-container">
      {/* Sidebar principal SOLO en móvil como drawer */}
      {isMobile && mainSidebarOpen && (
        <Sidebar
          open={mainSidebarOpen}
          onClose={() => setMainSidebarOpen(false)}
          className={`main-sidebar${mainSidebarOpen ? ' main-sidebar-mobile-open' : ''}`}
        />
      )}

      {/* Sidebar de chat SOLO en móvil */}
      {isMobile && (
        <div className={`sidebar${sidebarOpen ? ' sidebar-mobile-open' : ''}`}>
          <button
            className="sidebar-close-btn"
            onClick={() => setSidebarOpen(false)}
          >
            ✕
          </button>
          <div className="sidebar-title">Chats</div>
          <div className="sidebar-search">
            <div className="sidebar-search-box">
              <span className="sidebar-search-icon">🔍</span>
              <input
                type="text"
                placeholder="Buscar"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="sidebar-search-input"
              />
            </div>
          </div>
          <div className="sidebar-users">
            {filteredUsers.map(user => (
              <div
                key={user.id}
                onClick={() => {
                  setSelectedUser(user);
                  setSidebarOpen(false);
                }}
                className={`sidebar-user${selectedUser.id === user.id ? ' selected' : ''}`}
              >
                <span className="sidebar-user-name">{user.name}</span>
                <span className="sidebar-user-last">{user.lastMessage}</span>
                <span className="sidebar-user-time">{user.time}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Chat panel */}
      <div className="chat-panel">
        <div className="chat-header">
          {/* Botón de menú SOLO en móvil */}
          {isMobile && (
            mainSidebarOpen ? (
              <button
                className="main-sidebar-menu-btn"
                onClick={() => setMainSidebarOpen(false)}
              >
                ←
              </button>
            ) : (
              <button
                className="main-sidebar-menu-btn"
                onClick={() => setMainSidebarOpen(true)}
              >
                ☰
              </button>
            )
          )}
          {isMobile && (
            <button
              className="sidebar-menu-btn"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              💬
            </button>
          )}
          {selectedUser.name}
        </div>
        <div className="chat-messages">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`chat-bubble${msg.from === 'Yo' ? ' me' : ''}`}
            >
              {msg.from !== 'Yo' && (
                <div className="chat-bubble-from">{msg.from}</div>
              )}
              <div className="chat-bubble-text">{msg.text}</div>
              <div className="chat-bubble-time">{msg.time}</div>
            </div>
          ))}
        </div>
        <form
          className="msg-input-form"
          onSubmit={e => {
            e.preventDefault();
            if (input.trim() === '') return;
            setMessages([...messages, { from: 'Yo', text: input, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
            setInput('');
          }}
        >
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Escribe un mensaje..."
            className="msg-input"
          />
          <button type="submit" className="msg-btn">
            Enviar
          </button>
        </form>
      </div>

      {/* Barra inferior solo en móvil */}
      {isMobile && (
        <div className="bottom-bar">
          <button onClick={() => setSidebarOpen(true)}>
            <span role="img" aria-label="chats">💬</span>
          </button>
          {/* Puedes agregar más iconos aquí */}
        </div>
      )}
    </div>
  );
};

export default Message;