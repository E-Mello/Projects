import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

import { v4 as uuidV4 } from 'uuid';

@Entity("categories")
class Category {
    @PrimaryColumn() // Aqui é definido que o campo é a chave primária para o typeorm
    id?: string; 
    
    @Column() // Aqui é definido que o campo é uma coluna para o typeorm
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

export default Category;
