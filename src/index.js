require('dotenv').config();
const express = require('express');
const admin = require('firebase-admin');

const app = express();
const port = process.env.PORT || 3000;

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  }),
});

const db = admin.firestore();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('API funcionando com Firebase Admin!!!');
});

app.get('/users', async (req, res) => {
  try {
    const snapshot = await db.collection('users').get();
    const users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(users);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

async function startServer() {
  try {
    const snapshot = await db.collection('users').get();
    const users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    app.listen(port, () => {
      console.log(`API rodando na porta ${port}`);
      console.log('Lista de usuários:', users);
    });
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
  }
}

startServer();
