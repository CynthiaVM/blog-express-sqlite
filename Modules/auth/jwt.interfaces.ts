import { IUsuario } from '../usuarios/usuarios.interface';

export interface IjwtPayload {
	usuario: IUsuario;
}