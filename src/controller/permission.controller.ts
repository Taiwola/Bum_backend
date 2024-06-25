import { Request, Response } from "express";
import { PartialInterfacePermission, PermissionsInterface } from "../interfaces/permission.interface";
import { create_permission, delete_permission, get_all_permission, get_all_user_permission, get_one_permission, get_one_user, getOneSubAccount, update_permission } from "../service";

interface CustomRequest extends Request {
    user?: { id: string };
}

export const createPermission = async (req: CustomRequest, res: Response) => {
    const dataBody: PermissionsInterface = req.body;
    const userId = dataBody.userId;

    if (!userId) {
        return res.status(400).json({ message: "User ID is missing" });
    }

    try {
        const userExist = await get_one_user(userId);
        if (!userExist) {
            return res.status(404).json({ message: "User does not exist" });
        }

        const subAccountExist = await getOneSubAccount(dataBody.subAccountId);
        if (!subAccountExist) {
            return res.status(404).json({ message: "Sub Account does not exist" });
        }

        const options: PermissionsInterface = {
            email: dataBody.email,
            access: dataBody.access,
            subAccountId: dataBody.subAccountId,
            user: userExist,
            subAccount: subAccountExist, 
            userId: userExist.id
        };

        const permission = await create_permission(options);
        return res.status(201).json({ message: "Request successful", data: permission });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const updatePermission = async (req: CustomRequest, res: Response) => {
    const dataBody: PartialInterfacePermission = req.body;
    const id = req.params.id;

    try {
        const permissionExist = await get_one_permission(id);
        if (!permissionExist) {
            return res.status(404).json({ message: "Permission does not exist" });
        }

        await update_permission(id, dataBody);
        return res.status(200).json({ message: "Request successful" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const getAllPermission = async (req: CustomRequest, res: Response) => {
    try {
        const permissions = await get_all_permission();
        return res.status(200).json({ message: "Request successful", data: permissions });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const getAllUserPermission = async (req: CustomRequest, res: Response) => {
    try {
        const userId = req.params.Id;
        const userExist  = await get_one_user(userId);

        if (!userExist) return res.status(404).json({message: 'user does not exist'})
        const permissions = await get_all_user_permission(userExist);
        if (!permissions) {
            return res.status(404).json({ message: "Permission does not exist" });
        }
        return res.status(200).json({ message: "Request successful", data: permissions });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const getOnePermission = async (req: CustomRequest, res: Response) => {
    const id = req.params.id;

    try {
        const permission = await get_one_permission(id);
        if (!permission) {
            return res.status(404).json({ message: "Permission does not exist" });
        }

        return res.status(200).json({ message: "Request successful", data: permission });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const deletePermission = async (req: CustomRequest, res: Response) => {
    const id = req.params.id;

    try {
        const permission = await get_one_permission(id);
        if (!permission) {
            return res.status(404).json({ message: "Permission does not exist" });
        }

        await delete_permission(id);
        return res.status(200).json({ message: "Request successful" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
