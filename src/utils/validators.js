export const isValidOrderData = (data) => {
    const errors = [];

    // Valida o número do pedido que deve ser uma string não vazia
    if (!data.orderId || typeof data.orderId !== 'string' || data.orderId.trim() === '') {
        errors.push('orderId é obrigatório e deve ser uma string não vazia');
    }

    // Valida o valor do pedido, se é um número válido e não negativo
    if (data.value === undefined || data.value === null || data.value === '' || isNaN(Number(data.value))) {
        errors.push('value é obrigatório e deve ser um número válido');
    } else if (Number(data.value) < 0) {
        errors.push('value não pode ser negativo');
    }

    // Valida a lista de itens
    if (!Array.isArray(data.items) || data.items.length === 0) {
        errors.push('items é obrigatório e deve ser um array com pelo menos um item');
    } else {
        data.items.forEach((item, index) => {
            
            // Valida productId (Int)
            const pId = Number(item.productId);
            if (item.productId === undefined || isNaN(pId) || !Number.isInteger(pId)) {
                errors.push(`Item na posição ${index}: productId inválido (deve ser um número inteiro)`);
            }

            // Valida quantity (Int)
            const qtd = Number(item.quantity);
            if (item.quantity === undefined || isNaN(qtd) || !Number.isInteger(qtd) || qtd <= 0) {
                errors.push(`Item na posição ${index}: quantity inválida (deve ser um inteiro maior que 0)`);
            }

            // Valida price (Float)
            if (item.price === undefined || item.price === null || item.price === '' || isNaN(Number(item.price))) {
                errors.push(`Item na posição ${index}: price inválido (deve ser um número)`);
            } else if (Number(item.price) < 0) {
                errors.push(`Item na posição ${index}: price não pode ser negativo`);
            }
            
        });
    }

    return {
        isValid: errors.length === 0,
        errors
    };
}


export const isValidUserCreationData = (data) => {
    const errors = [];

    // Valida o nome de usuário
    if (!data.username || typeof data.username !== 'string' || data.username.trim() === '') {
        errors.push('username é obrigatório e deve ser uma string não vazia');
    }

    // Valida o email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || typeof data.email !== 'string' || !emailRegex.test(data.email)) {
        errors.push('email é obrigatório e deve ser um email válido');
    }

    // Valida a senha
    if (!data.password || typeof data.password !== 'string' || data.password.length < 6) {
        errors.push('password é obrigatório e deve ter pelo menos 6 caracteres');
    }

    return {
        isValid: errors.length === 0,
        errors
    };
}

export const isValidUserUpdateData = (data) => {
    const errors = [];

    // Valida o nome de usuário, se fornecido
    if (data.username !== undefined) {
        if (typeof data.username !== 'string' || data.username.trim() === '') {
            errors.push('username deve ser uma string não vazia');
        }
    }

    // Valida o email, se fornecido
    if (data.email !== undefined) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (typeof data.email !== 'string' || !emailRegex.test(data.email)) {
            errors.push('email deve ser um email válido');
        }
    }

    return {
        isValid: errors.length === 0,
        errors
    };
}