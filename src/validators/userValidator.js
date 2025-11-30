
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