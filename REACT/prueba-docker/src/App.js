import React, { useState } from 'react';

function App() {
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [productos, setProductos] = useState([]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setMensaje('Procesando...');

    try {
      ///login - redirige al microservicio
      const resp = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario, clave })
      });
      const data = await resp.json();
      if (data.login) {
        setMensaje(`¡Login correcto! ${data.mensaje}`);
      } else {
        setMensaje(`Error de credenciales: ${data.mensaje}`);
      }
    } catch (error) {
      setMensaje(`Error de conexión: ${error}`);
    }
  };

  const verProductos = async () => {
    setMensaje('Cargando productos...');

    try {
      ///productos - microservicio de productos
      const resp = await fetch('/productos');
      const data = await resp.json();
      if (data.productos) {
        setProductos(data.productos);
        setMensaje(`Se obtuvieron ${data.productos.length} productos`);
      } else if (data.error) {
        setMensaje(`Error: ${data.error}`);
      } else {
        setMensaje('No se pudo interpretar la respuesta de productos');
      }
    } catch (error) {
      setMensaje(`Error al cargar productos: ${error}`);
    }
  };

  return (
    <div style={{margin:'2rem'}}>
      <h1>Aplicación React - Ejemplo</h1>

      <form onSubmit={handleLogin}>
        <h2>Login</h2>
        <div>
          <label>Usuario: </label>
          <input
            type="text"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />
        </div>
        <div>
          <label>Clave: </label>
          <input
            type="password"
            value={clave}
            onChange={(e) => setClave(e.target.value)}
          />
        </div>
        <button type="submit">Enviar</button>
      </form>

      <p>{mensaje}</p>

      <hr />

      <button onClick={verProductos}>Ver productos</button>
      {productos.length > 0 && (
        <ul>
          {productos.map((prod) => (
            <li key={prod.cod}>
              {prod.cod} - {prod.nombre_corto} - {prod.PVP}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
