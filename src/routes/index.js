import { Router } from "express";
import normalizar from './normalizar';

const router = Router();

router.use('/normalizar', normalizar);

export default router;