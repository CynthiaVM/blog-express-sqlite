import express from 'express';
import { crearUsuario } from './usuarios.service';
import { verifyTokenMiddleware } from '../auth/auth.middleware';

export const usuarioRoutes = express.Router();

usuarioRoutes.post('/', verifyTokenMiddleware, crearUsuario);