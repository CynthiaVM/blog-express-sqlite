import express from 'express';
import {
	crearNoticia,
	obtenerNoticiaId,
	borrarNoticia,
	actualizarNoticia,
	listarNoticiaByUsuario,
} from './noticia.service';
import { verifyTokenMiddleware } from '../auth/auth.middleware';

const noticiasRoutes = express.Router();

// endpoint para crear una noticia
noticiasRoutes.post('/',verifyTokenMiddleware, crearNoticia);

// endpoint para consultar todas las noticias

//noticiasRoutes.get('/', listarNoticia);

// // [GET] endpoint obtener noticia por id /:id

noticiasRoutes.get('/:id', obtenerNoticiaId);

// [GET] endpoint para obtener noticias del usuario logueado
noticiasRoutes.get('/my/all', verifyTokenMiddleware, listarNoticiaByUsuario);

// // [DELETE] endpoint borrar
noticiasRoutes.delete('/:id', verifyTokenMiddleware, borrarNoticia);

// // [PATCH] endpoint update
noticiasRoutes.patch('/:id', verifyTokenMiddleware, actualizarNoticia);

export default noticiasRoutes;

