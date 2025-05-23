const express = require('express');

module.exports = (db) => {
  const router = express.Router();

  // Rota raiz
  router.get('/', (req, res) => {
    res.send('API funcionando com Firebase Admin!!!');
  });

  // Rota: GET /users
  router.get('/users', async (req, res) => {
    try {
      const snapshot = await db.collection('users').get();
      const users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      res.send(users);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });


  return router;
};
