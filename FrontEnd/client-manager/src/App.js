import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ClientTable from './components/ClientTable';
import ClientDashboard from './components/ClientDashboard';

const math = require('mathjs');

function App() {
  const [clientes, setClientes] = useState([]);
  
  const fetchClientes = (nome,filtro) => {
    axios.get(`http://localhost:3333/clientes?nome=${nome}&filtro=${filtro}`)
      .then(response => {
        const data = JSON.parse(response.data, (key, value) =>
          typeof value === 'string' && /^[0-9]+$/.test(value) ? math.bignumber(value).toString() : value
        );
        setClientes(data);
      })
      .catch(error => console.error(error));
  };

  useEffect(() => {
  }, []);

  return (
    <div>
      <ClientDashboard data={clientes} />
      <ClientTable data={clientes} fetchData = {fetchClientes} />
    </div>
  );
}

export default App;
