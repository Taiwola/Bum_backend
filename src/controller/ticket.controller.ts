import {Request, Response, json} from "express";
import { TicketInterface, TicketInterfacePartial } from "../interfaces/tickets.interface";
import { getOneSubAccount, get_one_lane, get_one_pipelines, get_one_user } from "../service";
import { create_ticket, delete_ticket, get_all_ticket, get_all_ticket_where_laneId, get_all_tickets_where_pipelineId, get_one_ticket, update_ticket } from "../service/tickets.service";


export const createTicket = async (req: Request, res: Response) => {
    const dataBody: TicketInterface = req.body;

    const laneExist = await get_one_lane(dataBody.laneId);
    const userExist = await get_one_user(dataBody.assignedUserId);
    const subAccountExist = await getOneSubAccount(dataBody.subAccountId);

    if (!laneExist || userExist || subAccountExist) {
        return res.status(404).json({message: "Some request were not found"})
    }

    try {
        const create = await create_ticket(dataBody);

        return res.status(200).json({message: "Ticket created", data: create});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal server error"});
    }
}

export const updateTicket = async (req: Request, res: Response) => {
    const dataBody:TicketInterfacePartial = req.body;
    const {Id} = req.params;

    const ticket = await get_one_ticket(Id);

    if (!ticket) return res.status(404).json({message: "Ticket does not exist"});

    try {
        const update = await update_ticket(ticket.id, dataBody);
        return res.status(200).json({message: "Ticket updated", data: update});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal server error"});
    }
}

export const getAllTicket = async (req: Request, res:Response) => {
    const tickets = await get_all_ticket();

    return res.status(200).json({message: "Request successful", data: tickets});
};

export const getAllTicketWhereLaneId = async (req:Request, res:Response) => {
    const {Id} = req.params;

    const laneExist = await get_one_lane(Id);

    if (!laneExist) return res.status(404).json({message: "Lane does not exist"});

    const tickets = await get_all_ticket_where_laneId(laneExist.id);

    return res.status(200).json({message:"Request successfull", data:tickets});
}

export const getAllTicketsWherePipelineId = async (req:Request, res:Response) => {
    const {Id} = req.params;

    const pipeline = await get_one_pipelines(Id);

    if (!pipeline) return res.status(404).json({message: 'pipeline does not exist'});

    const tickets = await get_all_tickets_where_pipelineId(Id)

    return res.status(200).json({message: "Request was succesful", data: tickets});
}

export const getOneTicket = async (req: Request, res: Response) => {
    const {Id} = req.params;

    const ticket = await get_one_ticket(Id);

    if (!ticket) return res.status(404).json({message: "Ticket does not exist"});

    return res.status(200).json({message: "Request successful", data: ticket});
}

export const deleteTicket = async (req: Request, res: Response) => {
    const {Id} = req.params;

    const ticket = await get_one_ticket(Id);

    if (!ticket) return res.status(404).json({message: "Ticket does not exist"});

   

    try {
        const delTicket = await delete_ticket(ticket.id);

        if (delTicket.affected > 0) {
            return res.status(200).json({message:"Ticket deleted succesfully"})
        } else {
            return res.status(400).json({message: "Something went wrong"});
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal server error"})
    }

}