// routes/UserRoutes.js
import { Router } from 'express';
import * as UserController from '../controllers/userController.js';

const router = Router();

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/', UserController.getUserList);
router.get('/:id', UserController.getUser);
router.put('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);

export default router;
