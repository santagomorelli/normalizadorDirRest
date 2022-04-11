import { Router } from 'express';
import { monedaController } from '../controllers/monedaController';

const router = Router();

router.post('/', monedaController.get);

export default router;