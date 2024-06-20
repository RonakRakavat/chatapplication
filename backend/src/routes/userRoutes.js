import { Router } from 'express';
import { login, register,setavatar,getAllUser } from '../controllers/userController.js'; 

const router = Router();
router.post('/register', register);
router.post('/login', login);
router.post("/setavatar/:id",setavatar)
router.get("/alluser/:id",getAllUser)


export default router;
