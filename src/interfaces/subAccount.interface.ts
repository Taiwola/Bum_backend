import { Agency, Automation, Contact, Funnel, Media, Notification, Permissions, Pipeline, SubAccountSidebarOption, Tag, Ticket, Trigger } from "../database/entities/user.model";

export interface ISubAccount {
    id?: string;
    connectAccountId: string;
    name: string;
    subAccountLogo: string;
    createdAt: Date;
    updatedAt: Date;
    companyEmail: string;
    companyPhone: string;
    goal: number;
    address: string;
    city: string;
    zipCode: string;
    state: string;
    country: string;
    agencyId: string;
    agency: Agency;
    sidebarOptions: SubAccountSidebarOption[];
    permissions?: Permissions[];
    funnels?: Funnel[];
    media?: Media[];
    contacts?: Contact[];
    triggers?: Trigger[];
    automations?: Automation[];
    pipelines?: Pipeline[];
    tags?: Tag[];
    notifications?: Notification[];
    tickets?: Ticket[];
}


export interface SubAccountPartial extends Partial<ISubAccount> {}