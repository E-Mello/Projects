import { CategoriesRepository } from '../../repositories/CategoriesRepository';
import { ListCategoriesController } from './ListCategoriesController';
import { ListCategoriesUseCase } from './ListCategoriesUseCase';

/**
 * Aqui estou criando uma variável chamada "categoriesRepository", que vai ser um repositório de categoria.
 */
const categoriesRepository = new CategoriesRepository();
/**
 * Aqui estou criando uma variável chamada "listCategoriesUseCase", que vai ser um useCase de listar categorias, e que vai receber o repositório de categoria.
 */
const listCategoriesUseCase = new ListCategoriesUseCase(categoriesRepository);
/**
 * Aqui estou criando uma variável chamada "listCategoriesController", que vai ser um controller de listar categorias, e que vai receber o useCase de listar categorias.
 */
const listCategoriesController = new ListCategoriesController(
    listCategoriesUseCase
);

/**
 * Aqui estou exportando a variável "listCategoriesController".
 */
export { listCategoriesController };
