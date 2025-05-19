import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Elimina el token o la información de sesión
    localStorage.removeItem('token');
    // Aquí puedes limpiar más datos si es necesario

    // Redirige al login
    navigate('/login');
  }, [navigate]);

  return <div>Cerrando sesión...</div>;
};

export default Logout;