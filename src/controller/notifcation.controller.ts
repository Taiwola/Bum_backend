import {Response, Request} from "express";
import { createNotification, deleteNotification, getAgencyById, getAllNotification, getOneNotification, get_one_user, updateNotification } from "../service";
import { Notification } from "../database/entities/user.model";
import { NotifactionInterface } from "../interfaces/notification.interface";



/**
 * Creates a new notification for a user.
 * 
 * @param req - The Express request object.
 * @param res - The Express response object.
 */
export const create_notification = async (req: Request, res: Response) => {
     /**
     * Extract the message from the request body.
     */
    const {message, type, subAccountId} = req.body;

     // Validate required fields
     if (!message || !type) {
        return res.status(400).json({ error: 'Message and type are required' });
    }

    /**
     * Get the user ID from the request.
     */
    const userId = req.user.id;

    /**
     * Check if the user exists.
     */
    const userExist = await get_one_user(userId);

    if (!userExist) {
         /**
         * Return a 404 error if the user is not found.
         */
        return res.status(404).json({ message: "User not found" });
    };

     /**
    /**
    * Check if the agency exists for the user.
    */
   const agencyExist = await getAgencyById(userExist.agencyId);

   if (!agencyExist) {
        /**
        * Return a 404 error if the agency is not found.
        */
       return res.status(404).json({ message: "Agency not found" });
   }
   

    try {
        let notification: any

        if (type === 'agency')
            {
        //  * Create a new notification with the provided message and user/agency IDs.
        //  */

        const options: NotifactionInterface = {
             message: message,
             user: userExist,
             userId: userExist.id,
             agency: agencyExist,
             agencyId: agencyExist.id
        }

         notification = await createNotification(options);
            }

            if (type === 'subaccount') {
                // todo: complete this code
                const subAccount = agencyExist.subAccounts.find((subaccount) => subaccount.id === subAccountId);

                if (!subAccount) {
                    return res.status(404).json({ message: "sub account not found" });
                }

               
                const options: NotifactionInterface = {
                    message: message,
                    user: userExist,
                    userId: userExist.id,
                    subAccount: subAccount,
                    subAccountId: subAccount.id
               }

                notification = await createNotification(options)
            }
         
          /**
         * Return a 200 response with the created notification.
         */
        return res.status(200).json({message: "Request successfull", data: notification});
    } catch (error) {
        /**
         * Log any errors and return a 500 response.
         */
        console.log('notification: ',error);
        return res.status(500).json({message: "Internal server error"});
    }
};

export const get_all_notification = async (req: Request, res: Response) => {
    const notifications = await getAllNotification();
    return res.status(200).json({message: "request successful", data: notifications});
};


export const get_one_notification = async (req:Request, res: Response) => {
    const Id = req.params.Id;

    if (!Id) {
        return res.status(400).json({ message: "Notification ID is required" });
    };

    const notification = await getOneNotification(Id);

    if (!notification) {
        return res.status(404).json({message: "Notification not found"});
    };

    return res.status(200).json({message: "Request successful", data: notification});
};


export const update_notification = async (req: Request, res: Response) => {
    const dataBody: Partial<Notification> = req.body;
    const Id = req.params.Id;

    if (!Id) {
        return res.status(400).json({ message: "Notification ID is required" });
    };

    const notificationExist = await getOneNotification(Id);

    if (!notificationExist) {
        return res.status(404).json({message: "Notification not found"});
    };

    try {
        const update = await updateNotification(notificationExist.id, dataBody);
        if (update.affected > 0) {
            return res.status(200).json({message: "Request successful"});
        }
    } catch (error) {
        console.log('notification: ',error);
        return res.status(500).json({message: "Internal server error"});
    }
}


export const delete_notification = async (req: Request, res: Response) => {
    const Id = req.params.Id;

    if (!Id) {
        return res.status(400).json({ message: "Notification ID is required" });
    };

    const del_notification = await deleteNotification(Id);

    if (del_notification.affected) {
        return res.status(200).json({message: "Request successful"})
    } else {
        return res.status(500).json({message: "Request could not be completed at the moment, try again"});
    }
}
