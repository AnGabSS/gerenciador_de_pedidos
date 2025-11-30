import prisma from "../config/prisma.js";

export class UserRepository {
    async createUser(userData) {
        const createdUser = await prisma.user.create({
            data: {
                username: userData.username,
                email: userData.email,
                password: userData.password
            }
        });
        return createdUser.id;
    }

    async getUserById(userId) {
        return await prisma.user.findUnique({
            where: { id: userId }
        });
    }

    async getUserByEmail(email) {
        return await prisma.user.findUnique({
            where: { email: email }
        });
    }

    async getAllUsers() {
        return await prisma.user.findMany();
    }

    async deleteUser(userId) {
        const deletedUser = await prisma.user.delete({
            where: { id: userId }
        });
        return deletedUser ? 1 : 0;
    }

    async updateUser(userId, updateData) {
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: {
                username: updateData.username,
                email: updateData.email
            }
        });
        return updatedUser ? 1 : 0;
    }
}