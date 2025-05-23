import { UsersService } from '../services/users.service.js';


export class UsersController {
    static async getAll(req, res) {
        try {
            const users = await UsersService.getAll();
            res.send(users);
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    static async getById(req, res) {
        try {
            const user = await UsersService.getById(req.params.id);
            res.send(user);
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    static async create(req, res) {
        try {
            const newUser = await UsersService.create(req.body);
            res.status(201).send(newUser);
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    static async update(req, res) {
        try {
            const updatedUser = await UsersService.update(req.params.id, req.body);
            res.send(updatedUser);
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    static async delete(req, res) {
        try {
            await UsersService.delete(req.params.id);
            res.send({ message: 'User deleted' });
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
}
