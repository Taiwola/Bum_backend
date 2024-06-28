import { Contact, Lane, SubAccount, Tag, User } from "../database/entities/user.model";

export interface TicketInterface {
    name: string,
    description: string,
    isClosed: boolean,
    subAccountId: string;
    laneId: string;
    customerId: string;
    value: number;
    assignedUserId: string;
    subAccount: SubAccount;
    assignedUser: User;
    lane: Lane;
    tags: Tag[];
    contact: Contact;
    order: number
}

export interface TicketInterfacePartial extends Partial<TicketInterface> {}