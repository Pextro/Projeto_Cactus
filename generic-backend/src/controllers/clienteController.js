const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getClientes = async (req, res) => {
  const { nome, filtro } = req.query;
  let clientes;
  if ('Nome Cliente'===filtro.toString()) {
    clientes = await prisma.clientes.findMany({
      where: {
        nomeCliente: {
          contains: nome,
          mode: 'insensitive'
        },
      },
    });
  }
  else if ('Cidade' === filtro.toString()) {
     clientes = await prisma.clientes.findMany({
      where: {
        cidadeCliente: {
          contains: nome,
          mode: 'insensitive'
        },
      },
    });
  }
  else if ('Plano Contrato' === filtro.toString()) {
     clientes = await prisma.clientes.findMany({
      where: {
        planoContrato: {
          contains: nome,
          mode: 'insensitive'
        },
      },
    });
  }
  else if ('Nome Concentrador' === filtro.toString()) {
    clientes = await prisma.clientes.findMany({
      where: {
        nomeConcentrador: {
          contains: nome,
          mode: 'insensitive'
        },
      },
    });
  }
  clientes = JSON.stringify(clientes, (key, value) =>
    typeof value === "bigint" ? value.toString() : value
  );

  res.json(clientes);
};

module.exports = {
  getClientes,
};