const express = require('express');
const app = express();
const port = 3000;

app.use(express.json()); // Permite receber JSON no body

app.get('/', (req, res) => {
  res.send('API funcionando!');
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
