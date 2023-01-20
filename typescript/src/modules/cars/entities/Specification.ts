import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

import { v4 as uuidV4 } from 'uuid';

/**
 * Classe que representa uma especificação
 */
@Entity('specifications')
class Specification {
    @PrimaryColumn()
    id?: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @CreateDateColumn()
    created_at: Date;

    /**
     * Metodo que é chamado quando a classe é instanciada
     */
    constructor() {
        if (!this.id) {
            this.id = uuidV4();
        }
    }
}

export { Specification };
