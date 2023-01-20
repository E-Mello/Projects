import { Request, Response } from 'express';

import { ImportCategoryUseCase } from './ImportCategoryUseCase';
import { container } from 'tsyringe';

/**
 * ImportCategoryController is a class that has a method called handle.
 */
class ImportCategoryController {
    /**
     * handle is a method that receives a request and a response.
     */
    async handle(request: Request, response: Response): Promise<Response> {
        const { file } = request;
        const importCategoryUseCase = container.resolve(ImportCategoryUseCase);
        await importCategoryUseCase.execute(file);

        return response.send();
    }
}

export { ImportCategoryController };
