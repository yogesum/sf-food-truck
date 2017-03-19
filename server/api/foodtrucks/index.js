import express from 'express';
import controller from './foodtrucks.controller';

const router = express.Router();

router.get('/', controller.index);

export default router;
