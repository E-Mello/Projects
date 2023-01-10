import { Router } from 'express';
import { createCategoryController } from '../modules/cars/useCases/createCategory';
import { importCategoryController } from '../modules/cars/useCases/importCategory';
import { listCategoriesController } from '../modules/cars/useCases/listCategories';
import multer from 'multer';

/**
 * Aqui estou criando uma instância do meu repositório, para que eu possa utilizar ele em todas as rotas.
 */
const categoriesRoutes = Router();

/**
 * const upload é uma instância do multer, que é um middleware que vai me ajudar a lidar com arquivos.
 * O método "dest" é o método que eu vou utilizar para dizer onde eu quero que o arquivo seja salvo.
 */
const upload = multer({
    dest: './tmp',
});

/**
 * Aqui estou dizendo que quando eu receber uma requisição do tipo "post" na rota "/categories", eu quero que ele execute a função que está dentro
 */
categoriesRoutes.post('/', (request, response) => {
    console.log("Reload it's working!");

    return createCategoryController.handle(request, response);
});

/**
 * Aqui estou dizendo que quando eu receber uma requisição do tipo "get" na rota "/categories", eu quero que ele execute a função que está dentro
 * ou seja, que ele liste todas as categorias.
 */
categoriesRoutes.get('/', (request, response) => {
    return listCategoriesController.handle(request, response);
});

/**
 * Aqui estou dizendo que quando eu receber uma requisição do tipo "post" na rota "/categories/import", eu quero que ele execute a função que está dentro
 * e que ele receba um arquivo.
 * O método "upload.single" é o método que eu vou utilizar para dizer que eu quero receber um único arquivo.
 * O parâmetro "file" é o nome do arquivo que eu vou receber.
 * O método "console.log(file)" é o método que eu vou utilizar para mostrar no console o arquivo que eu recebi.
 * O método "return response.send()" é o método que eu vou utilizar para retornar uma resposta para o usuário.
 */
categoriesRoutes.post('/import', upload.single('file'), (request, response) => {
    return importCategoryController.handle(request, response);
});

export { categoriesRoutes };
