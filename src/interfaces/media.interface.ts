import { Contact, SubAccount } from "../database/entities/user.model";

export interface MediaInterface {
    title: string,
    description: string,
    url: string,
    subAccountId: string,
    subAccount: SubAccount
    contact: Contact
    contactId: string
}

export interface PartialMediaInteface extends Partial<MediaInterface> {}