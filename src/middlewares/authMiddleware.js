import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
    // Pega o token do cabeçalho Authorization
    const authHeader = req.headers['authorization'];

    // O token geralmente vem no formato "Bearer <token>", então extraímos apenas a parte do token, descartando o "Bearer "
    const token = authHeader && authHeader.split(' ')[1]; 

    if (!token) {
        return res.status(401).json({ error: "Acesso negado. Token não fornecido." });
    }

    try {
        const secret = process.env.JWT_SECRET;
        
        const user = jwt.verify(token, secret);
        
        req.user = user; 
        
        next();
    } catch (error) {
        return res.status(403).json({ error: "Token inválido ou expirado." });
    }
};