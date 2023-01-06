import { Router } from 'express';
import { createSpecificationController } from '../modules/cars/useCases/createSpecification';

/**
 * speecificationsRoutes é uma const que recebe o Router() que é uma função que retorna um objeto do tipo Router.
 */
const specificationsRoutes = Router();

/**
 * O método post() é um método que recebe uma rota e um callback.
 */
specificationsRoutes.post('/', (request, response) => {
    /**
     * Aqui estou chamando o método handle do meu controller, e estou passando os dados que eu quero criar.
     */
    return createSpecificationController.handle(request, response);
});

export { specificationsRoutes };
