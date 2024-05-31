import { connectionSource } from "../database/database-source";
import { Notification } from "../database/entities/user.model";

const notificationRepo = connectionSource.getRepository(Notification);

export const createNotification = async (message: string, agencyId: string, userId: string) => {
    const notification = notificationRepo.create({
        message: message,
        agencyId: agencyId,
        subAccountId: userId
    });

    await notificationRepo.save(notification);
    return notification;
}