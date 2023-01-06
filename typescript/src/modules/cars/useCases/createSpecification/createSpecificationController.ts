import { Request, Response } from 'express';

import { CreateSpecificationUseCase } from './CreateSpecificationUseCase';

/**
 * CreateSpecificationController é uma classe que tem um método handle que recebe um request e um response.
 */
class CreateSpecificationController {
    /**
     *
     * @param createSpecificationUseCase é uma const que recebe o CreateSpecificationUseCase() que é uma função que retorna um objeto do tipo CreateSpecificationUseCase.
     */
    constructor(
        private createSpecificationUseCase: CreateSpecificationUseCase
    ) {}
    /**
     * Aqui estou criando um método chamado "handle", que vai receber um request e um response.
     */
    handle(request: Request, response: Response): Response {
        /**
         * const { name, description } é uma const que recebe o request.body, que é um objeto que contém o nome e a descrição da categoria.
         */
        const { name, description } = request.body;

        /**
         * Aqui estou chamando o método execute do meu useCase, e estou passando os dados que eu quero criar.
         */
        this.createSpecificationUseCase.execute({ name, description });

        /**
         * Aqui estou retornando um status 201 e um json.
         */
        return response.status(201).json();
    }
}

export { CreateSpecificationController };
