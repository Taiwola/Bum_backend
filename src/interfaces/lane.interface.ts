import { Pipeline, Ticket } from "../database/entities/user.model";

export interface LaneInterface {
    name: string,
    pipeline: Pipeline,
    pipelineId: string
    order: number
}

export interface LaneInterfacePartial extends Partial<LaneInterface> {
    id: string,
    tickets?: Ticket[]
}