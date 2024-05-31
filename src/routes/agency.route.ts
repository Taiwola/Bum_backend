import express from "express";

const router = express.Router();

import {create_agency, get_all_agency, delete_agency, update_agency, get_one_agency} from "../controller";
import { authentication } from "../middleware/authentication";


router.get('/', authentication, get_all_agency);
router.get('/:Id', authentication, get_one_agency);
router.post('/', authentication, create_agency);
router.patch('/:Id', authentication, update_agency);
router.delete('/:Id', authentication, delete_agency);




export {router as agencyRoute}