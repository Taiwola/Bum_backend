import { connectionSource } from "../database/database-source";
import { Agency, Invitation } from "../database/entities/user.model";


const invitationRepo = connectionSource.getRepository(Invitation);


export const createInvitation = async (email: string, agency: Agency, agencyId: string) => {
    const invitation = invitationRepo.create({
        agency: agency,
        agencyId: agencyId,
        email: email,
        createdAt: Date.now(),
        updatedAt: Date.now()
    });

    await invitationRepo.save(invitation);

    return invitation;
}

export const verifyIfUserHasInvitation = async (email: string) => {
    const user = await invitationRepo.findOne({
        where: {email: email}
    });
    return user;
};

export const getOneInvitation = async (inviteId:string) => {
    const invite = await invitationRepo.findBy({id: inviteId});
    return invite;
}

export const getByAgency = async (agencyId:string) => {
    const invites = await invitationRepo.find({where: {agencyId: agencyId}});
    return invites;
}
