import { connectionSource } from "../database/database-source";
import { Agency, Notification, User } from "../database/entities/user.model";

const notificationRepo = connectionSource.getRepository(Notification);

export const createNotification = async (message: string, agencyId: string, userId: string, user: User, agency:Agency) => {
    const notification = notificationRepo.create({
        message: message,
        agencyId: agencyId,
        userId: userId,
        user: user,
        agency: agency
    });

    await notificationRepo.save(notification);
    return notification;
}