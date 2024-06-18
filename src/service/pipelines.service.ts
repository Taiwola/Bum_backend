import {connectionSource} from "../database/database-source";
import { Pipeline } from "../database/entities/user.model";
import { PipelineInterface, PipelinePartialInterface } from "../interfaces/pipeline.interface";

const PipelineRepository = connectionSource.getRepository(Pipeline);


export const create_pipelines = async (pipelineData: PipelineInterface) => {
    const pipeline = PipelineRepository.create({
        ...pipelineData
    });

    await PipelineRepository.save(pipeline);

    return pipeline;
}

export const update_pipeline = async (pipelineId: string, pipelineData: PipelinePartialInterface) => {
    const pipeline = await PipelineRepository.update(pipelineId, {
        ...pipelineData
    });

    return pipeline;
}

export const get_all_pipeline = async () => {
    const pipelines = await PipelineRepository.find();
    return pipelines;
}

export const get_all_pipeline_where_subaccountId = async (subAccountId: string) => {
    const pipelines = await PipelineRepository.find({
        where: {subAccountId: subAccountId}
    });

    return pipelines;
}

export const get_one_pipelines = async (pipelineId: string) => {
    const pipeline = await PipelineRepository.findOne({
        where: {id: pipelineId}
    });

    return pipeline;
};


export const delete_pipeline = async (pipelineId: string) => {
    const pipeline = await PipelineRepository.delete(pipelineId);
    return pipeline;
}