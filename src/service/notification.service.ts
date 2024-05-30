import { connectionSource } from "../database/database-source";
import { Notification } from "../database/entities/user.model";

const notificationRepo = connectionSource.getRepository(Notification);

export const createNotification = async (message: string, agencyId: string, subAccountId: string) => {
    const notification = notificationRepo.create({
        message: message,
        agencyId: agencyId,
        subAccountId: subAccountId
    });

    await notificationRepo.save(notification);
    return notification;
}