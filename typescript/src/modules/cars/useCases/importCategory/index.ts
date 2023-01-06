import { CategoriesRepository } from '../../repositories/implementations/CategoriesRepository';
import { ImportCategoryController } from './ImportCategoryControlle';
import { ImportCategoryUseCase } from './ImportCategoryUseCase';

const categoriesRepository = CategoriesRepository.getInstance();
/**
 * importCategoryUseCase is a instance of the use case.
 */
const importCategoryUseCase = new ImportCategoryUseCase(categoriesRepository);
/**
 * importCategoryController is a instance of the controller.
 */
const importCategoryController = new ImportCategoryController(
    importCategoryUseCase
);

export { importCategoryController };
