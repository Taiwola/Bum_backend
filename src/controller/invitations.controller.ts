import { Request, Response } from 'express';
import { createInvitation, updateInvitation, verifyIfUserHasInvitation, getOneInvitation, getByAgency, getAgencyById } from '../service';
import { RoleEnum } from '../enum/data.enum';

// Create a new invitation
export const createInvitationController = async (req: Request, res: Response) => {
  const { email, agencyId, role } = req.body;

  if (!email || !agencyId || !role) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const agency = await getAgencyById(agencyId);

  if (!agency) {
    return res.status(404).json({ message: 'agency not found' });
  }

  try {
    const invitation = await createInvitation(email, agency, agencyId, role);
    return res.status(201).json({message:"Request successful", data:invitation});
  } catch (error) {
    return res.status(500).json({ message: 'Error creating invitation', error });
  }
};

// Update invitation status
export const updateInvitationController = async (req: Request, res: Response) => {
  const { Id } = req.params;

  try {
    const updatedInvitation = await updateInvitation(Id);
    return res.status(200).json({message: "Request successful" ,data:updatedInvitation});
  } catch (error) {
    return res.status(500).json({ message: 'Error updating invitation', error });
  }
};

// Verify if a user has an invitation
export const verifyUserInvitationController = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const invitation = await verifyIfUserHasInvitation(email);
    if (invitation) {
      return res.status(200).json({message:"Request successful", data:invitation});
    } else {
      return res.status(404).json({ message: 'Invitation not found' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error verifying invitation', error });
  }
};

// Get a specific invitation by ID
export const getOneInvitationController = async (req: Request, res: Response) => {
  const { Id } = req.params;

  try {
    const invitation = await getOneInvitation(Id);
    if (invitation) {
      return res.status(200).json(invitation);
    } else {
      return res.status(404).json({ message: 'Invitation not found' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error retrieving invitation', error });
  }
};

// Get all invitations for a specific agency
export const getInvitationsByAgencyController = async (req: Request, res: Response) => {
  const { agencyId } = req.body;

  try {
    const invitations = await getByAgency(agencyId);
    return res.status(200).json({message:"Request successfull", data:invitations});
  } catch (error) {
    return res.status(500).json({ message: 'Error retrieving invitations', error });
  }
};
