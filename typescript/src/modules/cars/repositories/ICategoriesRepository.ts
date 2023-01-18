import Category from '../entities/Category';
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
    findByName(name: string): Promise<Category>;
    list(): Promise<Category[]>;
    create({ name, description }: ICreateCategoryDTO): Promise<void>;
}

export { ICategoriesRepository, ICreateCategoryDTO };
