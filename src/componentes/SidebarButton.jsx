import { Link, useLocation } from 'react-router-dom';

const SidebarButton = ({ icon, label, to }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link to={to} style={{ textDecoration: 'none' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '12px 20px',
          background: isActive ? '#fff' : 'transparent',
          color: isActive ? '#183366' : '#fff',
          borderRadius: '24px',
          margin: '8px 12px',
          fontWeight: isActive ? 'bold' : 'normal',
          cursor: 'pointer',
          transition: 'background 0.2s, color 0.2s'
        }}
      >
        <span style={{ marginRight: '12px', fontSize: '1.2rem' }}>{icon}</span>
        {label}
      </div>
    </Link>
  );
};

export default SidebarButton;