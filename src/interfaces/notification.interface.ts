import { Agency, SubAccount, User } from "../database/entities/user.model";

export interface NotifactionInterface {
    message: string,
    userId: string,
    user: User,
    agency?: Agency,
    agencyId?: string,
    subAccount?: SubAccount,
    subAccountId?: string
}