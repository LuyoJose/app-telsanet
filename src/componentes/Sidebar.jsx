import React, { useState } from 'react';
import SidebarButton from './SidebarButton';
import { sidebarIcons } from './SidebarIcons';
import teslanet from '../assets/teslanet.svg';
import teslanetLogo from '../assets/teslanetLogo.png';

const Sidebar = () => {
  const [expandido, setExpandido] = useState(true);

  const handleToggle = () => {
    setExpandido((prev) => !prev);
  };

  return (
    <div
      style={{
        width: expandido ? '280px' : '60px',
        background: '#183366',
        height: '100vh',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'width 0.3s'
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: expandido ? 'flex-start' : 'center',
        }}
      >
        {/* Encabezado con imagen y botón ocultar solo si expandido */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            padding: expandido ? '32px 16px' : '32px 8px',
            justifyContent: expandido ? 'space-between' : 'center'
          }}
        >
          <img
            src={expandido ? teslanet : teslanetLogo}
            alt="Teslanet"
            style={{
              width: expandido ? '140px' : '32px',
              height: 'auto',
              transition: 'width 0.3s',
              flex: 1
            }}
          />
          {expandido && (
            <SidebarButton
              expandido={expandido}
              icon={<sidebarIcons.panel />}
              label={''}
              onClick={handleToggle}
            />
          )}
        </div>
        {/* Botón panel primero si está colapsado */}
        {!expandido && (
          <SidebarButton
            expandido={expandido}
            icon={<sidebarIcons.panel />}
            label={''}
            onClick={handleToggle}
          />
        )}
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