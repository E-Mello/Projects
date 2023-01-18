import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'docker',
    password: 'ignite',
    database: 'rentx',
    synchronize: true,
    logging: true,
    entities: ['./entities/*.ts'],
    subscribers: ['./subscribers/*.ts'],
    migrations: ['./migrations/*.ts'],
});
