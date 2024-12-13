import { Router } from 'express';
import { container } from 'tsyringe';
import { AuthController } from '../../controllers/AuthController';

const router = Router();

// Resolve controller lazily when route is hit
router.post('/register', (req, res, next) => {
    const authController = container.resolve(AuthController);
    try {
        return authController.register(req, res);
      } catch (err) {
        next(err);
      }
});

router.post('/signin', (req, res, next) => {
    const authController = container.resolve(AuthController);
    try {
        return authController.signIn(req, res);
    } catch  (err) {
        next(err);
    }
});
    
export default router;