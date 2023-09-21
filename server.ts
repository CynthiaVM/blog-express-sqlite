import express, { Express, Request, Response } from "express";
import bodyParcer from 'body-parser';
import noticiasRoutes from './Modules/noticias/noticia.routes';
import { dbcontext } from './Modules/db/dbcontext';
import comentarioRoutes from './Modules/comentarios/comentario.routes';
import { logMiddleware } from "./Modules/middleware/logMiddleware";
import logger from './Modules/logger/logger';
import { TypeORMError } from 'typeorm';
import dotenv from 'dotenv';
import { usuarios } from "./Modules/usuarios/usuarios.entity";
import { usuarioRoutes } from "./Modules/usuarios/usuarios.routes";
process.env.TZ = 'America/Argentina/Buenos_Aires';
dotenv.config();



const time = new Date();
console.log(time.toLocaleDateString());


dbcontext
.initialize()
.then(() => {})
.catch((err: TypeORMError) => {
	logger.error(`Error al iniciar la base de datos: ${err.message}`); // si hay error
});


const app: Express = express();
//mi primer middleware global
const PORT = process.env.BLOG_PORT;

app.use(logMiddleware);

app.use(bodyParcer.json());

//app.use('/', (req: Request, res: Response) => {
    //res.json({
       // mgs:'Servisor funcionando ok!',
    //});
//});

app.use('/noticia', noticiasRoutes);

app.use('/comentario', comentarioRoutes);

app.use('/usuarios', usuarioRoutes);

app.listen(PORT, () => {
	logger.info('Servidor funcionando OK EN EL PORT ' + PORT);
});
