export class OrderService {
    constructor(orderRepository, mapper) {
        this.orderRepository = orderRepository;
        this.mapper = mapper;
    }

    async createOrder(orderData) {
        const dbOrderData = this.mapper.mapRequestToDatabase(orderData);
        const orderId = await this.orderRepository.saveOrder(dbOrderData);
        return orderId;
    }

    async getOrderById(orderId) {
        const order = await this.orderRepository.getOrderById(orderId);
        return order;
    }

    async getAllOrders() {
        const orders = await this.orderRepository.getAllOrders();
        return orders;
    }

    async deleteOrder(orderId) {
        const deletedCount = await this.orderRepository.deleteOrder(orderId);
        return deletedCount;
    }

    async updateOrder(orderId, updateData) {
        const modifiedCount = await this.orderRepository.updateOrder(orderId, updateData);
        return modifiedCount;
    }
}

