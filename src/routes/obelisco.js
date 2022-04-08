import { Router, request, response, next } from 'express';
import { normalizarDir } from '../controllers/normalizarDir';

const router = Router();

router.get('/', normalizarDir.obelisco);

export default router;