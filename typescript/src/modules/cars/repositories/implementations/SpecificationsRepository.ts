import {
    ICreateSpecificationDTO,
    ISpecificationsRepository,
} from '../ISpecificationsRepository';
import { Repository, getRepository } from 'typeorm';

import { Specification } from '../../entities/Specification';

/**
 * @class SpecificationRepository - Implements the ISpecificationsRepository interface
 */
class SpecificationsRepository implements ISpecificationsRepository {
    /**
     * @property specifications - Array of Specification objects
     */
    private repository: Repository<Specification[]>;

    /**
     * @constructor - Creates an empty array of Specification objects
     */
    constructor() {
        this.repository = getRepository(Specification);
    }
    /**
     * create - Creates a new Specification object and adds it to the array
     */
    async create({
        description,
        name,
    }: ICreateSpecificationDTO): Promise<void> {
        const specification = this.repository.create({
            description,
            name,
        });

        await this.repository.save(specification);
    }

    async findByName(name: string): Promise<Specification> {
        const specification = this.repository.findOne({ where: { name } });
        return specification;
    }
}

export { SpecificationsRepository };
