import { inject, injectable } from 'tsyringe';

import { ISpecificationsRepository } from '../../repositories/ISpecificationsRepository';

/**
 * Aqui estou criando uma interface chamada "IRequest", que vai receber o nome e a descrição da categoria.
 */
interface IRequest {
    name: string;
    description: string;
}

/**
 * Aqui estou criando uma classe chamada "CreateSpecificationUseCase", que vai receber o repositório de categoria.
 * O @injectable() vai permitir que eu possa injetar o repositório de categoria dentro da classe.
 */
@injectable()
class CreateSpecificationUseCase {
    /**
     * O construtor vai receber o repositório de categoria.
     * O inject vai receber o nome do repositório que eu quero injetar, que no caso é o "SpecificationsRepository".
     */
    constructor(
        @inject('SpecificationsRepository')
        private specificationsRepository: ISpecificationsRepository
    ) {}
    /**
     * Aqui estou criando um método chamado "execute", que vai receber o nome e a descrição da categoria.
     */
    execute({ description, name }: IRequest): void {
        /**
         * Aqui estou criando uma variável chamada "specificationAlreadyExists", que vai receber o resultado da busca de uma categoria pelo nome.
         */
        const specificationAlreadyExists =
            this.specificationsRepository.findByName(name);

        /**
         * Aqui estou verificando se a categoria já existe, e se existir, eu estou lançando um erro.
         */
        if (specificationAlreadyExists) {
            throw new Error('Specification already exists!');
        }

        /**
         * Aqui estou criando uma nova categoria, e passando o nome e a descrição da categoria.
         */
        this.specificationsRepository.create({ name, description });
    }
}

export { CreateSpecificationUseCase };
