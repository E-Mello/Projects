import { categoriesRoutes } from './routes/categories.routes';
// import { createCourse } from './routes';
import express from 'express';
import { specificationsRoutes } from './routes/specifications.routes';

/**
 * A const app recebe o express, que é uma função que retorna um objeto do tipo express. Que faz a aplicação rodar.
 */
const app = express();

/**
 * O express.json() é um middleware que faz com que o express entenda o formato json.
 */
app.use(express.json());

/**
 * O método use() é um middleware que recebe uma rota e um callback.
 */
app.use('/categories', categoriesRoutes);
app.use('/specifications', specificationsRoutes);

/**
 * O método listen() é um método que faz com que a aplicação fique escutando uma porta.
 */
app.listen(3000, () => console.log('Server is running'));
