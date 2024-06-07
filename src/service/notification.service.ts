import { DeleteResult, UpdateResult } from "typeorm";
import { connectionSource } from "../database/database-source";
import { Agency, Notification, SubAccount, User } from "../database/entities/user.model";
import { NotifactionInterface } from "../interfaces/notification.interface";

const notificationRepo = connectionSource.getRepository(Notification);

export const createNotification = async (notificationInterface:NotifactionInterface): Promise<Notification> => {
    const notification = notificationRepo.create({
        ...notificationInterface
    });

    await notificationRepo.save(notification);
    return notification;
};

export const getAllNotification = async (): Promise<Notification[]> => {
    const notifications = await notificationRepo.find({
        relations: ['user', 'agency', 'subAccount']
    });
    return notifications;
}

export const getOneNotification = async (notificationId: string): Promise<Notification> => {
    const notification = await notificationRepo.findOne({
        where: {
            id: notificationId,
        },
        relations: ['user', 'agency', 'subAccount']
    });

    return notification;
};

export const updateNotification = async (notificationId: string, notificationData: Partial<Notification>): Promise<UpdateResult> => {
    const notification = await notificationRepo.update(notificationId, {
        ...notificationData
    });
    return notification;
};

export const deleteNotification = async (notificationId: string): Promise<DeleteResult> => {
    const notification = await notificationRepo.delete(notificationId);
    return notification;
}