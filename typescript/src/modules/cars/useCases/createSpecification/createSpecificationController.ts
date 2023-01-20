import { Request, Response } from 'express';

import { CreateSpecificationUseCase } from './CreateSpecificationUseCase';
import { container } from 'tsyringe';

/**
 * CreateSpecificationController é uma classe que tem um método handle que recebe um request e um response.
 */
class CreateSpecificationController {
    /**
     * Aqui estou criando um método chamado "handle", que vai receber um request e um response.
     */
    async handle(request: Request, response: Response): Promise<Response> {
        /**
         * const { name, description } é uma const que recebe o request.body, que é um objeto que contém o nome e a descrição da categoria.
         */
        const { name, description } = request.body;

        /**
         * Aqui estou pegando o meu useCase, e estou passando o nome da classe que eu quero injetar, que no caso é o "CreateSpecificationUseCase".
         * O container.resolve vai pegar o meu useCase e vai injetar o meu repositório de categoria dentro dele.
         */
         const createSpecificationUseCase = container.resolve(CreateSpecificationUseCase)

        /**
         * Aqui estou chamando o método execute do meu useCase, e estou passando os dados que eu quero criar.
         */
        await createSpecificationUseCase.execute({ name, description });

        /**
         * Aqui estou retornando um status 201 e um json.
         */
        return response.status(201).json();
    }
}

export { CreateSpecificationController };
