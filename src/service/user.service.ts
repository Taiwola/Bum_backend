import { connectionSource } from "../database/database-source";
import { User } from "../database/entities/user.model";
import { UserInterface, UserPartialInterface } from "../interfaces/user.interface";
import { DeleteResult, UpdateResult } from 'typeorm';

const userRepository = connectionSource.getRepository(User);


export const create_user = async (userInput: UserInterface): Promise<User> => {
    const user = await userRepository.create({
        ...userInput
    });

    return user;
};

export const get_all_user = async (): Promise<User[]> => {
    const users = await userRepository.find();
    return users;
}

export const get_one_user = async (userId: string): Promise<User> => {
    const user = await userRepository.findOneBy({ id: userId });
    return user;
};


export const get_one_by_email = async (userEmail: string): Promise<User> => {
    const user = await userRepository.findOneBy({ email: userEmail });
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
