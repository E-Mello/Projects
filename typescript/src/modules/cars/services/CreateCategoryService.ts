import { CategoriesRepository } from '../repositories/CategoriesRepository';
import { ICategoriesRepository } from '../repositories/ICategoriesRepository';

interface IRequest {
    name: string;
    description: string;
}

class CreateCategoryService {
    /**
     * No construtor, eu estou dizendo que a variável "categoriesRepository" é um repositório de categoria, e que esse repositório vai começar vazio.
     */
    constructor(private categoriesRepository: ICategoriesRepository) {
        /**
         * Aqui estou atribuindo o repositório de categoria a uma variável chamada "categoriesRepository".
         */
    }
    /**
     * O execute é um método que vai receber um objeto com as propriedades "name" e "description", e vai retornar um "void".
     */
    execute({ name, description }: IRequest): void {
        /**
         * Antes de faazer a criação da categoria, eu quero verificar se a categoria já existe, para que eu não crie uma categoria com o mesmo nome.
         * dessa forma, eu estou chamando o método "findByName" do meu repositório, e passando o "name" que eu recebi do corpo da requisição.
         */
        const categoryAlreadyExists =
            this.categoriesRepository.findByName(name);

        /**
         * Aqui estou verificando se a categoria já existe, se ela já existe, eu quero retornar uma resposta para o usuário, dizendo que a categoria já existe.
         */
        if (categoryAlreadyExists) {
            /**
             * No caso, o service não deve/não deveria ter acesso ao response, dessa forma, utilizaremos o throw new Error() para retornar
             * o erro para o usuário, e o tratamento do erro será feito no controller.
             */
            throw new Error('Category already exists!');
        }

        /**
         * Aqui estou chamando o método "create" do meu repositório, e passando o "name" e "description" que eu recebi do corpo da requisição.
         */
        this.categoriesRepository.create({ name, description });
    }
}

export { CreateCategoryService };
