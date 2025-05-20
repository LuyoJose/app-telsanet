import React, { useState, useRef } from 'react';
import SidebarButton from './SidebarButton';
import { sidebarIcons } from './SidebarIcons';

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
    }, 5000); // 5 segundos
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
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: expandido ? 'flex-start' : 'center',
        }}
      >
        <div style={{
          padding: expandido ? '32px 16px' : '32px 8px',
          fontWeight: 'bold',
          fontSize: '1.5rem',
          color: '#ff4d4f',
          textAlign: expandido ? 'left' : 'center'
        }}>
          {expandido ? 'teslanet ))' : '))'}
        </div>
        <SidebarButton expandido={expandido} icon={<sidebarIcons.dashboard />} label={expandido ? "Dashboard" : ""} to="/dashboard" />
        <SidebarButton expandido={expandido} icon={<sidebarIcons.mensajes />} label={expandido ? "Mensajes" : ""} to="/mensajes" />
        <SidebarButton expandido={expandido} icon={<sidebarIcons.reportes />} label={expandido ? "Reportes" : ""} to="/reportes" />
        <SidebarButton expandido={expandido} icon={<sidebarIcons.roles />} label={expandido ? "Roles" : ""} to="/roles" />
        <SidebarButton expandido={expandido} icon={<sidebarIcons.usuarios />} label={expandido ? "Usuarios" : ""} to="/usuarios" />
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: expandido ? 'flex-start' : 'center',
        }}
      >
        <SidebarButton expandido={expandido} icon={<sidebarIcons.configuracion />} label={expandido ? "Configuración" : ""} to="/configuracion" />
        <SidebarButton expandido={expandido} icon={<sidebarIcons.logout />} label={expandido ? "Cerrar sesión" : ""} to="/logout" />
      </div>
    </div>
  );
};

export default Sidebar;