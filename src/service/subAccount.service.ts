import { DeleteResult, UpdateResult } from "typeorm";
import {connectionSource} from "../database/database-source";
import {SubAccount} from "../database/entities/user.model";
import { ISubAccount, SubAccountPartial } from "../interfaces/subAccount.interface";


const subaccountRepo = connectionSource.getRepository(SubAccount);


export const createSubAccount = async (subAccountData: ISubAccount): Promise<SubAccount> => {
    const subAccount = subaccountRepo.create({
        ...subAccountData
    });

    await subaccountRepo.save(subAccount);
    return subAccount;
}


export const updateSubAccount = async (subAccountId: string, updateSubAccountData: SubAccountPartial):Promise<UpdateResult> => {
    const subAccount = await subaccountRepo.update(subAccountId, {
        ...updateSubAccountData
    });

    return subAccount;
};

export const getAllSubAcccount = async (): Promise<SubAccount[]> => {
    const subAccounts = await subaccountRepo.find({
        relations: ["agency", "sidebarOptions", "permissions", "funnels","media","contacts","triggers", "automations", "pipelines", "tags", "notifications", "tickets", 'permissions.subAccount']
    });
    return subAccounts;
}

export const getOneSubAccount = async (subAccountId: string): Promise<SubAccount> => {
    const subAccount = await subaccountRepo.findOne({
        where: {
            id: subAccountId
        },
        relations: ["agency", "sidebarOptions", "permissions", "funnels","media","contacts","triggers", "automations", "pipelines", "tags", "notifications", "tickets", 'permissions.subAccount']
    });
    return subAccount;
};

export const getSubAccountByName = async (subAccountName: string) => {
    const subAccount = await subaccountRepo.findOne({
        where: {
            name: subAccountName
        },
        relations: ["agency", "sidebarOptions", "permissions", "funnels","media","contacts","triggers", "automations", "pipelines", "tags", "notifications", "tickets"]
    });

    return subAccount;
}

export const deleteSubAccount = async (subAccountId:string): Promise<DeleteResult> => {
    const subAccount = await subaccountRepo.delete(subAccountId);
    return subAccount;
}

