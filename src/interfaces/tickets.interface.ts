import { Lane, SubAccount, Tag, User } from "../database/entities/user.model";

export interface TicketInterface {
    title: string,
    description: string,
    isClosed: boolean,
    subAccountId: string;
    laneId: string;
    customerId: string;
    assignedUserId: string;
    subAccount: SubAccount;
    assignedUser: User;
    lane: Lane;
    tags: Tag[];
}

export interface TicketInterfacePartial extends Partial<TicketInterface> {}