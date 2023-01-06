import express from 'express';
import { router } from './routes';

/**
 * A const app recebe o express, que é uma função que retorna um objeto do tipo express. Que faz a aplicação rodar.
 */
const app = express();

/**
 * O express.json() é um middleware que faz com que o express entenda o formato json.
 */
app.use(express.json());

app.use(router);

/**
 * O método listen() é um método que faz com que a aplicação fique escutando uma porta.
 */
app.listen(3000, () => console.log('Server is running'));
