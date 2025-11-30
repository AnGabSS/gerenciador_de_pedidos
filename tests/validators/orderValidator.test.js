import { isValidOrderData } from "../../src/validators/orderValidator.js";

describe('Validação de Dados do Pedido (isValidOrderData)', () => {

    // Objeto base válido para usar nos testes
    const validOrder = {
        orderId: "PEDIDO-123",
        value: 150.50,
        creationDate: "2025-11-29T20:30:00.000Z",
        items: [
            { productId: 10, quantity: 2, price: 50.00 },
            { productId: 11, quantity: 1, price: 50.50 }
        ]
    };

    // --- CAMINHO FELIZ ---
    test('Deve retornar válido quando todos os dados estão corretos', () => {
        const result = isValidOrderData(validOrder);
        expect(result.isValid).toBe(true);
        expect(result.errors).toHaveLength(0);
    });

    // --- VALIDAÇÃO DE CAMPOS DO PEDIDO ---

    test('Deve retornar erro se orderId não for informado ou for vazio', () => {
        const invalidData = { ...validOrder, orderId: "" };
        const result = isValidOrderData(invalidData);
        
        expect(result.isValid).toBe(false);
        expect(result.errors).toContain('orderId é obrigatório e deve ser uma string não vazia');
    });

    test('Deve retornar erro se value não for informado', () => {
        // Remove a propriedade value
        const { value, ...invalidData } = validOrder; 
        const result = isValidOrderData(invalidData);
        
        expect(result.isValid).toBe(false);
        expect(result.errors).toContain('value é obrigatório e deve ser um número válido');
    });

    test('Deve retornar erro se value for negativo', () => {
        const invalidData = { ...validOrder, value: -10.00 };
        const result = isValidOrderData(invalidData);
        
        expect(result.isValid).toBe(false);
        expect(result.errors).toContain('value não pode ser negativo');
    });

    // --- VALIDAÇÃO DE ITENS ---

    test('Deve retornar erro se a lista de items for vazia', () => {
        const invalidData = { ...validOrder, items: [] };
        const result = isValidOrderData(invalidData);
        
        expect(result.isValid).toBe(false);
        expect(result.errors).toContain('items é obrigatório e deve ser um array com pelo menos um item');
    });

    test('Deve retornar erro se items não for um array', () => {
        const invalidData = { ...validOrder, items: "isso não é uma lista" };
        const result = isValidOrderData(invalidData);
        
        expect(result.isValid).toBe(false);
        expect(result.errors).toContain('items é obrigatório e deve ser um array com pelo menos um item');
    });

    // --- VALIDAÇÃO DE DADOS DENTRO DO ITEM ---

    test('Deve detectar erro no productId (não inteiro) dentro de um item', () => {
        const invalidData = {
            ...validOrder,
            items: [
                { productId: "abc", quantity: 1, price: 10 } // Item inválido
            ]
        };
        const result = isValidOrderData(invalidData);
        
        expect(result.isValid).toBe(false);
        // Verifica se a mensagem de erro contém o índice correto
        expect(result.errors[0]).toMatch(/Item na posição 0: productId inválido/);
    });

    test('Deve detectar erro na quantity (zero ou negativa) dentro de um item', () => {
        const invalidData = {
            ...validOrder,
            items: [
                { productId: 1, quantity: 0, price: 10 } // Quantidade 0
            ]
        };
        const result = isValidOrderData(invalidData);
        
        expect(result.isValid).toBe(false);
        expect(result.errors[0]).toMatch(/Item na posição 0: quantity inválida/);
    });

    test('Deve detectar erro no price (negativo) dentro de um item', () => {
        const invalidData = {
            ...validOrder,
            items: [
                { productId: 1, quantity: 1, price: -50.00 } // Preço negativo
            ]
        };
        const result = isValidOrderData(invalidData);
        
        expect(result.isValid).toBe(false);
        expect(result.errors[0]).toMatch(/Item na posição 0: price não pode ser negativo/);
    });

    test('Deve acumular múltiplos erros se houver várias falhas', () => {
        const invalidData = {
            orderId: "",        // Erro 1
            value: -100,        // Erro 2
            items: []           // Erro 3
        };
        const result = isValidOrderData(invalidData);

        expect(result.isValid).toBe(false);
        expect(result.errors.length).toBeGreaterThanOrEqual(3);
    });
});