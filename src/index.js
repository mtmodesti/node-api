import 'dotenv/config';
import express from 'express';
import routes from './routes/routes.js';
import cors from 'cors';


const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(routes());
app.listen(port, () => {
  console.log(`✅ Servidor rodando na porta ${port}`);
});
