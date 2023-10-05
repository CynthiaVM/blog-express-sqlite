import Request from 'express';
import { IUsuario } from '../../usuarios/usuarios.interface';
declare global {
	namespace Express {
		export interface Request {
			usuario: IUsuario;
		}
	}
}