import { ServicesService } from "../services/services.service.js";

export class ServicesController {

    static async getAll(req, res) {
        try {
            const services = await ServicesService.getAll();
            res.send(services)
        } catch (err) {
            res.status(500).send(err.message)
        }
    }

    static async addService(req, res) {
        try {
            const userId = req.params.id;
            const { category, description, categoryId } = req.body;
            const result = await ServicesService.addService(userId, category, description, categoryId);
            res.status(201).send(result);
        } catch (err) {
            res.status(500).send(err.message);
        }
    }
}