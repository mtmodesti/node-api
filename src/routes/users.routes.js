import express from 'express';
import { UsersController } from '../controllers/users.controller.js';

export default () => {
    const router = express.Router();

    router.get('/users/providers', UsersController.getProviders);
    router.post('/users/email', UsersController.getByEmail);
    router.get('/users', UsersController.getAll);
    router.post('/users', UsersController.create);
    router.get('/users/:id', UsersController.getById);
    router.put('/users/:id', UsersController.update);
    router.delete('/users/:id', UsersController.delete);
    return router;
};
