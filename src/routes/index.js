import { Router } from "express";
import normalizar from './normalizar';
//import obelisco from './obelisco';

const router = Router();

router.use('/normalizar', normalizar);
//router.use('/obelisco', obelisco)


export default router;