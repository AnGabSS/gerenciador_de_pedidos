import { Router } from "express";
import { OrderController } from "../controllers/orderController.js";
import { OrderRepository } from "../repositories/orderRepository.js";
import { OrderService } from "../services/orderService.js";
import { OrderMapper } from "../utils/mapper.js";

const orderMapper = new OrderMapper();
const orderRepository = new OrderRepository();
const orderService = new OrderService(orderRepository, orderMapper);
const orderController = new OrderController(orderService);

const router = Router();

// --- DOCUMENTAÇÃO E ROTAS ---

router.post('/', 
    /* #swagger.tags = ['Orders']
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

router.get('/list', 
    /* #swagger.tags = ['Orders']
       #swagger.summary = 'Listar todos os pedidos'
       #swagger.responses[200] = { 
           description: 'Lista recuperada',
           schema: { type: 'array', items: { $ref: "#/definitions/Order" } }
       }
    */
    orderController.getAllOrders.bind(orderController)
);

router.get('/:id', 
    /* #swagger.tags = ['Orders']
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

router.put('/:id', 
    /* #swagger.tags = ['Orders']
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

router.delete('/:id', 
    /* #swagger.tags = ['Orders']
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

export default router;