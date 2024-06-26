import { SubAccount } from "../database/entities/user.model";

export interface TagInterface {
    name: string,
    color: string,
    subAccountId: string,
    subAccount: SubAccount
}


export interface TagPartialInterface extends TagInterface {}