import express from 'express';
import usersRoutes from './users.routes.js';
import servicesRoutes from './services.routes.js';




export default () => {
  const router = express.Router();
  router.get('/', (req, res) => {
    res.send('Cors Updated');
  });

  router.use(usersRoutes());
  router.use(servicesRoutes());


  return router;
};
