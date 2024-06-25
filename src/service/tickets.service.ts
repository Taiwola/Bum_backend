import {connectionSource} from "../database/database-source";
import { Ticket } from "../database/entities/user.model";
import { TicketInterface, TicketInterfacePartial } from "../interfaces/tickets.interface";

const ticketRepository = connectionSource.getRepository(Ticket);


export const create_ticket = async (ticketDetails: TicketInterface) => {
    const ticket = ticketRepository.create({
        ...ticketDetails
    });

    await ticketRepository.save(ticket);

    return ticket;
}


export const update_ticket = async (ticketId: string ,ticketDetails: TicketInterfacePartial) => {
    const ticket = await ticketRepository.update(ticketId, {
        ...ticketDetails
    });

    return ticket
};


export const get_all_ticket = async () => {
    const tickets = await ticketRepository.find({
        order: {createdAt: 'ASC'},
        relations: ['tags', 'lane', 'assignedUser', 'subAccount']
    });
    return tickets;
}

export const get_all_ticket_where_laneId = async (laneId:string) => {
    const tickets = await ticketRepository.find({
        where: {laneId: laneId},
        relations: ['tags', 'lane', 'assignedUser', 'subAccount'],
        order: {createdAt: 'ASC'}
    });
    return tickets;
}

export const get_all_tickets_where_pipelineId = async (pipelineId: string) => {
    const tickets = await ticketRepository.find({
        where: {lane: {pipelineId: pipelineId}},
        relations: ['tags', 'lane', 'assignedUser', 'subAccount']
    })

    return tickets;
}

export const get_one_ticket = async (ticketId: string) => {
    const ticket = await ticketRepository.findOne({
        where: {id: ticketId}
    });

    return ticket
}

export const delete_ticket = async (ticketId: string) => {
    const ticket = await ticketRepository.delete(ticketId);

    return ticket;
}