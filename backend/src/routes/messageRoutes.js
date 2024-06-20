import { addMessage,getAllMessage } from "../controllers/messageController.js";
import { Router } from "express";
const msgrouter=Router();

msgrouter.post("/addmsg",addMessage)
msgrouter.post("/getmsg/",getAllMessage)

export default msgrouter