import Category from '../model/Category';

/**
 * DTO => Data Transfer Object
 */
interface ICreateCategoryDTO {
    name: string;
    description: string;
}

class CategoriesRepository {
    private categories: Category[];

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
}

export { CategoriesRepository };
