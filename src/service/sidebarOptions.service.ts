import { connectionSource } from "../database/database-source";
import { AgencySidebarOption } from "../database/entities/user.model";
import { AgencySidebarOptionInterface, PartialAgencySidebarOption } from "../interfaces/agencySidebarInterface";

const sidebarOptionRepo = connectionSource.getRepository(AgencySidebarOption);


export const createSideBar = async (sideBarData: AgencySidebarOptionInterface) => {
    const sidebar  = sidebarOptionRepo.create({
        ...sideBarData,
        createdAt: Date.now(),
        updatedAt: Date.now()
    });

    await sidebarOptionRepo.save(sidebar);

    return sidebar;
};

export const updateSidebar = async (sidebarId: string ,sidebarData: PartialAgencySidebarOption) => {
    const sidebar = await sidebarOptionRepo.update(sidebarId, {...sidebarData});
    return sidebar;
}


export const getAllSideBar = async (agencyId: string) => {
    const sidebars = await sidebarOptionRepo.find({
        where: {agencyId: agencyId}
    });

    return sidebars;
};


export const getOneSidebar = async (sidebarId:string) => {
    const sidebar = await sidebarOptionRepo.findOne({where: {id: sidebarId}, relations: ['agency']});
    return sidebar;
};

export const deleteSidebar = async (sidebarId:string) => {
    const sidebar = await sidebarOptionRepo.delete(sidebarId);
    return sidebar;
}