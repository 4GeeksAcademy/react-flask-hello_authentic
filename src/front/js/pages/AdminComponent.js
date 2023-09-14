import React, { useState } from 'react';

function AdminComponent() {
  const [data, setData] = useState({});
  const [token, setToken] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setData(prevState => ({ ...prevState, [name]: value }));
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      // Asumiendo que tienes una API endpoint para manejar la lógica de envío
      const response = await fetch('https://tuapi.com/endpoint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();
      console.log('Result: ', result);
    } catch (error) {
      console.error('Error en el envío: ', error);
    }
  }

  const handleLogout = () => {
    setToken(null);
    
  }

  return (
    <div className="admin-component">
      <h1>Panel de Administrador</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Nombre:
            <input type="text" name="name" onChange={handleInputChange} />
          </label>
        </div>
        <div>
          <label>
            Email:
            <input type="email" name="email" onChange={handleInputChange} />
          </label>
        </div>
        <button type="submit">Enviar</button>
      </form>
      {token && <button onClick={handleLogout}>Cerrar sesión</button>}
    </div>
  );
}

export default AdminComponent;
