
import express from 'express';
import { crearUsuario } from '../usuarios/usuarios.service';

export const usuarioRoutes = express.Router();

usuarioRoutes.post('/', crearUsuario);
