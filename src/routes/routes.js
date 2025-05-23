// routes/routes.js
import express from 'express';
import usersRoutes from './users.routes.js';

export default () => {
  const router = express.Router();
  router.get('/', () => {
    res.send('Crud Users');
  });

  router.use(usersRoutes());

  return router;
};
