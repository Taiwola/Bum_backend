import { Agency, Notification, Permissions, Ticket } from "../database/entities/user.model";
import { RoleEnum } from "../enum/data.enum";

export interface UserInterface {
    name: string;
    avatarUrl?: string | null;
    email: string;
    createdAt: Date;
    updatedAt: Date;
    role: RoleEnum;
    password: string;
    agencyId?: string | null;
    agency?: Agency | null;
    permissions?: Permissions[] | null;
    tickets?: Ticket[] | null;
    notifications?: Notification[] | null;
}


export interface UserPartialInterface extends Partial<UserInterface> {}