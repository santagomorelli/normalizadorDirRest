import { Router } from 'express';
import { normalizarController } from '../controllers/normalizarController';

const router = Router();

router.post('/', normalizarController.get);

export default router;