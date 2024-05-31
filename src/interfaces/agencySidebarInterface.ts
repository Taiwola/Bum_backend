import { Agency } from "../database/entities/user.model";
import { Icon } from "../enum/data.enum";



// Interface for AgencySidebarOption
export interface AgencySidebarOptionInterface {
    name: string;
    icon: Icon;
    link: string;
    agency: Agency;
    agencyId: string;
  }
  
  // Partial type for AgencySidebarOption
  export type PartialAgencySidebarOption = Partial<AgencySidebarOptionInterface>;