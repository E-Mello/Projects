import {
    ICategoriesRepository,
    ICreateCategoryDTO,
} from '../ICategoriesRepository';
import { Repository, getRepository } from 'typeorm';

import Category from '../../entities/Category';

/**
 * Aqui estou dizendo que a classe CategoriesRepository vai implementar a interface ICategoriesRepository.
 */
class CategoriesRepository implements ICategoriesRepository {
    private repository: Repository<Category>;

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
        this.repository = getRepository(Category);
    }

    /**
     * No método create, estamos dizendo que vamos receber um objeto ICreateCategoryDTO, e que esse objeto vai ter as propriedades "name" e "description" e
     * vamos desestruturar essas propriedades.
     * O "void" depois do ICreateCategoryDTO, significa que o retorno da função é vazio.
     */
    async create({ name, description }: ICreateCategoryDTO): Promise<void> {
        const category = this.repository.create({
            description,
            name,
        });

        await this.repository.save(category);
    }

    async list(): Promise<Category[]> {
        const categories = await this.repository.find();
        return categories;
    }

    /**
     *  O "findByName" é um método que vai receber um parâmetro do tipo string, e vai retornar uma categoria.
     */
    async findByName(name: string): Promise<Category> {
        //Select * from categories where name = "name" limit 1
        const category = await this.repository.findOne({ });
        return category;
    }
}

export { CategoriesRepository };
