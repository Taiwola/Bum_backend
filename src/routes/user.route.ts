import { Router } from 'express';
import { getAllUsers, getOneUser, updateUser, deleteUser, getTeamMembers, getSubAccTeamMembers } from '../controller';
import { authentication } from '../middleware/authentication';

const router = Router();

router.get('/', getAllUsers);
router.get('/:id', getOneUser);
router.get("/team/:Id", authentication, getTeamMembers);
router.get("/team/subaccount/:Id", authentication, getSubAccTeamMembers);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);

export {router as userRouter};
