import { RoleEnum } from "../enum/data.enum";

export interface UserInterface {
    name: string,
    avatarUrl: string,
    email: string,
    role: RoleEnum,
    password: string,
}


export interface UserPartialInterface extends Partial<UserInterface> {}