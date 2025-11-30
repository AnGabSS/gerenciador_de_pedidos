import { Router } from "express";
import { OrderController } from "../controllers/orderController.js";
import { UserController } from "../controllers/userController.js";
import { authenticateToken } from '../middlewares/authMiddleware.js';
import { OrderRepository } from "../repositories/orderRepository.js";
import { UserRepository } from "../repositories/userRepository.js";
import { OrderService } from "../services/orderService.js";
import { UserService } from "../services/userService.js";
import { OrderMapper, UserMapper } from "../utils/mapper.js";

const orderMapper = new OrderMapper();
const orderRepository = new OrderRepository();
const orderService = new OrderService(orderRepository, orderMapper);
const orderController = new OrderController(orderService);

const userMapper = new UserMapper();
const userRepository = new UserRepository();
const userService = new UserService(userRepository, userMapper); 
const userController = new UserController(userService);

const router = Router();

router.post('/order', authenticateToken,
    /* #swagger.tags = ['Orders']
       #swagger.security = [{ "Bearer": [] }]
       #swagger.summary = 'Criar novo pedido'
       #swagger.description = 'Valida os dados e cria um pedido no MongoDB via Prisma.'
       #swagger.parameters['body'] = {
           in: 'body',
           description: 'Dados do pedido',
           required: true,
           schema: { $ref: "#/definitions/OrderInput" }
       }
       #swagger.responses[201] = { 
           description: 'Pedido criado',
           schema: { $ref: "#/definitions/Order" }
       }
       #swagger.responses[400] = { 
           description: 'Erro de validação',
           schema: { $ref: "#/definitions/Error400" } 
       }
    */
    orderController.createOrder.bind(orderController)
);

router.get('/order/list', authenticateToken,
    /* #swagger.tags = ['Orders']
       #swagger.security = [{ "Bearer": [] }]
       #swagger.summary = 'Listar todos os pedidos'
       #swagger.responses[200] = { 
           description: 'Lista recuperada',
           schema: { type: 'array', items: { $ref: "#/definitions/Order" } }
       }
    */
    orderController.getAllOrders.bind(orderController)
);

router.get('/order/:id', authenticateToken,
    /* #swagger.tags = ['Orders']
       #swagger.security = [{ "Bearer": [] }]
       #swagger.security = [{ "Bearer": [] }]
       #swagger.summary = 'Buscar pedido por ID'
       #swagger.parameters['id'] = { description: 'ID do MongoDB' }
       #swagger.responses[200] = { 
           description: 'Pedido encontrado',
           schema: { $ref: "#/definitions/Order" }
       }
       #swagger.responses[404] = { 
           description: 'Pedido não encontrado',
           schema: { $ref: "#/definitions/Error404" }
       }
    */
    orderController.getOrderById.bind(orderController)
);

router.put('/order/:id', authenticateToken,
    /* #swagger.tags = ['Orders']
       #swagger.security = [{ "Bearer": [] }]
       #swagger.summary = 'Atualizar pedido'
       #swagger.parameters['id'] = { description: 'ID do MongoDB' }
       #swagger.parameters['body'] = {
           in: 'body',
           description: 'Dados atualizados',
           required: true,
           schema: { $ref: "#/definitions/OrderInput" }
       }
       #swagger.responses[200] = { 
           description: 'Pedido atualizado',
           schema: { message: 'Order updated successfully' }
       }
       #swagger.responses[400] = { schema: { $ref: "#/definitions/Error400" } }
       #swagger.responses[404] = { schema: { $ref: "#/definitions/Error404" } }
    */
    orderController.updateOrder.bind(orderController)
);

router.delete('/order/:id', authenticateToken,
    /* #swagger.tags = ['Orders']
       #swagger.security = [{ "Bearer": [] }]
       #swagger.summary = 'Deletar pedido'
       #swagger.parameters['id'] = { description: 'ID do MongoDB' }
       #swagger.responses[200] = { 
           description: 'Pedido deletado',
           schema: { message: 'Order deleted successfully' }
       }
       #swagger.responses[404] = { schema: { $ref: "#/definitions/Error404" } }
    */
    orderController.deleteOrder.bind(orderController)
);

