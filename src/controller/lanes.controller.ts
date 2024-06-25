import {Request, Response} from "express";
import { LaneInterface, LaneInterfacePartial } from "../interfaces/lane.interface";
import { create_lane, delete_lane, get_all_lane, get_lane_where_pipelineId, get_one_lane, get_one_pipelines, update_lane } from "../service";


export const createLanes = async (req: Request, res: Response) => {
    const dataBody:LaneInterface = req.body;
    try {
        const pipeline = await get_one_pipelines(dataBody.pipelineId);
        if (!pipeline) return res.status(404).json({message: "Pipeline does not exist"});

        let order: number

        if (!dataBody.order) {
            order = (await get_all_lane()).length;
        } else {
            order = dataBody.order
        }

        const options: LaneInterface = {
            ...dataBody,
            order: order
        }


        const lane = await create_lane(options);
        return res.status(200).json({message: "Lane was created", data:lane});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal server error"});
    }
}

export const updateLanes = async (req: Request, res: Response) => {
    const dataBody:LaneInterfacePartial = req.body;
    const {Id} = req.params;
    try {
        const lanes = await get_one_lane(Id);
        if (!lanes) return res.status(404).json({message: "Lane does not exist"});
        const pipeline = await get_one_pipelines(dataBody.pipelineId);
        if (!pipeline) return res.status(404).json({message: "Pipeline does not exist"});

       
        // update lane logic
        const update =await update_lane(lanes.id, dataBody);
        return res.status(200).json({message: "Lanes updated", data:update});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal server error"});
    }
}


export const getAllLanes = async (req: Request, res: Response) => {
    const lanes = await get_all_lane();
    return res.status(200).json({message: "Request successful", data:lanes});
}

export const getAllLanesWherePipelineId = async (req: Request, res:Response) => {
    const {Id} = req.params;
    const pipeline = await get_one_pipelines(Id);

    if (!pipeline) return res.status(404).json({message: "Pipeline does not exist"});

    const lanes = await get_lane_where_pipelineId(pipeline.id);

    return res.status(200).json({message:"Request success", data:lanes});
};

export const getOneLane = async (req: Request, res:Response) => {
    const {Id} = req.params;

    const lanes = await get_one_lane(Id);
    if (!lanes) return res.status(404).json({message: "Lane does not exist"});

    return res.status(200).json({message: "Request successful", data:lanes});
} 

export const deleteLane = async (req: Request, res: Response) => {
    const {Id} = req.params;

    const lanes = await get_one_lane(Id);
    if (!lanes) return res.status(404).json({message: "Lane does not exist"});

    await delete_lane(lanes.id);

    return res.status(200).json({message: "Request successful"});
}