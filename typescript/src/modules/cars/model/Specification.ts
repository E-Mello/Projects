import { v4 as uuidV4 } from 'uuid';

/**
 * Classe que representa uma especificação
 */
class Specification {
    id?: string;
    name: string;
    description: string;
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
