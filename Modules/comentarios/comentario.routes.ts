import express from 'express';
import {crearComentario,borrarComentario} from './comentario.service';

const comentarioRoutes = express.Router();

// endpoint para crear un comentario
comentarioRoutes.post('/', crearComentario);

// // [DELETE] endpoint borrar
comentarioRoutes.delete('/:id', borrarComentario);

export default comentarioRoutes;
