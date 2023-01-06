import { Router } from 'express';
import { categoriesRoutes } from './categories.routes';
import { specificationsRoutes } from './specifications.routes';

/**
 * router é uma const que recebe o Router() que é uma função que retorna um objeto do tipo Router.
 */
const router = Router();

/**
 * routes.use é um método que recebe uma rota e um callback.
 */
router.use('/categories', categoriesRoutes);
router.use('/specifications', specificationsRoutes);

export { router };
