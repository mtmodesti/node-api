import express from 'express';
import { ServicesController } from '../controllers/services.controller.js';

export default () => {
    const router = express.Router();
    router.get('/services', ServicesController.getAll);
    router.post('/services/:id', ServicesController.addService);
    return router;
}