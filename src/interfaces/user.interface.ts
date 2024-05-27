import { RoleEnum } from "../enum/data.enum";

export interface UserInterface {
    name: string,
    avatarUrl: string,
    email: string,
    role: RoleEnum,
}


export interface UserPartialInterface extends Partial<UserInterface> {}