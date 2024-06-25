import express from "express";
import { authentication } from "../middleware/authentication";
import { createTicket, deleteTicket, getAllTicket, getAllTicketWhereLaneId, getAllTicketsWherePipelineId, getOneTicket, updateTicket } from "../controller";

const router = express.Router();


router.get('/', authentication, getAllTicket);
router.get('/:Id', authentication, getOneTicket);
router.get('/lane/:Id', authentication, getAllTicketWhereLaneId);
router.get('/lane/pipeline/:Id', authentication, getAllTicketsWherePipelineId);

router.post('/', authentication, createTicket);
router.patch('/:Id', authentication, updateTicket);
router.delete('/:Id', authentication, deleteTicket);



export {router as ticketRouter}