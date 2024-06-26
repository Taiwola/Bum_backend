import {Request, Response} from "express";
import { TagInterface } from "../interfaces/tag.interface";
import { create_tag, delete_tag, getOneSubAccount, get_all_subaccount_tags, get_all_tags, get_one_tag, update_tag } from "../service";


export const createTag = async (req: Request, res: Response) => {
    const dataBody: TagInterface = req.body;

    const subacct = await getOneSubAccount(dataBody.subAccountId);

    if (!subacct) return res.status(404).json({message: 'Sub Account does not exist'});

    const options: TagInterface = {
        ...dataBody,
        subAccount: subacct
    };

    try {
        const tag = await create_tag(options);
        if (!tag) return res.status(400).json({messsage: "Something wrong happened"});

        return res.status(200).json({message: "Tag created successfully", data: tag});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal server error"});
    }
}

export const updateTag = async (req: Request, res: Response) => {
    const dataBody: TagInterface = req.body;
    const Id = req.params.Id;

    const tag = await get_one_tag(Id);

    if (!tag) return res.status(404).json({message: "Tag does not exist"});

    try {
        const update = await update_tag(tag.id, dataBody)
        if (update.affected <= 0) {
            return res.status(400).json({message: "Something went wrong"});
        }

        return res.status(200).json({message: "Tag updated", data: update});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal server error"});
    }
}


export const getAllTag = async (req: Request, res: Response) => {
    const tags = await get_all_tags();
    return res.status(200).json({message: "Request successful", data: tags});
}

export const getTagsWhereSubAcct = async (req: Request, res: Response) => {
    const Id = req.params.Id;

    const subacct = await getOneSubAccount(Id);

    if (!subacct) return res.status(404).json({message: "Sub Account does not exist"});

    const tag = await get_all_subaccount_tags(subacct.id);

    if (!tag) return res.status(404).json({message: "Tag does not exist"});

    return res.status(200).json({message: "Request succesful", data: tag});
}

export const getOneTag = async (req: Request, res: Response) => {
    const Id = req.params.Id;

    const tag = await get_one_tag(Id);

    if (!tag) return res.status(404).json({message: "Tag does not exist"});

    return res.status(200).json({message: "Request successful", data: tag});
}

export const deleteTag = async (req: Request, res: Response) => {

    const Id = req.params.Id;

    const tag = await get_one_tag(Id);

    if (!tag) return res.status(404).json({message: "Tag does not exist"});

    try {
        const del_tag = await delete_tag(tag.id);
        if (del_tag.affected <= 0) {
            return res.status(400).json({message: "Something wrong happened"});
        } 
        return res.status(200).json({message: "Request succesful"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal server error"});
    }
}