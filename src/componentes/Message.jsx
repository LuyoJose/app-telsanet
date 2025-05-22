import React, { useState } from 'react';

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

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      background: '#f5f6fa',
      margin: 0,
      padding: 0,
      boxSizing: 'border-box'
    }}>
      {/* Panel de chats */}
      <div style={{
        width: 320,
        background: 'linear-gradient(180deg, #2952a3 0%, #3a5db7 100%)',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        margin: 0,
        padding: 0,
        borderRight: '1px solid #e5e5e5'
      }}>
        <div style={{
          color: '#fff',
          fontSize: 32,
          fontWeight: 500,
          margin: 0,
          padding: '24px 0 16px 24px'
        }}>
          Chats
        </div>
        {/* Buscador con icono y borde redondeado */}
        <div style={{
          padding: '0 16px 18px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            background: '#7fa6e6',
            borderRadius: 24,
            padding: '0 12px',
            height: 40,
            boxSizing: 'border-box'
          }}>
            <span style={{
              color: '#fff',
              fontSize: 20,
              marginRight: 8,
              opacity: 0.8
            }}>🔍</span>
            <input
              type="text"
              placeholder="Buscar"
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                flex: 1,
                border: 'none',
                outline: 'none',
                background: 'transparent',
                color: '#fff',
                fontSize: 17,
                padding: '8px 0',
                borderRadius: 24
              }}
            />
          </div>
        </div>
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: 0,
          margin: 0
        }}>
          {filteredUsers.map(user => (
            <div
              key={user.id}
              onClick={() => setSelectedUser(user)}
              style={{
                padding: '16px 32px',
                background: selectedUser.id === user.id ? '#fff' : 'transparent',
                color: selectedUser.id === user.id ? '#183366' : '#fff',
                cursor: 'pointer',
                borderRadius: 24,
                margin: '0 16px 8px 16px',
                fontWeight: selectedUser.id === user.id ? 'bold' : 'normal',
                display: 'flex',
                flexDirection: 'column',
                transition: 'background 0.2s, color 0.2s'
              }}
            >
              <span style={{ fontSize: 17 }}>{user.name}</span>
              <span style={{ fontSize: 13, opacity: 0.7 }}>{user.lastMessage}</span>
              <span style={{ fontSize: 11, opacity: 0.5, alignSelf: 'flex-end' }}>{user.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Panel de conversación */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        background: '#fff',
        minHeight: '100vh',
        margin: 0,
        padding: 0
      }}>
        {/* Header de conversación */}
        <div style={{
          height: 56,
          background: '#e5e5e5',
          borderBottom: '1px solid #ddd',
          display: 'flex',
          alignItems: 'center',
          padding: '15px 20px',
          fontWeight: 'bold',
          fontSize: 20,
          margin: 0
        }}>
          {selectedUser.name}
        </div>
        {/* Mensajes */}
        <div style={{
          flex: 1,
          padding: '20px 20px', // Más separación de los bordes
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
          margin: 0
        }}>
          {messages.map((msg, idx) => (
            <div
              key={idx}
              style={{
                alignSelf: msg.from === 'Yo' ? 'flex-end' : 'flex-start',
                background: msg.from === 'Yo' ? '#e6f7ff' : '#f0f0f0',
                color: '#222',
                padding: '10px 20px',
                borderRadius: 16,
                maxWidth: '60%',
                marginBottom: 12,
                marginTop: 8,
              }}
            >
              {/* Mostrar el nombre solo si no es "Yo" */}
              {msg.from !== 'Yo' && (
                <div style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: '#2952a3',
                  marginBottom: 2,
                  marginLeft: 2
                }}>
                  {msg.from}
                </div>
              )}
              <div style={{ fontSize: 13 }}>{msg.text}</div>
              <div style={{ fontSize: 10, color: '#888', textAlign: 'right' }}>{msg.time}</div>
            </div>
          ))}
        </div>
        {/* Input de mensaje */}
        <form onSubmit={e => {
          e.preventDefault();
          if (input.trim() === '') return;
          setMessages([...messages, { from: 'Yo', text: input, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
          setInput('');
        }} style={{
          display: 'flex',
          borderTop: '1px solid #eee',
          padding: 0,
          background: '#fafbfc',
          margin: 0,
          width: '100%',
          minHeight: 56,
          alignItems: 'center'
        }}>
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Escribe un mensaje..."
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              padding: 16,
              borderRadius: 20,
              background: '#f0f2f5',
              marginRight: 8,
              fontSize: 15
            }}
          />
          <button type="submit" style={{
            background: '#183366',
            color: '#fff',
            border: 'none',
            borderRadius: 20,
            padding: '8px 24px',
            cursor: 'pointer',
            fontSize: 15
          }}>
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Message;