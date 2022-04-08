import { Router } from 'express';
import { monedaController } from '../controllers/monedaController';

const router = Router();

router.get('/', monedaController.get);

export default router;