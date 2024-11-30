import { Router } from 'express';
import { container } from 'tsyringe';
import { AuthController } from '../../controllers/AuthController';

const router = Router();

// Resolve controller lazily when route is hit
router.post('/register', (req, res) => {
    const authController = container.resolve(AuthController);
    return authController.register(req, res);
});
router.post('/signin', (req, res) => {
    const authController = container.resolve(AuthController);
    return authController.signIn(req, res);
});
    

export default router;