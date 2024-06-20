import {connectionSource} from "../database/database-source";
import {Lane} from "../database/entities/user.model";
import { LaneInterface, LaneInterfacePartial } from "../interfaces/lane.interface";

const laneRepository = connectionSource.getRepository(Lane);


export const create_lane = async (laneDetails:LaneInterface) => {
    const lane = laneRepository.create({
        ...laneDetails
    });

    await laneRepository.save(lane);

    return lane;
}

export const update_lane = async (laneId:string ,laneDetails:LaneInterfacePartial) => {
    const lane = await laneRepository.update(laneId, {
        ...laneDetails
    });

    return lane;
}

export const get_all_lane = async () => {
    const lanes = await laneRepository.find({
        relations: ['pipeline', 'tickets', 'tickets.assignedUser', 'tickets.tags']
    });

    return lanes;
}

export const get_one_lane = async (laneId: string) => {
    const lane = await laneRepository.findOne({
        where: {id: laneId},
        relations: ['pipeline', 'tickets', 'tickets.assignedUser', 'tickets.tags']
    });

    return lane;
}

export const get_lane_where_pipelineId = async (pipelineId: string) => {
    const lanes = await laneRepository.find({
        where: {pipelineId: pipelineId},
        relations: ['pipeline', 'tickets', 'tickets.assignedUser', 'tickets.tags']
    });

    return lanes;
}

export const delete_lane = async (laneId: string) => {
    const lane = await laneRepository.delete(laneId);

    return lane;
}