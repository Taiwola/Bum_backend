import { DeleteResult, UpdateResult } from "typeorm";
import {connectionSource} from "../database/database-source";
import {Media} from "../database/entities/user.model";
import { PartialMediaInteface } from "../interfaces/media.interface";

const mediaRepo = connectionSource.getRepository(Media);


export const create_media = async (mediaData: PartialMediaInteface): Promise<Media> => {
    const media = mediaRepo.create({
        ...mediaData
    });

    await mediaRepo.save(media);
    return media
};


export const update_media = async (mediaId:string, mediaData: PartialMediaInteface): Promise<UpdateResult> => {
    const media = await mediaRepo.update(mediaId, {
        ...mediaData
    });

    return media;
};

export const get_all_media = async (): Promise<Media[]> => {
    const media = await mediaRepo.find({
        relations: ["contact", "subAccount"]
    });

    return media;
};

export const get_one_media = async (mediaId: string): Promise<Media> => {
    const media = await mediaRepo.findOne({
        where: {id: mediaId},
        relations:  ["contact", "subAccount"]
    });

    return media;
}


export const delete_media = async (mediaId: string): Promise<DeleteResult> => {
    const media = await mediaRepo.delete(mediaId);

    return media;
}