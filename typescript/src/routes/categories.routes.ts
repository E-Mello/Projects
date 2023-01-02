/**
 * CategoriesRepository é o repositório que eu criei para fazer a comunicação com o banco de dados
 */
import { CategoriesRepository } from '../repositories/CategoriesRepository';
/**
 * O "Router" é uma função que retorna um objeto, e esse objeto tem várias funções que são as rotas.
 */
import { Router } from 'express';

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
 * do segundo parâmetro.
 */
categoriesRoutes.post('/', (req, res) => {
    /**
     * Aqui estou definindo o que vou receber do corpo da requisição
     */
    const { name, description } = req.body;

    /**
     * Aqui estou chamando o método "create" do meu repositório, e passando o "name" e "description" que eu recebi do corpo da requisição.
     */
    categoriesRepository.create({ name, description });

    /**
     * Aqui estou retornando uma resposta para o usuário, e estou dizendo que a resposta foi um sucesso, e que não tem conteúdo,
     * pois o que eu quero é que ele apenas saiba que a requisição foi bem sucedida e a função send() é para retornar uma resposta vazia, pois
     * não vamos deixar a função create com a responsabilidade de retornar uma resposta para o usuário.
     */
    return res.status(201).send();
});

/**
 * Aqui estou dizendo que quando eu receber uma requisição do tipo "get" na rota "/categories", eu quero que ele execute a função que está dentro
 * ou seja, que ele liste todas as categorias.
 */
categoriesRoutes.get('/', (req, res) => {
    const all = categoriesRepository.list();

    return res.json(all);
});

export { categoriesRoutes };
