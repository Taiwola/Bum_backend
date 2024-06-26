import {connectionSource} from "../database/database-source";
import {Tag} from "../database/entities/user.model";
import { TagInterface, TagPartialInterface } from "../interfaces/tag.interface";


const TagRepository = connectionSource.getRepository(Tag);


export const create_tag = async (tagData: TagInterface) => {
    const tag = TagRepository.create({
        ...tagData
    });
    const saved = await TagRepository.save(tag);
    return saved;
}

export const update_tag = async (tagId: string, tagData: TagPartialInterface) => {
    const tag = await TagRepository.update(tagId, {
        ...tagData,
    });
    return tag;
};


export const get_all_tags = async () => {
    const tags = await TagRepository.find({
        relations: ['subAccount', 'tickets']
    });

    return tags;
};



export const get_all_subaccount_tags = async (subaccId: string) => {
    const tag = await TagRepository.findOne({
        where: {subAccountId: subaccId},
        relations: ['subAccount', 'tickets']
    });

    return tag;
}


export const get_one_tag = async (tagId: string) => {
    const tag = await TagRepository.findOne({
        where: {id: tagId},
        relations: ['subAccount', 'tickets']
    });

    return tag;
}


export const delete_tag = async (tagId: string) => {
    const tag = await TagRepository.delete(tagId);
    return tag;
}