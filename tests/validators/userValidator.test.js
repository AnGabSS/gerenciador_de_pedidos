import { isValidUserCreationData, isValidUserUpdateData } from '../../src/validators/userValidator.js';

describe('Validação de Criação de Usuário (isValidUserCreationData)', () => {

    const validUser = {
        username: "usuario_teste",
        email: "teste@exemplo.com",
        password: "senha123"
    };

    test('Deve retornar válido quando todos os dados estão corretos', () => {
        const result = isValidUserCreationData(validUser);
        expect(result.isValid).toBe(true);
        expect(result.errors).toHaveLength(0);
    });

    test('Deve retornar erro se username for vazio', () => {
        const invalidData = { ...validUser, username: "" };
        const result = isValidUserCreationData(invalidData);
        expect(result.isValid).toBe(false);
        expect(result.errors).toContain('username é obrigatório e deve ser uma string não vazia');
    });

    test('Deve retornar erro se username não for informado', () => {
        const { username, ...invalidData } = validUser;
        const result = isValidUserCreationData(invalidData);
        expect(result.isValid).toBe(false);
        expect(result.errors).toContain('username é obrigatório e deve ser uma string não vazia');
    });

    test('Deve retornar erro se email for inválido (formato incorreto)', () => {
        const invalidData = { ...validUser, email: "email-sem-arroba.com" };
        const result = isValidUserCreationData(invalidData);
        expect(result.isValid).toBe(false);
        expect(result.errors).toContain('email é obrigatório e deve ser um email válido');
    });

    test('Deve retornar erro se email for vazio', () => {
        const invalidData = { ...validUser, email: "" };
        const result = isValidUserCreationData(invalidData);
        expect(result.isValid).toBe(false);
    });

    test('Deve retornar erro se password for menor que 6 caracteres', () => {
        const invalidData = { ...validUser, password: "123" };
        const result = isValidUserCreationData(invalidData);
        expect(result.isValid).toBe(false);
        expect(result.errors).toContain('password é obrigatório e deve ter pelo menos 6 caracteres');
    });

    test('Deve retornar erro se password não for informado', () => {
        const { password, ...invalidData } = validUser;
        const result = isValidUserCreationData(invalidData);
        expect(result.isValid).toBe(false);
        expect(result.errors).toContain('password é obrigatório e deve ter pelo menos 6 caracteres');
    });
});

describe('Validação de Atualização de Usuário (isValidUserUpdateData)', () => {

    test('Deve retornar válido ao atualizar apenas o username', () => {
        const result = isValidUserUpdateData({ username: "NovoNome" });
        expect(result.isValid).toBe(true);
        expect(result.errors).toHaveLength(0);
    });

    test('Deve retornar válido ao atualizar apenas o email', () => {
        const result = isValidUserUpdateData({ email: "novo@email.com" });
        expect(result.isValid).toBe(true);
        expect(result.errors).toHaveLength(0);
    });

    test('Deve retornar válido ao atualizar username e email juntos', () => {
        const result = isValidUserUpdateData({ username: "NovoNome", email: "novo@email.com" });
        expect(result.isValid).toBe(true);
    });

    test('Deve retornar válido se o objeto for vazio (nenhuma atualização)', () => {
        const result = isValidUserUpdateData({});
        expect(result.isValid).toBe(true);
    });

    test('Deve retornar erro se tentar atualizar username para vazio', () => {
        const result = isValidUserUpdateData({ username: "" });
        expect(result.isValid).toBe(false);
        expect(result.errors).toContain('username deve ser uma string não vazia');
    });

    test('Deve retornar erro se tentar atualizar email para formato inválido', () => {
        const result = isValidUserUpdateData({ email: "emailRuim" });
        expect(result.isValid).toBe(false);
        expect(result.errors).toContain('email deve ser um email válido');
    });

    test('Deve validar múltiplos erros na atualização', () => {
        const result = isValidUserUpdateData({ username: "", email: "emailRuim" });
        expect(result.isValid).toBe(false);
        expect(result.errors).toHaveLength(2);
        expect(result.errors).toContain('username deve ser uma string não vazia');
        expect(result.errors).toContain('email deve ser um email válido');
    });
});