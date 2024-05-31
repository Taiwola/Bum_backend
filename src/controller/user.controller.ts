import { Request, Response } from 'express';
import { create_user, get_all_user, get_one_user, get_one_by_email, update_user, delete_user } from '../service';
import { UserInterface, UserPartialInterface } from '../interfaces/user.interface';

// Create a new user
export const createUser = async (req: Request, res: Response) => {
    const userData: UserInterface = req.body;
    try {
        const newUser = await create_user(userData);
        return res.status(201).json({ message: "User created successfully", data: newUser });
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Get all users
export const getAllUsers = async (_req: Request, res: Response) => {
    try {
        const users = await get_all_user();
        return res.status(200).json({ message: "Users retrieved successfully", data: users });
    } catch (error) {
        console.error("Error retrieving users:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Get a single user by ID
export const getOneUser = async (req: Request, res: Response) => {
    const userId = req.params.id;
    if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
    }
    try {
        const user = await get_one_user(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ message: "User retrieved successfully", data: user });
    } catch (error) {
        console.error("Error retrieving user:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Get a single user by email
export const getOneByEmail = async (req: Request, res: Response) => {
    const userEmail = req.params.email;
    if (!userEmail) {
        return res.status(400).json({ message: "User email is required" });
    }
    try {
        const user = await get_one_by_email(userEmail);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ message: "User retrieved successfully", data: user });
    } catch (error) {
        console.error("Error retrieving user:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Update a user
export const updateUser = async (req: Request, res: Response) => {
    const userId = req.params.id;
    const userDetails: UserPartialInterface = req.body;
    if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
    }
    try {
        const updateResult = await update_user(userId, userDetails);
        if (updateResult.affected === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
        console.error("Error updating user:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Delete a user
export const deleteUser = async (req: Request, res: Response) => {
    const userId = req.params.id;
    if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
    }
    try {
        const deleteResult = await delete_user(userId);
        if (deleteResult.affected === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Error deleting user:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
