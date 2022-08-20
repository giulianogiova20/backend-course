import { Router } from 'express';
import renderInfo from '../controllers/info';

const router: Router = Router();

router.get('/', renderInfo);

export default router