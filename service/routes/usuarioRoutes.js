// routes/usuarioRoutes.js
import { Router } from 'express';
import UsuarioController from '../controllers/usuarioController.js';

const router = Router();

router.post('/register', UsuarioController.register);
router.post('/login', UsuarioController.login);
router.get('/:id', UsuarioController.getUser);
router.put('/:id', UsuarioController.updateUser);
router.delete('/:id', UsuarioController.deleteUser);

export default router;
