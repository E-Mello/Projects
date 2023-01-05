import { Request, Response } from 'express';

import { ListCategoriesUseCase } from './ListCategoriesUseCase';

/**
 * Aqui estou criando uma classe chamada "ListCategoriesController", que vai ser responsável por listar as categorias.
 */
class ListCategoriesController {
    /**
     *
     * @param listCategoriesUseCase  Aqui estou dizendo que a variável "listCategoriesUseCase" é um useCase de listar categorias, e que esse useCase vai começar vazio.
     */
    constructor(private listCategoriesUseCase: ListCategoriesUseCase) {}
    handle(request: Request, response: Response): Response {
        /**
         * Aqui estou chamando o método execute do meu useCase, e estou passando os dados que eu quero criar.
         */
        const all = this.listCategoriesUseCase.execute();

        /**
         * Aqui estou retornando uma resposta para o usuário, e estou dizendo que a resposta foi um sucesso, e que tem conteúdo,
         */
        return response.json(all);
    }
}

export { ListCategoriesController };
