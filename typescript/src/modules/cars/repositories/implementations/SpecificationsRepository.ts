import {
    ICreateSpecificationDTO,
    ISpecificationsRepository,
} from '../ISpecificationsRepository';

import { Specification } from '../../entities/Specification';

/**
 * @class SpecificationRepository - Implements the ISpecificationsRepository interface
 */
class SpecificationsRepository implements ISpecificationsRepository {
    /**
     * @property specifications - Array of Specification objects
     */
    private specifications: Specification[];

    /**
     * @constructor - Creates an empty array of Specification objects
     */
    constructor() {
        this.specifications = [];
    }
    /**
     * create - Creates a new Specification object and adds it to the array
     */
    create({ name, description }: ICreateSpecificationDTO): void {
        /**
         * @constant specification - Creates a new Specification object
         */
        const specification = new Specification();

        /**
         * @method Object.assign - Copies the values of all enumerable own properties from one or more source objects to a target object. It will return the target object.
         */
        Object.assign(specification, {
            name,
            description,
            created_at: new Date(),
        });
    }

    findByName(name: string): Specification {
        const specification = this.specifications.find(
            (specification) => specification.name === name
        );
        return specification;
    }
}

export { SpecificationsRepository };
