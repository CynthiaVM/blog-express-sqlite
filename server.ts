import express, { Express, Request, Response } from "express";
import bodyParcer from 'body-parser';
import noticiasRoutes from './Modules/noticias/noticia.routes';
import { dbcontext } from './Modules/db/dbcontext';
import comentarioRoutes from './Modules/comentarios/comentario.routes';
import { logMiddleware } from "./Modules/middleware/logMiddleware";
import logger from './Modules/logger/logger';
process.env.TZ = 'America/Argentina/Buenos_Aires';
const time = new Date();
console.log(time.toLocaleDateString());


dbcontext
	.initialize()
	.then(() => {
		console.log('Base datos en orden!');
	})
	.catch((err) => {
		console.error('Base datos DOWN', err); //si hay error
	});


const app: Express = express();
//mi primer middleware global
app.use(logMiddleware);

app.use(bodyParcer.json());

//app.use('/', (req: Request, res: Response) => {
    //res.json({
       // mgs:'Servisor funcionando ok!',
    //});
//});

app.use('/noticia', noticiasRoutes);

app.use('/comentario', comentarioRoutes);

app.listen(3000, () => {
	logger.info('Servidor funcionando OK EN EL PORT ' + 3000);
});
