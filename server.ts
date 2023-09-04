import express, { Express, Request, Response } from "express";
import bodyParcer from 'body-parser';
import noticiasRoutes from './Modules/noticias/noticia.routes';
import { dbcontext } from './Modules/db/dbcontext';

dbcontext
	.initialize()
	.then(() => {
		console.log('Base datos en orden!');
	})
	.catch((err) => {
		console.error('Base datos DOWN', err); //si hay error
	});


const app: Express = express();

app.use(bodyParcer.json());

//app.use('/', (req: Request, res: Response) => {
    //res.json({
       // mgs:'Servisor funcionando ok!',
    //});
//});

app.use('/noticia', noticiasRoutes);

app.listen(3000, () => {
    console.log('Servidor funcionando ok!!!');
});
