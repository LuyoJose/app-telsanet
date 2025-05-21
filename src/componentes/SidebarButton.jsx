import { Link, useLocation } from 'react-router-dom';

const SidebarButton = ({ icon, label, to, onClick, expandido }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  // Si no hay 'to', renderiza un botón normal (para el botón de retraer/expandir)
  if (!to) {
    return (
      <button
        onClick={onClick}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: expandido ? 'flex-start' : 'center',
          padding: expandido ? '12px 20px' : '12px 0',
          background: 'transparent',
          color: '#fff',
          border: 'none',
          borderRadius: '24px',
          margin: '8px 12px',
          fontWeight: 'normal',
          cursor: 'pointer',
          transition: 'background 0.2s, color 0.2s, padding 0.3s'
        }}
      >
        <span
          style={{
            marginRight: label ? '12px' : '0',
            fontSize: '1.2rem'
          }}
        >
          {icon}
        </span>
        {label}
      </button>
    );
  }

  // Si hay 'to', renderiza como Link
  return (
    <Link to={to} style={{ textDecoration: 'none' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: expandido ? 'flex-start' : 'center',
          padding: expandido ? '12px 20px' : '12px 0',
          background: isActive ? '#fff' : 'transparent',
          color: isActive ? '#183366' : '#fff',
          borderRadius: '24px',
          margin: '8px 12px',
          fontWeight: isActive ? 'bold' : 'normal',
          cursor: 'pointer',
          transition: 'background 0.2s, color 0.2s, padding 0.3s'
        }}
      >
        <span
          style={{
            marginRight: label ? '12px' : '0',
            fontSize: '1.2rem'
          }}
        >
          {icon}
        </span>
        {label}
      </div>
    </Link>
  );
};

export default SidebarButton;