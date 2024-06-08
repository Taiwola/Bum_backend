import {connectionSource} from "../database/database-source";
import {SubAccountSidebarOption} from "../database/entities/user.model";
import { PartialSubAcccountSidebarOption, SubaccountSidebarOptionInterface } from "../interfaces/subaccountSidebar.interface";


const subAccountSidebarRepo = connectionSource.getRepository(SubAccountSidebarOption);


export const createSubAccountSideBar = async (sideBarData: SubaccountSidebarOptionInterface) => {
    const sidebar = subAccountSidebarRepo.create({
        ...sideBarData
    });

    await subAccountSidebarRepo.save(sidebar);
    return sidebar
};


export const updateSubAccountSidebar = async (subAccountSidebarId: string, sideBarData:PartialSubAcccountSidebarOption) => {
    const sidebar = await subAccountSidebarRepo.update(subAccountSidebarId, {...sideBarData});

    return sidebar
};


export const getAllSubAccountSidebar = async () => {
    const sidebars = await subAccountSidebarRepo.find();
    return sidebars;
}

export const getOneSubAccountSideBar = async (subAccountSidebarId: string) => {
    const sidebar = await subAccountSidebarRepo.findOne({
        where: {id: subAccountSidebarId}
    })
    return sidebar
};


export const deleteSubAccountSidebar = async (subAccountSidebarId: string) => {
    const sidebar = await subAccountSidebarRepo.delete(subAccountSidebarId);
    return sidebar;
}