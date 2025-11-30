import { ObjectId } from "bson";

export class OrderMapper {
    mapRequestToDatabase(data) {
        return {
            orderId: data.orderId,
            value: Number(data.value), 
            creationDate: new Date(data.creationDate), 
            items: data.items.map(item => {
                return {
                    id: item.id ? item.id : new ObjectId().toString(),
                    productId: Number(item.productId),
                    quantity: Number(item.quantity),
                    price: Number(item.price)
                };
            })
        };
    }
}