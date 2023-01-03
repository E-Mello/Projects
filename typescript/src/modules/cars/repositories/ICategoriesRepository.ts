import Category from '../model/Category';
/**
 * DTO => Data Transfer Object
 */
interface ICreateCategoryDTO {
    name: string;
    description: string;
}

/**
 * Interface que vai ser implementada na classe CategoriesRepository.
 */
interface ICategoriesRepository {
    findByName(name: string): Category;
    list(): Category[];
    create({ name, description }: ICreateCategoryDTO): void;
}

export { ICategoriesRepository, ICreateCategoryDTO };
