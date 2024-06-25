import { Router } from 'express';
import {
    createPermission,
    updatePermission,
    getAllPermission,
    getOnePermission,
    deletePermission,
    getAllUserPermission
} from '../controller';
import { authentication } from '../middleware/authentication';

const router = Router();

// Route to create a new permission
router.post('/',authentication ,createPermission);

// Route to update an existing permission
router.patch('/:id',authentication, updatePermission);

// Route to get all permissions
router.get('/',authentication, getAllPermission);

// Route to get a single permission by ID
router.get('/:id',authentication, getOnePermission);

router.get('/user/:Id', authentication, getAllUserPermission);

// Route to delete a permission by ID
router.delete('/:id',authentication, deletePermission);

export {router as permissionRoute};
