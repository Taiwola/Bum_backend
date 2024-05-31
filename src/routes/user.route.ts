import { Router } from 'express';
import { createUser, getAllUsers, getOneUser, getOneByEmail, updateUser, deleteUser } from '../controller';

const router = Router();

router.get('/', getAllUsers);
router.get('/:id', getOneUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export {router as userRouter};
