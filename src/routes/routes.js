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

router.post('/', orderController.createOrder.bind(orderController));
router.get('/list', orderController.getAllOrders.bind(orderController));
router.get('/:id', orderController.getOrderById.bind(orderController));
router.put('/:id', orderController.updateOrder.bind(orderController));
router.delete('/:id', orderController.deleteOrder.bind(orderController));

export default router;