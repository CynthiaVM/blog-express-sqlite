import express, { Express, Request, Response } from "express";
import bodyParcer from 'body-parser';

const app: Express = express();

app.use(bodyParcer.json());

app.use('/', (req: Request, res: Response) => {
    res.json({
        mgs:'Servisor funcionando ok!',
    });
});
app.listen(3000, () => {
    console.log('Servidor funcionando ok!!!');
});
