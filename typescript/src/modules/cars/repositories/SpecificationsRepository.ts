import {
    ICreateSpecificationDTO,
    ISpecificationsRepository,
} from './ISpecificationsRepository';

import { Specification } from '../model/Specification';

class SpecificationRepository implements ISpecificationsRepository {
    private specifications: Specification[];

    constructor() {
        this.specifications = [];
    }

    create({ name, description }: ICreateSpecificationDTO): void {
        const specification = new Specification();

        Object.assign(specification, {
            name,
            description,
            created_at: new Date(),
        });
    }
}

export { SpecificationRepository };
