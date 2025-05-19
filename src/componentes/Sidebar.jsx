import SidebarButton from './SidebarButton';

const Sidebar = () => {
  return (
    <div style={{ width: '220px', background: '#183366', height: '100vh', color: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div>
        <div style={{ padding: '32px 16px', fontWeight: 'bold', fontSize: '1.5rem', color: '#ff4d4f' }}>
          teslanet ))
        </div>
        <SidebarButton icon="📊" label="Dashboard" to="/dashboard" />
        <SidebarButton icon="💬" label="Mensajes" to="/mensajes" />
        <SidebarButton icon="📄" label="Reportes" to="/reportes" />
        <SidebarButton icon="🧑‍💼" label="Roles" to="/roles" />
        <SidebarButton icon="👥" label="Usuarios" to="/usuarios" />
      </div>
      <div>
        <SidebarButton icon="⚙️" label="Configuración" to="/configuracion" />
        <SidebarButton icon="🚪" label="Cerrar sesión" to="/logout" />
      </div>
    </div>
  );
};

export default Sidebar;