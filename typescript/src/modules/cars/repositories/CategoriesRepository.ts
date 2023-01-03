import {
    ICategoriesRepository,
    ICreateCategoryDTO,
} from './ICategoriesRepository';

import Category from '../model/Category';

/**
 * Aqui estou dizendo que a classe CategoriesRepository vai implementar a interface ICategoriesRepository.
 */
class CategoriesRepository implements ICategoriesRepository {
    /**
     * Aqui estou dizendo que a variável "categories" é um array de categorias, e que esse array vai começar vazio.
     */
    private categories: Category[];

    /**
     * No construtor, eu estou dizendo que a variável "categories" é um array de categorias, e que esse array vai começar vazio.
     */
    constructor() {
        this.categories = [];
    }

    /**
     * No método create, estamos dizendo que vamos receber um objeto ICreateCategoryDTO, e que esse objeto vai ter as propriedades "name" e "description" e
     * vamos desestruturar essas propriedades.
     * O "void" depois do ICreateCategoryDTO, significa que o retorno da função é vazio.
     */
    create({ name, description }: ICreateCategoryDTO): void {
        /**
         * Para chamar o construtor, é necessário colocar o "new no Category()"
         */
        const category = new Category();
        /**
         * O JavaScript tem uma função chamada Object.assign, que é possível passar um objeto para ele, no nosso caso passamos o "category",
         * e depois passamos um objeto com as propriedades que queremos alterar, no nosso caso passamos o "name", "description" e "created_at".
         */
        Object.assign(category, {
            name,
            description,
            created_at: new Date(),
        });

        this.categories.push(category);
    }

    /**
     * O "list" é um método que vai retornar uma lista de categorias, e o "Category[]" significa que o retorno da função é um array
     * de categorias.
     */
    list(): Category[] {
        return this.categories;
    }

    /**
     *  O "findByName" é um método que vai receber um parâmetro do tipo string, e vai retornar uma categoria.
     */
    findByName(name: string): Category {
        const category = this.categories.find(
            (category) => category.name === name
        );
        return category;
    }
}

export { CategoriesRepository };
