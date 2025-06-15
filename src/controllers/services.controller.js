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


}