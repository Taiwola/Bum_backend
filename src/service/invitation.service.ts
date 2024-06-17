import { connectionSource } from "../database/database-source";
import { Agency, Invitation } from "../database/entities/user.model";
import { InvitationStatus, RoleEnum } from "../enum/data.enum";


const invitationRepo = connectionSource.getRepository(Invitation);


export const createInvitation = async (email: string, agency: Agency, agencyId:string , role: RoleEnum) => {
    const invitation = invitationRepo.create({
        agency: agency,
        agencyId: agencyId,
        email: email,
        role: role,
        status: InvitationStatus.PENDING,
    });

    await invitationRepo.save(invitation);

    return invitation;
}

export const updateInvitation = async (invitationId: string) => {
    const invitations = await invitationRepo.update(invitationId, { status: InvitationStatus.ACCEPTED });
    return invitations
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
