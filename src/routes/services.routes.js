import express from 'express';
import { ServicesController } from '../controllers/services.controller.js';

export default () => {
    const router = express.Router();
    router.get('/services', ServicesController.getAll);
    return router;
}