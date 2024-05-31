import { AddOns, AgencySidebarOption, Invitation, Notification, SubAccount, Subscription, User } from "../database/entities/user.model";

export interface AgencyInterface {
    id: string;
    connectAccountId: string;
    customerId: string;
    name: string;
    agencyLogo: string;
    companyEmail: string;
    companyPhone: string;
    whiteLabel: boolean;
    address: string;
    city: string;
    zipCode: string;
    state: string;
    country: string;
    goal: number;
    users: User[];
    createdAt: Date;
    updatedAt: Date;
    subAccounts?: SubAccount[] | null;
    sidebarOptions?: AgencySidebarOption[] | null;
    invitations?: Invitation[] | null;
    notifications?: Notification[] | null;
    subscription: Subscription | null;
    addOns?: AddOns[] | null;
}

export interface AgencyInterfacePartials extends Partial<AgencyInterface> {}