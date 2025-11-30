export class OrderMapper {
mapRequestToDatabase = (inputData) => {
    return {
        orderId: inputData.numeroPedido.split('-')[0], 
        value: Number(inputData.valorTotal),
        creationDate: new Date(inputData.dataCriacao),
        items: inputData.items.map(item => ({
            productId: parseInt(item.idItem), 
            quantity: item.quantidadeItem,
            price: Number(item.valorItem)
        }))
    };
};
};
