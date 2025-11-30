import { isValidOrderData } from "../utils/validators.js";

export class OrderController {
    constructor(orderService) {
        this.orderService = orderService;
    }

    async createOrder(req, res) {
        try {
            const orderData = req.body;

            // Valida se campos do pedido são válidos, retornando uma lista de erros se houver.
            if(isValidOrderData(orderData).errors.length > 0) {
                return  res.status(400).json({ error: "Informações do pedido são inválidas", details: isValidOrderData(orderData) });
            }
            const orderId = await this.orderService.createOrder(orderData);
            res.status(201).json({ orderId });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Failed to create order" });
        }
    }

    async getOrderById(req, res) {
        try {
            const orderId = req.params.id;
            const order = await this.orderService.getOrderById(orderId);
            if (order) {
                res.status(200).json(order);
            } else {
                res.status(404).json({ error: "Order not found" });
            }
        } catch (error) {
                        console.log(error);

            res.status(500).json({ error: "Failed to retrieve order" });
        }
    }

    async getAllOrders(req, res) {
        try {
            const orders = await this.orderService.getAllOrders();
            res.status(200).json(orders);
        } catch (error) {
            res.status(500).json({ error: "Failed to retrieve orders" });
        }
    }

    async deleteOrder(req, res) {
        try {
            const orderId = req.params.id;
            const deletedCount = await this.orderService.deleteOrder(orderId);
            if (deletedCount > 0) {
                res.status(200).json({ message: "Order deleted successfully" });
            } else {
                res.status(404).json({ error: "Order not found" });
            }
        } catch (error) {
            res.status(500).json({ error: "Failed to delete order" });
        }
    }

    async updateOrder(req, res) {
        try {
            const orderId = req.params.id;
            const updateData = req.body;
            if(isValidOrderData(updateData).length > 0) {
                return  res.status(400).json({ error: "Informações do pedido são inválidas", details: isValidOrderData(updateData) });
            }
            const modifiedCount = await this.orderService.updateOrder(orderId, updateData);
            if (modifiedCount > 0) {
                res.status(200).json({ message: "Order updated successfully" });
            } else {
                res.status(404).json({ error: "Order not found" });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Failed to update order" });
        }
    }
}