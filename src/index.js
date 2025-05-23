import 'dotenv/config'; // ES Modules aceita isso direto
import express from 'express';
import routes from './routes/routes.js'; // Use a extensão `.js` obrigatoriamente

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(routes());
app.listen(port, () => {
  console.log(`✅ Servidor rodando na porta ${port}`);
});
