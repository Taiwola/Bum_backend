import { Request, Response } from "express";
import {createAgency, updateAgency, deleteAgency, getAgencyById, getAllAgency, get_one_user, createSideBar, getAgencyByName} from "../service";
import { AgencyInterface } from "../interfaces/agency.interface";
import { AgencySidebarOptionInterface, PartialAgencySidebarOption } from "../interfaces/agencySidebarInterface";
import { Icon } from "../enum/data.enum";


export const create_agency = async (req: Request, res: Response) => {
    const {email, id} = req.user;
    const dataBody: AgencyInterface = req.body;
    const userExist = await get_one_user(id);
    if (!userExist) {
        return res.status(400).json({message: "User not found!"});
    };
    const agencyExist = await getAgencyByName(dataBody.name);
    if (agencyExist) {
        return res.status(400).json({message: "Agency already exists!"});
    };

    try {
        const agency = await createAgency(dataBody);
        if (agency) {
            const sidebarArr: AgencySidebarOptionInterface[] = [
                {
                    name: 'Dashboard',
                    icon: Icon.category,
                    link: `/agency/${agency.id}`,
                    agencyId: agency.id,
                    agency: agency
                  },
                  {
                    name: 'Launchpad',
                    icon: Icon.clipboardIcon,
                    link: `/agency/${agency.id}/launchpad`,
                    agencyId: agency.id,
                    agency: agency
                  },
                  {
                    name: 'Billing',
                    icon: Icon.payment,
                    link: `/agency/${agency.id}/billing`,
                    agencyId: agency.id,
                    agency: agency
                  },
                  {
                    name: 'Settings',
                    icon: Icon.settings,
                    link: `/agency/${agency.id}/settings`,
                    agencyId: agency.id,
                    agency: agency
                  },
                  {
                    name: 'Sub Accounts',
                    icon: Icon.person,
                    link: `/agency/${agency.id}/all-subaccounts`,
                    agencyId: agency.id,
                    agency: agency
                  },
                  {
                    name: 'Team',
                    icon: Icon.shield,
                    link: `/agency/${agency.id}/team`,
                    agencyId: agency.id,
                    agency: agency
                  },
              ];

              const createdSidebars = [];
              for (const option of sidebarArr) {
                const sidebar = await createSideBar(option);
                createdSidebars.push(sidebar);
              }

              if (createdSidebars.length === sidebarArr.length) {
                return res.status(200).json({ message: "Agency and sidebar options created successfully", data: agency });
            } else {
                return res.status(500).json({ message: "Not all sidebar options were created", data: agency });
            }
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "Internal server error"});
    }

}

export const get_all_agency = async (req: Request, res: Response) => {
    const agency = await getAllAgency();
    return res.status(200).json({messgae: "Request succcessful" ,data: agency });
};

export const get_one_agency = async (req: Request, res: Response) => {
    const agencyId = req.params.Id;
    if (!agencyId) {
        return res.status(400).json({ message: "Agency ID is required" });
    }
    const agency = await getAgencyById(agencyId);
    if (!agency) {
        return res.status(404).json({ message: "Agency not found" });
    }

    return res.status(200).json({message: "Agency found", data: agency});
}

export const update_agency = async (req: Request, res: Response) => {
    const agencyId = req.params.Id;
    const dataBody: PartialAgencySidebarOption = req.body;
    const {id} = req.user;

    if (!agencyId) {
        return res.status(400).json({ message: "Agency ID is required" });
    }

    const userExist = await get_one_user(id);

    if (!userExist) {
        return res.status(404).json({ message: "User not found" });
    }

    try {
        const updatedAgency = await updateAgency(agencyId,dataBody);
        return res.status(200).json({message: "Request successful", data: updatedAgency});
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "Internal server error"})
    }
}

export const delete_agency = async (req: Request, res: Response) => {
    const agencyId = req.params.Id;

    if (!agencyId) {
        return res.status(400).json({ message: "Agency ID is required" });
    }

    const {id} = req.user;
    const userExist = await get_one_user(id);

    if (!userExist) {
        return res.status(404).json({ message: "User not found" });
    }

    try {
        const del = await deleteAgency(agencyId);
        return res.status(200).json({message: "Request successful"});
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "Internal server error"})
    }
}