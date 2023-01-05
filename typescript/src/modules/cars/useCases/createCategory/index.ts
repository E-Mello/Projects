import { CategoriesRepository } from '../../repositories/CategoriesRepository';
import { CreateCategoryController } from './CreateCategoryController';
import { CreateCategoryUseCase } from './CreateCategoryUseCase';

/**
 * Aqui estou criando uma instância do meu repositório, para que eu possa utilizar ele em todas as rotas.
 */
const categoriesRepository = new CategoriesRepository();
/**
 * Aqui estou criando uma instância do meu useCase, para que eu possa utilizar ele em todas as rotas.
 */
const createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository);
/**
 * Aqui estou criando uma instância do meu controller, para que eu possa utilizar ele em todas as rotas.
 */
const createCategoryController = new CreateCategoryController(
    createCategoryUseCase
);

/**
 * Aqui estou exportando o meu controller, para que eu possa utilizar ele em todas as rotas.
 */
export { createCategoryController };
