import { Request, Response } from 'express';

import { ImportCategoryUseCase } from './ImportCategoryUseCase';

/**
 * ImportCategoryController is a class that has a method called handle.
 */
class ImportCategoryController {
    constructor(private importCategoryUseCase: ImportCategoryUseCase) {}
    /**
     * handle is a method that receives a request and a response.
     */
    handle(request: Request, response: Response): Response {
        const { file } = request;

        this.importCategoryUseCase.execute(file);

        return response.send();
    }
}

export { ImportCategoryController };
