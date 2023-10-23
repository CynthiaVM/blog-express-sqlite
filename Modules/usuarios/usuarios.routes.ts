import express from 'express';
import { crearUsuario } from './usuarios.service';
import { verifyTokenMiddleware } from '../auth/auth.middleware';

export const usuarioRoutes = express.Router();

usuarioRoutes.post('/',  crearUsuario);

//si le sacas verifyTokenMiddleware no te verifica usuario
