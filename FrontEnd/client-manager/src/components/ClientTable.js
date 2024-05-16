import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField } from '@mui/material';


const ClientTable = ({ data,fetchData }) => {
  const [search, setSearch] = useState('');

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleClick = (event) => {
    const filtro = document.getElementById('Filtro');
    const textField = document.getElementById('buscarTexto');
    fetchData(textField.value,filtro.value);
  };

  const [filtroSelecionado,setFiltroSelecionado]= useState("Nome cliente");
  
  const handleFilterChange = (event) => {
    setFiltroSelecionado(event.target.value);
  };
  


  const filteredData = data.filter(client => {
    switch (filtroSelecionado) {
      case "Nome Cliente":
        return client.nomeCliente.toLowerCase().includes(search.toLowerCase());
      case "Cidade":
        return client.cidadeCliente.toLowerCase().includes(search.toLowerCase());
      case "Plano Contrato":
        return client.planoContrato.toLowerCase().includes(search.toLowerCase());
      case "Nome Concentrador":
        return client.nomeConcentrador.toLowerCase().includes(search.toLowerCase());
      default:
        return true; 
    }
  });
  

  return (
    <div>
      <TextField 
        id="buscarTexto"
        label="Search" 
        variant="outlined" 
        value={search} 
        onChange={handleSearchChange} 
        style={{ marginBottom: '20px' }}
      />
      <button onClick={handleClick}>Buscar</button>
      <select  id="Filtro" value={filtroSelecionado} onChange={handleFilterChange}>
        <option value = "Nome Cliente">Nome Cliente</option>
        <option value = "Cidade">Cidade</option>
        <option value = "Plano Contrato">Plano Contrato</option>
        <option value = "Nome Concentrador">Nome Concentrador</option>
      </select>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Cliente</TableCell>
              <TableCell>Nome Concentrador</TableCell>
              <TableCell>Cidade</TableCell>
              <TableCell>Status Cliente</TableCell>
              <TableCell>Plano Contrato</TableCell>
              <TableCell>Consumo Download (Bytes)</TableCell>
              <TableCell>Consumo Upload (Bytes)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((client) => (
              <TableRow key={client.id}>
                <TableCell>{client.nomeCliente}</TableCell>
                <TableCell>{client.nomeConcentrador}</TableCell>
                <TableCell>{client.cidadeCliente}</TableCell>
                <TableCell>{client.statusCliente ? 'Online' : 'Offline'}</TableCell>
                <TableCell>{client.planoContrato}</TableCell>
                <TableCell>{client.consumoDownload.toString()}</TableCell>
                <TableCell>{client.consumoUpload.toString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ClientTable;