router.post('/login', 
    /* #swagger.tags = ['Users']
       #swagger.summary = 'Login de usuário'
       #swagger.description = 'Autentica um usuário e retorna um token JWT.'
       #swagger.parameters['body'] = {
           in: 'body',
           description: 'Credenciais do usuário',
           required: true,
           schema: {
               username: "usuario_teste",
               password: "senha_segura"
           }
       }
       #swagger.responses[200] = { 
           description: 'Login bem-sucedido',
           schema: {
               token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
           }
       }
       #swagger.responses[400] = { 
           description: 'Erro de validação',
           schema: { $ref: "#/definitions/Error400" } 
       }
       #swagger.responses[401] = { 
           description: 'Não autorizado',
              schema: { error: "Email ou senha incorretos" }
         } 
    */
    userController.login.bind(userController)
);

router.post('/users', 
    /* #swagger.tags = ['Users']
       #swagger.summary = 'Criar novo usuário'
       #swagger.description = 'Cria um novo usuário no sistema.'
       #swagger.parameters['body'] = {
           in: 'body',
           description: 'Dados do usuário',
           required: true,
           schema: {
               username: "novo_usuario",
               email: "novo@usuario.com",
               password: "senha_segura"
           }
       }
       #swagger.responses[201] = { 
           description: 'Usuário criado',
           schema: { message: 'User created successfully' }
       }
       #swagger.responses[400] = { 
           description: 'Erro de validação',
           schema: { $ref: "#/definitions/Error400" } 
       }
    */
    userController.createUser.bind(userController)
);

router.get('/users', authenticateToken,
    /* #swagger.tags = ['Users']
       #swagger.security = [{ "Bearer": [] }]
       #swagger.summary = 'Listar todos os usuários'
       #swagger.responses[200] = { 
           description: 'Lista recuperada',
           schema: { type: 'array', items: { 
               id: "6566e9...",
               username: "usuario_teste",
               email: "novo@usuario.com",
              } }
         }
    */
    userController.getAllUsers.bind(userController)
);

router.get('/users/:id', authenticateToken,
    /* #swagger.tags = ['Users']
       #swagger.summary = 'Buscar usuário por ID'
       #swagger.parameters['id'] = { description: 'ID do usuário' }
       #swagger.responses[200] = { 
           description: 'Usuário encontrado',
           schema: { 
               id: "6566e9...",
               username: "usuario_teste",
               email: "novo@usuario.com",
              }
         }
       #swagger.responses[404] = { schema: { error: "User not found" } }
    */
    userController.getUserById.bind(userController)
);  

router.delete('/users/:id', authenticateToken,
    /* #swagger.tags = ['Users']
       #swagger.summary = 'Deletar usuário'
       #swagger.parameters['id'] = { description: 'ID do usuário' }
       #swagger.responses[200] = { 
           description: 'Usuário deletado',
           schema: { message: 'User deleted successfully' }
       }
       #swagger.responses[404] = { schema: { error: "User not found" } }
    */
    userController.deleteUser.bind(userController)
);

router.put('/users/:id', authenticateToken,
    /* #swagger.tags = ['Users']
       #swagger.summary = 'Atualizar usuário'
       #swagger.parameters['id'] = { description: 'ID do usuário' }
       #swagger.parameters['body'] = {
           in: 'body',
           description: 'Dados atualizados',
           required: true,
           schema: {
               username: "usuario_atualizado",
               email: "novo@usuario.com"
           }
       }
       #swagger.responses[200] = { 
           description: 'Usuário atualizado',
           schema: { message: 'User updated successfully' }
       }
       #swagger.responses[400] = { schema: { $ref: "#/definitions/Error400" } }
       #swagger.responses[404] = { schema: { error: "User not found" } }
    */
    userController.updateUser.bind(userController)
);


export default router;