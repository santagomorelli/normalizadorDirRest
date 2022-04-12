import express from "express";
import routes from './routes';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from './../swagger_output.json';

const puerto = 8080;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = app.listen(puerto, () =>
    console.log('Server up', puerto)
);

server.on('error', (err) => {
    console.log('ERROR =>', err);
});

app.use('/', routes);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));