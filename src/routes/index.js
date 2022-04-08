import { Router } from "express";
import normalizar from './normalizar';
import obelisco from './obelisco';
import moneda from './moneda';

const router = Router();

router.use('/normalizar', normalizar);
router.use('/obelisco', obelisco);
router.use('/moneda', moneda);


export default router;