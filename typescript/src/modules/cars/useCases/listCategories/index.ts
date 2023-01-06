import { CategoriesRepository } from '../../repositories/implementations/CategoriesRepository';
import { ListCategoriesController } from './ListCategoriesController';
import { ListCategoriesUseCase } from './ListCategoriesUseCase';

/**
 * Aqui estou criando uma variável chamada "categoriesRepository", que vai ser um repositório de categoria, e que vai receber o repositório de categoria.
 * O "getInstance" é um método estático, e o "CategoriesRepository" é o tipo de retorno do método.
 */
const categoriesRepository = CategoriesRepository.getInstance();
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
