import { Router } from 'express';
import { AuthController } from './controllers/AuthController';
import UserController from './controllers/UserControler';

const authController = new AuthController();
const userController = new UserController();

export const router = Router();

router.post('/login', authController.authUser);
router.get('/users', authController.verifyAdminPrivileges, userController.getUsers);
router.post('/users', authController.verifyAdminPrivileges, userController.createUser);