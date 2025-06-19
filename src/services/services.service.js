import { db } from '../config/firebase.config.js';
import { FieldValue } from 'firebase-admin/firestore';
import { v4 as uuidv4 } from 'uuid';

export class ServicesService {

    static async getAll() {
        const snapshot = await db.collection('services').get();
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    }

    static async addService(userId, category, description, categoryId) {
        const userRef = db.collection('users').doc(userId);
        const newJob = {
            categoryId,
            description,
            category,
            id: uuidv4(),
            createdAt: new Date().toISOString()
        };
        await userRef.update({
            jobsOffered: FieldValue.arrayUnion(newJob)
        });
        return newJob;
    }
}
