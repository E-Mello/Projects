import { inject, injectable } from 'tsyringe';
import Category from '../../entities/Category';
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';

/**
 * Aqui estou criando uma classe chamada "ListCategoriesUseCase", que vai ser responsável por listar as categorias.
 */
@injectable()
class ListCategoriesUseCase {
    /**
     * No construtor, eu estou dizendo que a variável "categoriesRepository" é um repositório de categoria, e que esse repositório vai começar vazio.
     */
    constructor(
        @inject('CategoriesRepository')
        private categoriesRepository: ICategoriesRepository
    ) {
        /**
         * Aqui estou atribuindo o repositório de categoria a uma variável chamada "categoriesRepository".
         */
    }
    /**
     *  Aqui estou criando um método chamado "execute", que vai retornar uma lista de categorias.
     */
    async execute(): Promise<Category[]> {
        /**
         * Aqui estou chamando o método "list" do meu repositório, e estou guardando o retorno dele na variável "categories".
         */
        const categories = await this.categoriesRepository.list();
        /**
         * Aqui estou retornando a variável "categories".
         */
        return categories;
    }
}

/**
 * Aqui estou exportando a classe "ListCategoriesUseCase".
 */
export { ListCategoriesUseCase };
