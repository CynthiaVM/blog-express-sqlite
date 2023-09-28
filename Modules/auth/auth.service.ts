import { Request, Response } from 'express';
import { dbcontext } from '../db/dbcontext';
import { usuarios } from '../usuarios/usuarios.entity';
import { Ilogin } from './auth.interfaces';
import bcrypt from 'bcrypt';
import logger from '../logger/logger';
import { generarTokenJWT } from './jwt.service';


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
		
		if (!compararPass) {
			throw new Error('Usuario/contraseña incorrecto');
		}

		// Genero token
			const payload = {
			usuario: {
				id_usuario: buscarUsuario.id,
				email: buscarUsuario.email,
			    nombre: buscarUsuario.nombre,
				apellido: buscarUsuario.apellido,
				},
			};
	
			const token = generarTokenJWT(payload);
	
			res.json({
				token: token,
			});

		//res.json({
			//msg: `El resultado del login fue : ${compararPass}`,
		//});
	} catch (error) {
		// implementar logging en modo ERROR
		//throw new Error('Usuario/contraseña incorrecto');
		logger.error(error);
		res.status(401).json({
			msg: 'Usuario/contraseña incorrecto',
		});	
	}
};