import React from 'react';
import { Paper, Grid, Typography } from '@mui/material';
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from 'recharts';


const ClientDashboard = ({ data }) => {
      if (!Array.isArray(data)) {
        console.error("data não é um array");
        return null;
  }
  const onlineCount = data.filter(client => client.statusCliente).length;
  const offlineCount = data.length - onlineCount;

  const cityData = data.reduce((acc, client) => {
    const city = client.cidadeCliente;
    if (!acc[city]) {
      acc[city] = 0;
    }
    acc[city]++;
    return acc;
  }, {});

  const cityDataArray = Object.keys(cityData).map(city => ({
    name: city,
    value: cityData[city]
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <Paper style={{ padding: '20px' }}>
          <Typography variant="h6">Contagem de Clientes Online/Offline</Typography>
          <Typography variant="body1">Online: {onlineCount}</Typography>
          <Typography variant="body1">Offline: {offlineCount}</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Paper style={{ padding: '20px' }}>
          <Typography variant="h6">Clientes por Cidade</Typography>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie 
                data={cityDataArray} 
                dataKey="value" 
                nameKey="name" 
                cx="50%" 
                cy="50%" 
                outerRadius={100} 
                fill="#8884d8"
                label
              >
                {cityDataArray.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ClientDashboard;