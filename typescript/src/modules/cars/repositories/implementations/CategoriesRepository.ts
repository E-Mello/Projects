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
     * O "private" significa que o construtor da classe "CategoriesRepository" é privado, e o "constructor" é o nome do construtor.
     */
    constructor() {
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
        const category = await this.repository.findOne({});
        return category;
    }
}

export { CategoriesRepository };
