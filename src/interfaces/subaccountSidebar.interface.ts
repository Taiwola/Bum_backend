import { SubAccount } from "../database/entities/user.model";
import { Icon } from "../enum/data.enum";



// Interface for AgencySidebarOption
export interface SubaccountSidebarOptionInterface {
    name: string;
    icon: Icon;
    link: string;
    subAccount: SubAccount;
    subAccountId: string;
  }
  
  // Partial type for AgencySidebarOption
  export type PartialSubAcccountSidebarOption = Partial<SubaccountSidebarOptionInterface>;