import { db } from '../config/firebase.config.js';


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
        const existingUserSnapshot = await db.collection('users')
            .where('email', '==', data.email)
            .limit(1)
            .get();

        if (!existingUserSnapshot.empty) {
            throw new Error('E-mail already exists');
        }
        data['createdAt'] = new Date()
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

    static async getByEmail(body) {
        const snapshot = await db.collection('users')
            .where('email', '==', body.email)
            .limit(1)
            .get();

        if (snapshot.empty) {
            // Nenhum usuário com esse e-mail
            throw new Error('Invalid credentials');
        }

        const doc = snapshot.docs[0];
        const user = doc.data();

        // Verifica a senha
        if (user.password !== body.password) {
            throw new Error('Invalid credentials');
        }

        // Tudo certo: retorna usuário (sem a senha)
        const { password, ...userWithoutPassword } = user;
        return { id: doc.id, ...userWithoutPassword };
    }

    static async getProviders({ limit = 20, page = 1 }) {
    // Conversão para número (caso venham como string)
    limit = parseInt(limit);
    page = parseInt(page);

    const offset = (page - 1) * limit;

    const snapshot = await db.collection('users')
        .where('role', '==', 'provider')
        .orderBy('createdAt', 'desc') // necessário para usar offset
        .offset(offset)
        .limit(limit)
        .get();

    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}



}
