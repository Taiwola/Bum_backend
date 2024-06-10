import { SubAccount, User } from "../database/entities/user.model";

export interface PermissionsInterface {
    email: string,
    user: User,
    subAccountId: string,
    subAccount: SubAccount,
    access: boolean
}

export interface PartialInterfacePermission extends Partial<PermissionsInterface> {}