import { db } from '../config/firebase.config.js'; // Importa o db já inicializado


export class UsersService {
    static async getAll() {
        const snapshot = await db.collection('users').get();
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }

    static async getById(id) {
        const doc = await db.collection('users').doc(id).get();
        if (!doc.exists) throw new Error('User not found');
        return { id: doc.id, ...doc.data() };
    }

    static async create(data) {
        const ref = await db.collection('users').add(data);
        const newUser = await ref.get();
        return { id: newUser.id, ...newUser.data() };
    }

    static async update(id, data) {
        await db.collection('users').doc(id).update(data);
        const updatedDoc = await db.collection('users').doc(id).get();
        return { id: updatedDoc.id, ...updatedDoc.data() };
    }

    static async delete(id) {
        await db.collection('users').doc(id).delete();
    }
}
