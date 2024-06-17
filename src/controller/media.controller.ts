import {Request, Response} from "express";
import { MediaInterface, PartialMediaInteface } from "../interfaces/media.interface";
import { createValidator } from "../util/validator/mediaValidator";
import { delete_media, getOneSubAccount, get_all_media, get_one_media, update_media } from "../service";
import { create_media } from "../service";
import { date } from "joi";


export const createMedia = async (req:Request, res: Response) => {

    try {
        const {error} = createValidator.validate(req.body, {abortEarly: false});

        if (error) {
            const errorMessages = error.details.map(detail => detail.message);
            return res.status(400).json({ message: errorMessages });
        }

        const dataBody: MediaInterface = req.body;   

        const subAccountExist = await getOneSubAccount(dataBody.subAccountId);

        if (!subAccountExist) {
            return res.status(404).json({message: "Sub Account not found"});
        }


        const media = await create_media(dataBody);

       return res.status(201).json({message: "Request was succesful", data: media});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal server error"});
    }
}

export const updateMedia = async (req: Request, res: Response) => {
    try {
        const dataBody:PartialMediaInteface = req.body;
        const {Id} = req.params;

        const subAccountExist = await getOneSubAccount(dataBody.subAccountId);

        if (!subAccountExist) {
            return res.status(404).json({message: "Sub Account not found"});
        }

        const mediaExist = await get_one_media(Id);

        if (!mediaExist) {
            return res.status(404).json({message: "Media not found"});
        }

        const media = await update_media(Id, dataBody);

        if (media.affected) {
            return res.status(200).json({ message: "Media updated successfully", data: media });
        } else {
            return res.status(404).json({ message: "Media not found" });
        }

    } catch (error) {
     console.log(error);
     return res.status(500).json({message: "Internal server error"});   
    }
}


export const getOneMedia = async (req: Request, res: Response) => {
    const {Id} = req.params;

     // Fetch the media by its ID
     const media = await get_one_media(Id);

     // Check if the media exists
     if (!media) {
         return res.status(404).json({ message: 'Media not found' });
     }

     // Return the media data
     return res.status(200).json({message: "Request successful", data: media });
}

export const getAllMedia = async (req: Request, res: Response) => {
    const media = await get_all_media();

    return res.status(200).json({message: "Request successful", data: media})
}

export const deleteMedia = async (req: Request, res: Response) => {
    const {Id} = req.params;
    const media = await get_one_media(Id);

    // Check if the media exists
    if (!media) {
        return res.status(404).json({ message: 'Media not found' });
    }

    const delMedia = await delete_media(Id);

    if (delMedia.affected) {
        return res.status(200).json({ message: 'Media deleted successfully' });
    } else {
        return res.status(500).json({ message: 'Failed to delete media' });
    }
}