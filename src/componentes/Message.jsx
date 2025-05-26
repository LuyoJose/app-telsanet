import React, { useState, useEffect, useRef } from 'react';
import Sidebar from './Sidebar';
import { sidebarIcons } from './SidebarIcons';
import EmojiPicker from 'emoji-picker-react';
import { FaFilePdf, FaFileWord, FaFileImage, FaFileAlt, FaFile } from 'react-icons/fa';

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

function getFileIcon(file) {
  if (!file) return <FaFile />;
  const ext = file.name.split('.').pop().toLowerCase();
  if (file.type && file.type.startsWith('image/')) return <FaFileImage color="#4a90e2" size={24} />;
  if (ext === 'pdf') return <FaFilePdf color="#e74c3c" size={24} />;
  if (ext === 'doc' || ext === 'docx') return <FaFileWord color="#2b579a" size={24} />;
  if (ext === 'txt') return <FaFileAlt color="#888" size={24} />;
  return <FaFile color="#888" size={24} />;
}

const Message = () => {
  const [selectedUser, setSelectedUser] = useState(users[0]);
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const [search, setSearch] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mainSidebarOpen, setMainSidebarOpen] = useState(false);
  const messagesEndRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);
  const textareaRef = useRef(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  // Nuevos estados para archivos
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      const maxHeight = parseInt(getComputedStyle(textarea).lineHeight) * 3 + 16;
      textarea.style.height = Math.min(textarea.scrollHeight, maxHeight) + 'px';
    }
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    const handleResize = () => setIsMobile(window.innerWidth <= 600);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [messages, input]);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  // Handler para emoji-picker-react
  const handleEmojiSelect = (emojiData) => {
    setInput(input + emojiData.emoji);
    setShowEmojiPicker(false);
    textareaRef.current.focus();
  };

  // Cierra el picker si se hace clic fuera
  useEffect(() => {
    if (!showEmojiPicker) return;
    const handleClickOutside = (e) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(e.target) &&
        !emojiButtonRef.current.contains(e.target)
      ) {
        setShowEmojiPicker(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showEmojiPicker]);

  const emojiPickerRef = useRef(null);
  const emojiButtonRef = useRef(null);

  // Handler para el botón del clip
  const handleClipClick = () => {
    fileInputRef.current.click();
  };

  // Handler para el input file
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setImagePreview(null);
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (ev) => setImagePreview(ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  // Limpia el archivo seleccionado al enviar mensaje
  const handleSend = (e) => {
    e.preventDefault();
    if (input.trim() === '' && !selectedFile) return;
    setMessages([
      ...messages,
      {
        from: 'Yo',
        text: input,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        file: selectedFile,
        imagePreview: imagePreview
      }
    ]);
    setInput('');
    setSelectedFile(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

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
            <span className="sidebar-search-icon"><sidebarIcons.buscar /></span>
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
                onClick={() => setSidebarOpen(true)}
              >
                <sidebarIcons.menu />
              </button>
            )
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
              {/* Muestra la imagen si existe */}
              {msg.imagePreview && (
                <div style={{ marginTop: 8 }}>
                  <img src={msg.imagePreview} alt="preview" style={{ maxWidth: 150, borderRadius: 8 }} />
                </div>
              )}
              {/* Muestra el nombre del archivo si existe y no es imagen */}
              {msg.file && !msg.imagePreview && (
                <div style={{ marginTop: 8, fontSize: 12, color: '#555', display: 'flex', alignItems: 'center', gap: 6 }}>
                  {getFileIcon(msg.file)}
                  <span>Archivo: {msg.file.name}</span>
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <form
          className="msg-input-form"
          onSubmit={handleSend}
        >
          {/* Previsualización antes de enviar, ahora arriba del input y con botón de eliminar */}
          {selectedFile && (
            <div className="file-preview" style={{ marginBottom: 12 }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  background: '#f5f5f5',
                  borderRadius: 8,
                  padding: '8px 16px',
                  boxShadow: '0 1px 4px #0001',
                  maxWidth: 320,
                  minWidth: 200
                }}
              >
                {imagePreview ? (
                  <img src={imagePreview} alt="preview" style={{ maxWidth: 120, borderRadius: 8 }} />
                ) : (
                  <>
                    {getFileIcon(selectedFile)}
                    <span style={{
                      fontSize: 13,
                      marginLeft: 4,
                      wordBreak: 'break-all',
                      textAlign: 'center',
                      maxWidth: 180,
                      whiteSpace: 'normal'
                    }}>
                      Archivo seleccionado:<br />
                      {selectedFile.name}
                    </span>
                  </>
                )}
                <button
                  type="button"
                  onClick={() => {
                    setSelectedFile(null);
                    setImagePreview(null);
                    if (fileInputRef.current) fileInputRef.current.value = '';
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#c00',
                    fontSize: 18,
                    cursor: 'pointer',
                    marginLeft: 8,
                    lineHeight: 1
                  }}
                  aria-label="Eliminar archivo"
                  title="Eliminar archivo"
                >
                  ✕
                </button>
              </div>
            </div>
          )}
          <div className="msg-input-box">
            <button
              type="button"
              className="msg-input-icon emoji"
              onClick={() => setShowEmojiPicker(v => !v)}
              ref={emojiButtonRef}
            >
              <sidebarIcons.emoji />
            </button>
            {showEmojiPicker && (
              <div
                ref={emojiPickerRef}
                style={{
                  position: 'absolute',
                  bottom: '56px',
                  left: 0,
                  zIndex: 10
                }}
              >
                <EmojiPicker onEmojiClick={handleEmojiSelect} />
              </div>
            )}
            <textarea
              ref={textareaRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Escribe un mensaje..."
              className="msg-input"
              rows={1}
              style={{ resize: 'none', overflowY: 'auto' }}
            />
            {/* Input file oculto */}
            <input
              type="file"
              style={{ display: 'none' }}
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            />
            <button
              type="button"
              className="msg-input-icon clip"
              onClick={handleClipClick}
            >
              <sidebarIcons.clip />
            </button>
          </div>
          <button type="submit" className="msg-btn">
            <span className="msg-btn-icon"><sidebarIcons.enviar /></span>
            <span className="msg-btn-text">Enviar</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Message;