import express from "express";
import { createLanes, deleteLane, getAllLanes, getAllLanesWherePipelineId, getOneLane, updateLanes } from "../controller";
import { authentication } from "../middleware/authentication";

const router = express.Router();

router.get('/', authentication, getAllLanes);
router.get('/:Id', authentication, getOneLane);
router.get('/pipeline/:Id', authentication, getAllLanesWherePipelineId);

router.post('/',authentication,createLanes);
router.patch('/:Id', authentication, updateLanes);
router.delete('/:Id', authentication, deleteLane);



export {router as lanesRouter};