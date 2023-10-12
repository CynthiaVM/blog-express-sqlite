import { IUsuario } from '../usuarios/usuarios.interface';

export interface iNoticia {
	id?: string;
	titulo: string;
	contenido: string;
	usuario?: IUsuario;
}