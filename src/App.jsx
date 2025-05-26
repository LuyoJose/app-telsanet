import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './componentes/Sidebar';
import Dashboard from './componentes/Dashboard';
import Message from './componentes/Message';
import Reports from './componentes/Reports';
import Roles from './componentes/Roles';
import Users from './componentes/Users';
import Settings from './componentes/Settings';
import Logout from './componentes/Logout';
import { useState, useEffect } from 'react';
import { sidebarIcons } from './componentes/SidebarIcons';
import { useNavigate } from 'react-router-dom';

const navButtons = [
  { icon: <sidebarIcons.dashboard />, label: "Dashboard", to: "/dashboard" },
  { icon: <sidebarIcons.mensajes />, label: "Mensajes", to: "/mensajes" },
  { icon: <sidebarIcons.reportes />, label: "Reportes", to: "/reportes" },
  { icon: <sidebarIcons.roles />, label: "Roles", to: "/roles" },
  { icon: <sidebarIcons.usuarios />, label: "Usuarios", to: "/usuarios" }
];

const BottomBar = () => {
  const navigate = useNavigate();
  return (
    <div className="bottom-bar" style={{
      position: 'fixed',
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 100,
      background: '#183366',
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      height: '56px'
    }}>
      {navButtons.map(btn => (
        <button
          key={btn.to}
          onClick={() => navigate(btn.to)}
          style={{
            background: 'none',
            border: 'none',
            color: '#fff',
            fontSize: '28px',
            cursor: 'pointer'
          }}
          title={btn.label}
        >
          {btn.icon}
        </button>
      ))}
    </div>
  );
};

const App = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 600);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Router>
      <div style={{ display: 'flex' }}>
        {!isMobile && <Sidebar />}
        <div style={{ flex: 1, position: 'relative', minHeight: '100vh' }}>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/mensajes" element={<Message />} />
            <Route path="/reportes" element={<Reports />} />
            <Route path="/roles" element={<Roles />} />
            <Route path="/usuarios" element={<Users />} />
            <Route path="/configuracion" element={<Settings />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
          {isMobile && <BottomBar />}
        </div>
      </div>
    </Router>
  );
};

export default App;