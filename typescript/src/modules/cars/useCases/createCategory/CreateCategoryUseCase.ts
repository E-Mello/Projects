import { inject, injectable } from 'tsyringe';

import { CategoriesRepository } from '../../repositories/implementations/CategoriesRepository';
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';

/**
 * Aqui estou criando uma interface chamada "IRequest", que vai receber o nome e a descrição da categoria.
 */
interface IRequest {
    name: string;
    description: string;
}

/**
 * Aqui estou criando uma classe chamada "CreateCategoryUseCase", que vai receber o repositório de categoria.
 * O @injectable() vai permitir que eu possa injetar o repositório de categoria dentro da classe.
 */
@injectable()
class CreateCategoryUseCase {
    /**
     * O construtor vai receber o repositório de categoria.
     * O inject vai receber o nome do repositório que eu quero injetar, que no caso é o "CategoriesRepository".
     */
    constructor(
        @inject('CategoriesRepository')
        private categoriesRepository: ICategoriesRepository
    ) {}

    /**
     * Aqui estou criando um método chamado "execute", que vai receber o nome e a descrição da categoria.
     */
    async execute({ name, description }: IRequest): Promise<void> {
        /**
         * Aqui estou criando uma variável chamada "categoryAlreadyExists", que vai receber o resultado da busca de uma categoria pelo nome.
         */
        const categoryAlreadyExists =
            await this.categoriesRepository.findByName(name);

        /**
         * Aqui estou verificando se a categoria já existe, e se existir, eu estou lançando um erro.
         */
        if (categoryAlreadyExists) {
            throw new Error('Category already exists!');
        }

        /**
         * Aqui estou criando uma nova categoria, e passando o nome e a descrição da categoria.
         */
        this.categoriesRepository.create({ name, description });
    }
}

export { CreateCategoryUseCase };
