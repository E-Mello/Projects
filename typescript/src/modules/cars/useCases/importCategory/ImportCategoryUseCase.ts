import { CategoriesRepository } from '../../repositories/implementations/CategoriesRepository';
import csvParse from 'csv-parse';
import fs from 'fs';
import { inject, injectable } from 'tsyringe';

interface IImportCategory {
    name: string;
    description: string;
}

/**
 * ImportCategoryUseCase is a class that implements the use case.
 * The @injectable() allows me to inject the category repository into the class.
 */
@injectable()
class ImportCategoryUseCase {
    /**
     * The constructor receives the repository.
     * The inject receives the name of the repository that I want to inject, which in this case is the "CategoriesRepository".
     */
    constructor(
        @inject('CategoriesRepository')
        private categoriesRepository: CategoriesRepository
    ) {}

    loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
        return new Promise((resolve, reject) => {
            const stream = fs.createReadStream(file.path);
            const categories: IImportCategory[] = [];

            const parseFile = csvParse();

            stream.pipe(parseFile);

            parseFile
                .on('data', async (line) => {
                    const [name, description] = line;
                    categories.push({
                        name,
                        description,
                    });
                })
                .on('end', () => {
                    fs.promises.unlink(file.path);
                    resolve(categories);
                })
                .on('error', (err) => {
                    reject(err);
                });
        });
    }
    /**
     * execute is a method that executes the use case.
     */
    async execute(file: Express.Multer.File): Promise<void> {
        const categories = await this.loadCategories(file);

        categories.map(async (category) => {
            const { name, description } = category;

            const existCategory = this.categoriesRepository.findByName(name);

            if (!existCategory) {
                this.categoriesRepository.create({
                    name,
                    description,
                });
            }
        });
    }
}

export { ImportCategoryUseCase };
