/**
 * @Run migration
 * npx typeorm migration:create -t  CreateCategories ~/JobSpace/Projects/typescript/src/database/migrations/CreateCategories
 */
import { createConnection, getConnectionOptions } from 'typeorm';

interface IOptions {
    host: string;
}

getConnectionOptions().then((options) => {
    const newOptions = options as IOptions;
    newOptions.host = 'rentx'; //Essa opção deverá ser EXATAMENTE o nome dado ao service do banco de dados
    createConnection({
        ...options,
    });
});
