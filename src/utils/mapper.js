import { ObjectId } from "bson";

export class OrderMapper {
    mapRequestToOrderCreateData(data) {
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

        mapRequestToOrderUpdateData(data) {
        return {
            orderId: data.orderId,
            value: Number(data.value), 
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

export class UserMapper {
    mapRequestToCreateUserData(data) {
        return {
            username: data.username,
            email: data.email,
            password: data.password
        };
    }
    mapRequestToUpdateUserData(data) {
        return {
            username: data.username,
            email: data.email
        };
    }
}