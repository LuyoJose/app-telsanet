import React, { useState, useRef } from 'react';
import SidebarButton from './SidebarButton';

const Sidebar = () => {
  const [expandido, setExpandido] = useState(true);
  const timerRef = useRef(null);

  const handleMouseEnter = () => {
    setExpandido(true);
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  const handleMouseLeave = () => {
    timerRef.current = setTimeout(() => {
      setExpandido(false);
    }, 5000); // 20 segundos
  };

  // Solo muestra el label si está expandido
  return (
    <div
      style={{
        width: expandido ? '220px' : '60px',
        background: '#183366',
        height: '100vh',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'width 0.3s'
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div>
        <div style={{
          padding: expandido ? '32px 16px' : '32px 8px',
          fontWeight: 'bold',
          fontSize: '1.5rem',
          color: '#ff4d4f',
          textAlign: expandido ? 'left' : 'center'
        }}>
          {expandido ? 'teslanet ))' : '))'}
        </div>
        <SidebarButton icon="📊" label={expandido ? "Dashboard" : ""} to="/dashboard" />
        <SidebarButton icon="💬" label={expandido ? "Mensajes" : ""} to="/mensajes" />
        <SidebarButton icon="📄" label={expandido ? "Reportes" : ""} to="/reportes" />
        <SidebarButton icon="🧑‍💼" label={expandido ? "Roles" : ""} to="/roles" />
        <SidebarButton icon="👥" label={expandido ? "Usuarios" : ""} to="/usuarios" />
      </div>
      <div>
        <SidebarButton icon="⚙️" label={expandido ? "Configuración" : ""} to="/configuracion" />
        <SidebarButton icon="🚪" label={expandido ? "Cerrar sesión" : ""} to="/logout" />
      </div>
    </div>
  );
};

export default Sidebar;