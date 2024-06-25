import { connectionSource } from "../database/database-source";
import { Permissions, User } from "../database/entities/user.model";
import { PartialInterfacePermission, PermissionsInterface } from "../interfaces/permission.interface";


const permissionRepo = connectionSource.getRepository(Permissions);


export const create_permission = async (perData: PermissionsInterface) => {
    const permission = permissionRepo.create({
        ...perData
    });

    await permissionRepo.save(permission);
    return permission;
}

export const update_permission = async (perId: string, perData: PartialInterfacePermission) => {
    const permission = await permissionRepo.update(perId,{
        ...perData
    });

    return permission;
};

export const get_all_permission = async () => {
    const permission = await permissionRepo.find({
        relations: [
            'user', 'subAccount', 'subAccount.agency'
        ]
    })

    return permission;
}

export const get_all_user_permission = async (user: User) => {
    const permission = await permissionRepo.findOne({
        where: {user: user},
        relations: [
            'user', 'subAccount', 'subAccount.agency'
        ]
    })

    return permission;
}

export const get_one_permission = async (perId: string) => {
    const permission = await permissionRepo.findOne({
        where: {id: perId},
        relations:  [
            'user', 'subAccount', 'subAccount.agency'
        ]
    });

    return permission;
};


export const delete_permission = async (perId: string) => {
    const permission = await permissionRepo.delete(perId);
    return permission
}