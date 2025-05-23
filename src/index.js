require('dotenv').config();
const express = require('express');
const admin = require('firebase-admin');
const routes = require('./routes/routes');

const app = express();
const port = process.env.PORT || 3000;

// Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  }),
});

const db = admin.firestore();
app.use(express.json());

app.use(routes(db));

// Inicia o servidor
app.listen(port, () => {
  console.log(`✅ Servidor rodando na porta ${port}`);
});
