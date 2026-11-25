import { Router } from 'express';
import { validate } from '../middleware/validate';
import { requireAuth } from '../middleware/auth';
import { registerSchema, loginSchema } from '../validators/auth.validators';
import * as controller from '../controllers/auth.controller';

const router = Router();

router.post('/register', validate(registerSchema), controller.register);
router.post('/login', validate(loginSchema), controller.login);
router.get('/me', requireAuth, controller.me);

export default router;