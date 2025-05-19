import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './componentes/Sidebar';
import Dashboard from './componentes/Dashboard';
import Message from './componentes/Message';
import Reports from './componentes/Reports';
import Roles from './componentes/Roles';
import Users from './componentes/Users';
import Settings from './componentes/Settings';
import Logout from './componentes/Logout';

const App = () => {
  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div style={{ flex: 1, padding: '32px' }}>
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
        </div>
      </div>
    </Router>
  );
};

export default App;