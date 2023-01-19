import { CreateSpecificationController } from '../modules/cars/useCases/createSpecification/createSpecificationController';
import { Router } from 'express';
/**
 * speecificationsRoutes é uma const que recebe o Router() que é uma função que retorna um objeto do tipo Router.
 */
const specificationsRoutes = Router();

/**
 * Aqui estou criando uma const chamada createSpecificationController, que vai receber uma instância da classe CreateSpecificationController.
 */
const createSpecificationController = new CreateSpecificationController();

/**
 * Aqui estou criando uma rota que vai receber um post na url "/categories", e vai chamar o método handle do meu createSpecificationController.
 * O método "createSpecificationController.handle" é o método que eu vou utilizar para dizer que eu quero executar a função que está dentro do meu controller.
 */
specificationsRoutes.post('/', createSpecificationController.handle);

export { specificationsRoutes };
