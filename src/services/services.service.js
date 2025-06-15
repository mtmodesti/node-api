import { db } from '../config/firebase.config.js';


export class ServicesService {

    static async getAll() {
        const snapshot = await db.collection('services').get();
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    }

}