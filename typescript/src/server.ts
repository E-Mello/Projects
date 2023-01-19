/**
 * sudo docker inspect --format='{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' typescript
 * o comando acima é para pegar o ip do container typescript
 *
 * sudo docker exec dbForTypescript cat /etc/hosts
 * o comando acima é para pegar o ip do container dbForTypescript
 */
import './database';
import './shared/container';

import express from 'express';
import { router } from './routes';
import swaggerFile from './swagger.json';
import swaggerUi from 'swagger-ui-express';

/**
 * A const app recebe o express, que é uma função que retorna um objeto do tipo express. Que faz a aplicação rodar.
 */
const app = express();

/**
 * O express.json() é um middleware que faz com que o express entenda o formato json.
 */
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

/**
 * O método listen() é um método que faz com que a aplicação fique escutando uma porta.
 */
app.listen(3000, () => console.log('Server is running'));
