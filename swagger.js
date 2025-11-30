import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'Order Management API',
    description: 'API para gerenciamento de pedidos com MongoDB e Prisma',
    version: '1.0.0'
  },
  host: 'localhost:3000',
  basePath: '/',
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json'],
  
  // Aqui definimos os Modelos de Dados (Schemas)
  definitions: {
    // Modelo do Item (para ser reutilizado)
    Item: {
      productId: 101,
      quantity: 2,
      price: 500.50
    },
    
    // Modelo de Entrada (POST/PUT) - O que o usuário envia
    OrderInput: {
      orderId: "PEDIDO-TESTE-001",
      value: 1500.50,
      creationDate: "2025-11-29T20:30:00.000Z",
      items: [
        { $ref: '#/definitions/Item' }
      ]
    },

    // Modelo de Resposta (GET) - Inclui o ID do banco
    Order: {
      id: "6566e9...",
      orderId: "PEDIDO-TESTE-001",
      value: 1500.50,
      creationDate: "2025-11-29T20:30:00.000Z",
      items: [
        { $ref: '#/definitions/Item' }
      ]
    },

    // Erros Padronizados
    Error400: {
      error: "Informações do pedido são inválidas",
      details: ["Campo X é obrigatório"]
    },
    Error404: {
      error: "Order not found"
    },
    Error500: {
      error: "Internal Server Error"
    }
  }
};

const outputFile = './swagger-output.json';
// Aponte para o arquivo principal onde suas rotas são carregadas (index.js ou app.js)
const routes = ['./src/index.js']; 

/* Gera o arquivo JSON */
swaggerAutogen()(outputFile, routes, doc).then(() => {
    // Opcional: Inicia o servidor apenas após gerar a doc
    import('./src/index.js'); 
});