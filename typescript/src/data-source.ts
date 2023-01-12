import { DataSource, DataSourceOptions } from 'typeorm';

const options: DataSourceOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'docker',
    password: 'ignite',
    database: 'rentx',
    entities: ['src/database/entities/*.ts'],
    migrations: ['src/database/migrations/*.ts'],
};

export const dataSource = new DataSource(options);
