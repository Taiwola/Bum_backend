import { Request, Response } from "express";
import { PipelineInterface, PipelinePartialInterface } from "../interfaces/pipeline.interface";
import { create_pipelines, delete_pipeline, getOneSubAccount, get_all_pipeline, get_all_pipeline_where_subaccountId, get_one_pipelines, update_pipeline } from "../service";


export const createPipeline = async (req: Request, res: Response) => {
    try {
        const dataBody:PipelineInterface = req.body;


        const subAccountExist = await getOneSubAccount(dataBody.subAccountId);

        if (!subAccountExist) {
            return res.status(404).json({message: "Sub Account does not exist"});
        }

        const pipeline = await create_pipelines(dataBody);
        return res.status(201).json({message: "Pipeline created", data: pipeline});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal server error"})
    }
}


export const updatePipeline = async (req: Request, res: Response) => {
    const dataBody:PipelinePartialInterface = req.body;
    try {
        const {Id} = req.params;

        const pipelineExist = await get_one_pipelines(Id);

        if (!pipelineExist) return res.status(404).json({message: "Pipeline does not exist"});

        const pipeline = await update_pipeline(pipelineExist.id, dataBody);

        return res.status(200).json({message: "Pipeline updated", data: pipeline});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal server error"});
    }
}

export const getAllPipelines = async (req: Request, res: Response) => {
    const pipelines = await get_all_pipeline();

    return res.status(200).json({message: "Pipelines found", data: pipelines});
}

export const getAllPipelinesWhereSubAccountId = async (req: Request, res:Response) => {
    const {Id} = req.params;
    const subAccountExist = await getOneSubAccount(Id);

    if (!subAccountExist) {
        return res.status(404).json({message: "Sub Account does not exist"});
    }

    const pipelines = await get_all_pipeline_where_subaccountId(Id);

    return res.status(200).json({message:"Pipelines found", data: pipelines});
}


export const getOnePipeline = async (req: Request, res:Response) => {
    const {Id} = req.params;

    const pipeline = await get_one_pipelines(Id);

    if (!pipeline) return res.status(404).json({message: "Pipeline does not exist"});

    return res.status(200).json({message: "Pipeline found", data: pipeline});
}


export const deletePipeline = async (req: Request, res: Response) => {
    
    try {
        const {Id} = req.params;
        const pipeline = await get_one_pipelines(Id);

        if (!pipeline) return res.status(404).json({message: "Pipeline does not exist"});

        const del_pipeline = await delete_pipeline(Id);

        if (del_pipeline.affected) {
            return res.status(200).json({message: "Pipeline deleted"});
        } else {
            return res.status(400).json({message: "something went wrong"});
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal server error"});
    }
}