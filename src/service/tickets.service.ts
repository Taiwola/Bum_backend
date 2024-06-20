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
    const tickets = await ticketRepository.find();
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