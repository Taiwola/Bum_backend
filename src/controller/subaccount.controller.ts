import {Request, Response} from "express";
import { ISubAccount, SubAccountPartial } from "../interfaces/subAccount.interface";
import { getAllSubAcccount, get_one_user, createSubAccount, createSubAccountSideBar, updateSubAccount, getOneSubAccount, deleteSubAccount } from "../service";
import { getSubAccountByName } from "../service/subAccount.service";
import { SubaccountSidebarOptionInterface } from "../interfaces/subaccountSidebar.interface";
import { Icon } from "../enum/data.enum";


export const create_subaccount = async (req: Request, res: Response) => {
    const dataBody: ISubAccount = req.body;
    const {id} = req.user;

    const userExist = await get_one_user(id);

    if (!userExist) {
        return res.status(400).json({message: "User not found!"});
    };

  const subAccountExist = await getSubAccountByName(dataBody.name);

  if (subAccountExist) {
    return res.status(400).json({message: "Subaccount already exists!"});
  }

  try {
    const subAccount = await createSubAccount(dataBody);

    if (subAccount) {
        const sideBarArr: SubaccountSidebarOptionInterface[] = [
            {
                name: 'Launchpad',
                icon: Icon.clipboardIcon,
                link: `/subaccount/${subAccount.id}/launchpad`,
                subAccount: subAccount,
                subAccountId: subAccount.id
            },
              {
                name: 'Settings',
                icon: Icon.settings,
                link: `/subaccount/${subAccount.id}/settings`,
                subAccount: subAccount,
                subAccountId: subAccount.id
              },
              {
                name: 'Funnels',
                icon:  Icon.pipelines,
                link: `/subaccount/${subAccount.id}/funnels`,
                subAccount: subAccount,
                subAccountId: subAccount.id
              },
              {
                name: 'Media',
                icon: Icon.database,
                link: `/subaccount/${subAccount.id}/media`,
                subAccount: subAccount,
                subAccountId: subAccount.id
              },
              {
                name: 'Automations',
                icon: Icon.chip,
                link: `/subaccount/${subAccount.id}/automations`,
                subAccount: subAccount,
                subAccountId: subAccount.id
              },
              {
                name: 'Pipelines',
                icon: Icon.flag,
                link: `/subaccount/${subAccount.id}/pipelines`,
                subAccount: subAccount,
                subAccountId: subAccount.id
              },
              {
                name: 'Contacts',
                icon: Icon.person,
                link: `/subaccount/${subAccount.id}/contacts`,
                subAccount: subAccount,
                subAccountId: subAccount.id
              },
              {
                name: 'Dashboard',
                icon: Icon.category,
                link: `/subaccount/${subAccount.id}`,
                subAccount: subAccount,
                subAccountId: subAccount.id
              },
        ];

        const createdSideBar = [];

        for (const option of sideBarArr) {
            const sidebar = await createSubAccountSideBar(option);
            createdSideBar.push(sidebar);
        }

        if (createdSideBar.length === sideBarArr.length) {
            return res.status(200).json({ message: "Sub account and sidebar options created successfully", data: subAccount });
        } else {
            return res.status(400).json({message: "not all side bar option were created", data: subAccount})
        }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({message: "Internal server error"});
  }

}


export const get_all_subaccount = async (req: Request, res: Response) => {
    const subaccount = await getAllSubAcccount();
    return res.status(200).json({message: "Request successful", data: subaccount});
}

export const get_one_subaccount = async (req: Request, res: Response) => {
    const subAccountId = req.params.Id;
    if (!subAccountId) return res.status(400).json({message: "ID required"})
    const subAccount = await getOneSubAccount(subAccountId);

    if (!subAccount) {
        return res.status(404).json({ message: "Sub Account not found" });
    }

    return res.status(200).json({message: "request successful", data: subAccount});
}

export const update_subaccount = async (req: Request, res: Response) => {
    const subAccountId = req.params.Id;
    const dataBody:SubAccountPartial = req.body;
    const {id} = req.user;

    if (!subAccountId) {
        return res.status(400).json({ message: "Sub Account ID is required" });
    };

    const userExist = await get_one_user(id);

    if (!userExist) {
        return res.status(404).json({ message: "User not found" });
    }

    try {
        const updateAccount = await updateSubAccount(subAccountId, dataBody);
        return res.status(200).json({message: "Request successful", data: updateAccount});
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "Internal server error"})
    }
}

export const delete_subaccount = async (req: Request, res: Response) => {
    const subAccountId = req.params.Id;
    if (!subAccountId) return res.status(400).json({message: "ID required"})

    try {
        const del = await deleteSubAccount(subAccountId);
        return res.status(200).json({message: "Request successful"})
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "Internal server error"})
    }
}

