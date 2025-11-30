import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class UserService {
    constructor(userRepository, mapper) {
        this.userRepository = userRepository;
        this.mapper = mapper;
        this.SALT_ROUNDS = 10;
        this.JWT_SECRET = process.env.JWT_SECRET
    } 

    async createUser(userData) {
        if (userData.password) {
            userData.password = await this._hashPassword(userData.password);
        }

        const dbUserData = this.mapper.mapRequestToCreateUserData(userData);
        const userId = await this.userRepository.createUser(dbUserData);
        return userId;
    }

    async getUserById(userId) {
        const user = await this.userRepository.getUserById(userId);
        return user;
    }

    async getUserByEmail(email) {
        const user = await this.userRepository.getUserByEmail(email);
        return user;
    }

    async getAllUsers() {
        const users = await this.userRepository.getAllUsers();
        return users;
    }

    async deleteUser(userId) {
        const deletedCount = await this.userRepository.deleteUser(userId);
        return deletedCount;
    }

    async updateUser(userId, updateData) {
        const dbUserData = this.mapper.mapRequestToUpdateUserData(updateData);
        const modifiedCount = await this.userRepository.updateUser(userId, dbUserData);
        return modifiedCount;
    }

    async _hashPassword(plainTextPassword) {
        const salt = await bcrypt.genSalt(this.SALT_ROUNDS);
        return await bcrypt.hash(plainTextPassword, salt);
    }
    
    async verifyPassword(plainTextPassword, hashedPassword) {
        return await bcrypt.compare(plainTextPassword, hashedPassword);
    }

        async login(email, password) {
        const user = await this.userRepository.getUserByEmail(email);

        if (!user) {
            throw new Error('Credenciais inválidas');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        
        if (!isPasswordValid) {
            throw new Error('Credenciais inválidas');
        }
        
        const token = jwt.sign(
            { id: user.id, username: user.username }, 
            this.JWT_SECRET, 
            { expiresIn: '8h' }
        );

        return { token, userId: user.id, username: user.username };
    }
}