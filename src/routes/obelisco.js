import { Router } from 'express';
import { normalizarController } from '../controllers/normalizarController';

const router = Router();

router.get('/', normalizarController.obelisco);

export default router;