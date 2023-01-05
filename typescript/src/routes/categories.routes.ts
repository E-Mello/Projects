/**
 * CategoriesRepository é o repositório que eu criei para fazer a comunicação com o banco de dados
 */
import { CategoriesRepository } from '../modules/cars/repositories/CategoriesRepository';
/**
 * O "Router" é uma função que retorna um objeto, e esse objeto tem várias funções que são as rotas.
 */
import { Router } from 'express';
import { createCategoryController } from '../modules/cars/useCases/createCategory';
import { listCategoriesController } from '../modules/cars/useCases/listCategories';

/**
 * Aqui estou criando uma instância do meu repositório, para que eu possa utilizar ele em todas as rotas.
 */
const categoriesRoutes = Router();
/**
 * categoriesRepository é uma instância do meu repositório, que eu criei para fazer a comunicação com o banco de dados.
 * dessa forma, no momento que eu chamar o método "create" do meu repositório, ele vai criar uma nova categoria no banco de dados.
 */
const categoriesRepository = new CategoriesRepository();

/**
 * Aqui estou dizendo que quando eu receber uma requisição do tipo "post" na rota "/categories", eu quero que ele execute a função que está dentro
 */
categoriesRoutes.post('/', (request, response) => {
    return createCategoryController.handle(request, response);
});

/**
 * Aqui estou dizendo que quando eu receber uma requisição do tipo "get" na rota "/categories", eu quero que ele execute a função que está dentro
 * ou seja, que ele liste todas as categorias.
 */
categoriesRoutes.get('/', (request, response) => {
    return listCategoriesController.handle(request, response);
});

export { categoriesRoutes };
