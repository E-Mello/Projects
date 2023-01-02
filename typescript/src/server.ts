import { categoriesRoutes } from './routes/categories.routes';
// import { createCourse } from './routes';
import express from 'express';

const app = express();

app.use(express.json());

app.use('/categories', categoriesRoutes);

app.listen(3000, () => console.log('Server is running'));
