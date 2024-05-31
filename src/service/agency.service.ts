import { connectionSource } from "../database/database-source";
import { Agency } from "../database/entities/user.model";
import { AgencyInterface, AgencyInterfacePartials } from "../interfaces/agency.interface";

const agencyRepo = connectionSource.getRepository(Agency);

export const createAgency = async (agencyData: AgencyInterface) => {
    const agency = agencyRepo.create({
        ...agencyData
    });

    await agencyRepo.save(agency);
    return agency;
}

export const getAllAgency = async () => {
    return await agencyRepo.find({
        relations: ['users', 'subAccounts', 'sidebarOptions', 'invitations', 'notifications', 'subscription', 'addOns']
    });
};

export const getAgencyById = async (agencyId: string) => {
    const agency = await agencyRepo.findOne({where: {id: agencyId}, relations:  ['users', 'subAccounts', 'sidebarOptions', 'invitations', 'notifications', 'subscription', 'addOns']});

    return agency;
};


export const getAgencyByName = async (name: string) => {
        const agency = await agencyRepo.findOne({where: {name: name}, relations:  ['users', 'subAccounts', 'sidebarOptions', 'invitations', 'notifications', 'subscription', 'addOns']});
        return agency;
}

export const updateAgency = async (agencyId: string, agencyData: AgencyInterfacePartials) => {
        const agency = await agencyRepo.update(agencyId, {...agencyData});
        return agency;
}

export const deleteAgency = async (agencyId: string) => {
    const agency = await agencyRepo.delete(agencyId);
    return agency;
}

