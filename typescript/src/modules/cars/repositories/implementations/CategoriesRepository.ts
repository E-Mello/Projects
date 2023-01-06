import {
    ICategoriesRepository,
    ICreateCategoryDTO,
} from '../ICategoriesRepository';

import Category from '../../model/Category';

/**
 * Aqui estou dizendo que a classe CategoriesRepository vai implementar a interface ICategoriesRepository.
 */
class CategoriesRepository implements ICategoriesRepository {
    /**
     * Aqui estou dizendo que a variável "categories" é um array de categorias, e que esse array vai começar vazio.
     */
    private categories: Category[];

    /**
     * O "static" significa que o método "getInstance" é um método estático, e o "CategoriesRepository" é o tipo de retorno do método.
     */
    private static INSTANCE: CategoriesRepository;

    /**
     * O "getInstance" é um método estático, e o "CategoriesRepository" é o tipo de retorno do método.
     * O conceito de singleton é que a gente vai ter uma única instância da classe "CategoriesRepository" em toda a aplicação,
     * com isso a gente consegue ter um controle maior sobre a nossa aplicação e sobre os dados que estão sendo manipulados.
     * porém o singleton não é uma boa prática, pois ele pode dificultar a testabilidade da nossa aplicação e
     * deve ser usado somente quando for necessário para os casos em que a gente não pode ter mais de uma instância da classe "CategoriesRepository".
     */
    public static getInstance(): CategoriesRepository {
        /**
         * O "!" significa que o "CategoriesRepository.INSTANCE" não é nulo, e o "CategoriesRepository.INSTANCE" é uma variável estática,
         */
        if (!CategoriesRepository.INSTANCE) {
            /**
             * O "CategoriesRepository.INSTANCE" é uma variável estática, e o "new CategoriesRepository()" é uma instância da classe "CategoriesRepository".
             */
            CategoriesRepository.INSTANCE = new CategoriesRepository();
        }
        /**
         * o retorno do método "getInstance" é uma instância da classe "CategoriesRepository".
         */
        return CategoriesRepository.INSTANCE;
    }

    /**
     * O "private" significa que o construtor da classe "CategoriesRepository" é privado, e o "constructor" é o nome do construtor.
     */
    private constructor() {
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
