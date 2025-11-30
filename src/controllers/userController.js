import { isValidUserCreationData, isValidUserUpdateData } from "../utils/validators.js";

export class UserController {
    constructor(userService, mapper) {
        this.userService = userService;
    }

    async createUser(req, res) {
        try {
            const userData = req.body;
            if(isValidUserCreationData(userData).errors.length > 0) {
                return  res.status(400).json({ error: "Informações do usuário são inválidas", details: isValidUserCreationData(userData) });
            }
            const userId = await this.userService.createUser(userData);
            res.status(201).json({ userId });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Failed to create user" });
        }
    }

    async getUserById(req, res) {
        try {
            const userId = req.params.id;
            const user = await this.userService.getUserById(userId);
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ error: "User not found" });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Failed to retrieve user" });
        }
    }

    async getAllUsers(req, res) {
        try {
            const users = await this.userService.getAllUsers();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ error: "Failed to retrieve users" });
        }
    }

    async deleteUser(req, res) {
        try {
            const userId = req.params.id;
            const deletedCount = await this.userService.deleteUser(userId);
            if (deletedCount > 0) {
                res.status(200).json({ message: "User deleted successfully" });
            } else {
                res.status(404).json({ error: "User not found" });
            }
        } catch (error) {
            res.status(500).json({ error: "Failed to delete user" });
        }
    }

    async updateUser(req, res) {
        try {
            const userId = req.params.id;
            const updateData = req.body;
            if(isValidUserUpdateData(userData).errors.length > 0) {
                return  res.status(400).json({ error: "Informações do usuário são inválidas", details: isValidUserUpdateData(userData) });
            }
            const modifiedCount = await this.userService.updateUser(userId, updateData);
            if (modifiedCount > 0) {
                res.status(200).json({ message: "User updated successfully" });
            } else {
                res.status(404).json({ error: "User not found" });
            }
        } catch (error) {
            res.status(500).json({ error: "Failed to update user" });
        }
    }


    async login(req, res) {
        try {
            const { email, password } = req.body;

            // Validação simples de entrada
            if (!email || !password) {
                return res.status(400).json({ error: "Email e senha são obrigatórios" });
            }

            const result = await this.userService.login(email, password);

            return res.status(200).json({
                message: `Login realizado com sucesso. Bem-vindo, ${result.username}! :)`,
                token: result.token
            });

        } catch (error) {
            // Se o erro for de credenciais, retorna 401 (Unauthorized)
            if (error.message === 'Credenciais inválidas') {
                return res.status(401).json({ error: "Email ou senha incorretos" });
            }
            console.error(error);
            return res.status(500).json({ error: "Erro interno ao realizar login" });
        }
    }
}