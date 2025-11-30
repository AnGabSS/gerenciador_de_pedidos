import crypto from 'crypto';
import prisma from "../config/prisma.js";

export class OrderRepository {
    async saveOrder(orderData) {
        const createdOrder = await prisma.order.create({
            data: {
                orderId: orderData.orderId,
                value: orderData.value,
                creationDate: orderData.creationDate,
                items: orderData.items.map(item => ({
                        id: crypto.randomBytes(12).toString('hex'),
                        productId: item.productId,
                        quantity: item.quantity,
                        price: item.price
                    }))
            },
            include: {
                items: true
            }
        });
        return createdOrder.id;
    }

    async getOrderById(orderId) {
        return await prisma.order.findUnique({
            where: { id: orderId },
            include: { items: true }
        });
    }

    async getAllOrders() {
        return await prisma.order.findMany({
            include: { items: true }
        });
    }

    async deleteOrder(orderId) {
        const deletedOrder = await prisma.order.delete({
            where: { id: orderId }
        });
        return deletedOrder ? 1 : 0;
    }

    async updateOrder(orderId, updateData) {
        const updatedOrder = await prisma.order.update({
            where: { id: orderId },
            data: updateData
        });
        return updatedOrder ? 1 : 0;
    }
}

