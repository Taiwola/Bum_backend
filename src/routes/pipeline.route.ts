import express from "express";
import { authentication } from "../middleware/authentication";
import { createPipeline, deletePipeline, getAllPipelines, getAllPipelinesWhereSubAccountId, getOnePipeline, updatePipeline } from "../controller";

const router = express.Router();


router.get('/', authentication, getAllPipelines);
router.get('/:Id', authentication, getOnePipeline);
router.get('/subaccount/:Id', authentication, getAllPipelinesWhereSubAccountId);

router.post('/', authentication, createPipeline);

router.patch('/:Id', authentication, updatePipeline);

router.delete('/:Id', authentication, deletePipeline);



export {router as pipelineRouter}