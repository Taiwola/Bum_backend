import { connectionSource } from "../database/database-source";
import { User } from "../database/entities/user.model";
import { UserInterface, UserPartialInterface } from "../interfaces/user.interface";
import { DeleteResult, UpdateResult } from 'typeorm';

const userRepository = connectionSource.getRepository(User);



export const create_user = async (userInput: UserInterface): Promise<User> => {
    const user = userRepository.create({
        ...userInput
    });

    await userRepository.save(user);

    return user;
};

export const get_all_user = async (): Promise<User[]> => {
    const users = await userRepository.find({
        relations: [
            'agency', 'permissions', 'tickets', 'notifications','agency.subAccounts', 'permissions.subAccount', 'agency.subAccounts.permissions', 'agency.subAccounts.sidebarOptions'
        ]
    });
    return users;
}

export const get_one_user = async (userId: string): Promise<User> => {
    const user = await userRepository.findOne({ where: {id: userId}, relations: ['agency', 'permissions', 'tickets', 'notifications','agency.subAccounts', 'permissions.subAccount', 'agency.subAccounts.permissions', 'agency.subAccounts.sidebarOptions'] });
    return user;
};

export const get_team_members = async (agencyId: string) => {
    const user = await userRepository.find({
        where: {agencyId: agencyId},
        relations: ['agency', 'permissions', 'tickets', 'notifications', 'agency.subAccounts', 'permissions.subAccount', 'agency.subAccounts.permissions', 'agency.subAccounts.sidebarOptions']
    })
    return user;
}

export const get_subacc_team_members = async (subaccId: string) => {
    const user = await userRepository.find({
        where: {agency: {
            subAccounts: {id: subaccId}
        }},
        relations: ['agency', 'permissions', 'tickets', 'notifications', 'agency.subAccounts', 'permissions.subAccount', 'agency.subAccounts.permissions', 'agency.subAccounts.sidebarOptions']
    })
    return user;
}

export const get_one_by_email = async (userEmail: string): Promise<User> => {
    const user = await userRepository.findOne({ where: {email: userEmail}, relations: ['agency', 'permissions', 'tickets', 'notifications', 'agency.subAccounts.permissions', 'agency.subAccounts.sidebarOptions'] });
    return user;
}

export const update_user = async (userId: string, userDetails:UserPartialInterface): Promise<UpdateResult> => {
    const user = await userRepository.update({id: userId}, {
        ...userDetails
    });

    return user;
};

export const delete_user = async (userId: string): Promise<DeleteResult> => {
    const user = await userRepository.delete({id: userId});
    return user;
}


