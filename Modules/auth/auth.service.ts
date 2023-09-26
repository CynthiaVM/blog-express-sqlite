import { Request, Response } from 'express';
import { dbcontext } from '../db/dbcontext';
import { usuarios } from '../usuarios/usuarios.entity';
import { Ilogin } from './auth.interfaces';
import bcrypt from 'bcrypt';

export const login = async (req: Request, res: Response) => {
	try {
		const usuarioRepository = dbcontext.getRepository(usuarios);
		// Busco al usuario
		let dataRequest: Ilogin = req.body;
		// pasar a min el email usuario
		const buscarUsuario = await usuarioRepository.findOneBy({
			email: dataRequest.email,
		});

		if (!buscarUsuario) {
			throw new Error('Usuario/contraseña incorrecto');
		}
		// comparo pass
		const compararPass = await bcrypt.compare(
			dataRequest.pass,
			buscarUsuario.pass
		);

		res.json({
			msg: `El resultado del login fue : ${compararPass}`,
		});
	} catch (error) {
		// implementar logging en modo ERROR
		throw new Error('Usuario/contraseña incorrecto');
	}
};