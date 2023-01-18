import { Request, Response } from 'express';

import { CreateCategoryUseCase } from './CreateCategoryUseCase';

class CreateCategoryController {
    constructor(private createCategoryUseCase: CreateCategoryUseCase) {}

    async handle(request: Request, response: Response): Promise<Response> {
        /**
         * Aqui estou definindo o que vou receber do corpo da requisição
         */
        const { name, description } = request.body;

        /**
         *  Aqui estou chamando o método execute do meu useCase, e estou passando os dados que eu quero criar.
         */
        await this.createCategoryUseCase.execute({ name, description });

        /**
         * Aqui estou retornando uma resposta para o usuário, e estou dizendo que a resposta foi um sucesso, e que não tem conteúdo,
         * pois o que eu quero é que ele apenas saiba que a requisição foi bem sucedida e a função send() é para retornar uma resposta vazia, pois
         * não vamos deixar a função create com a responsabilidade de retornar uma resposta para o usuário.
         */
        return response.status(201).send();
    }
}

export { CreateCategoryController };
