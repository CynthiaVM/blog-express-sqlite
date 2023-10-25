import {Request, Response } from 'express';
import { iNoticia } from './noticia.interface';
import { Noticia } from './noticia.entity';
import { dbcontext } from '../db/dbcontext';
import logger from '../logger/logger';
import { ILike } from 'typeorm';

export const crearNoticia = async (req: Request, res: Response) => {
	try {
		const noticiaRepository = await dbcontext.getRepository(Noticia);
		const nuevaNoticia: iNoticia = req.body;

		// creamos la noticia con create, sin guardar
		const noticia = await noticiaRepository.create({
			...nuevaNoticia,
			usuario: { id: req.usuario.id },
		});
		
	// guardamos la noticia, hace el insert en la base de datos
const result = await noticiaRepository.save(noticia);

	logger.debug(`Se creo la noticia ${JSON.stringify(nuevaNoticia)}`);
	logger.debug(
		`El usuario con nombre : ${req.usuario.nombre} ${
			req.usuario.apellido
		} creo la noticia ${JSON.stringify(nuevaNoticia)}`
		);
	} catch (error) {
		logger.error(`no se pudo crear la noticia ${error}`);
		res.status(500).json({ msg: 'No se pudo guardar la noticia'});
	}
};

//export const listarNoticia = async (req: Request, res: Response) => {
	//try {
		//const noticiaRepository = await dbcontext.getRepository(Noticia);
		//const noticias = await noticiaRepository.find();

		//res.json({ data: noticias, cantidad: noticias.length });
	//} catch (error) {
		//console.log(error);
		//res.status(500).json({ msg: 'No se pudo obtener un listado de noticias' });
	//}
//}

// // obtener noticia por id
export const obtenerNoticia = async (req: Request, res: Response) => {
	try {
		const titulo = req.query.titulo?.toString();
		const contenido = req.query.contenido?.toString();
		const idNoticia = req.query.id?.toString();
		const noticiaRepository = await dbcontext.getRepository(Noticia);
		// Busqueda con like por titulo
		const noticia = await noticiaRepository.find({
			where: {
				titulo: ILike(`%${titulo || ''}%`),
				contenido: ILike(`%${contenido || ''}%`),
				id: idNoticia,
			},
			relations: {
				comentarios: true,
			},
		});
		if (!noticia) {
			throw new Error();
		}
		res.json({ noticia });
	} catch (error) {
		logger.error(
			`No se puedo obtener la noticia con id ${req.params.id} desde el ip ${req.ip} `
		);
		res.status(404).json({ msg: 'No se pudo encontrar la noticia' });
	}
};


// // eliminar noticia
export const borrarNoticia = async (req: Request, res: Response) => {
	try {
		const noticiaRepository = await dbcontext.getRepository(Noticia);

		const noticiaBorrar = await noticiaRepository.delete(req.params.id);

		if (!noticiaBorrar.affected) {
			throw new Error('no se afectaron columnas');
		}
		logger.info(`el ip ${req.ip} borro la noticia ${req.params.id}`);
		res.json({ msg: 'Noticia borrada correctamente.' });
	} catch (error) {
		console.error(error);
		res.status(404).json({ msg: 'No se pudo borrar la noticia' });
	}
};

// update 
////siempre lo vamos a ejecutar las funciones dentro de un try y catch para poder ver la captura del error
export const actualizarNoticia = async(req: Request, res: Response) => {
	try { 
		const noticiaRepository = await dbcontext.getRepository(Noticia); //llamamos al repo para poder acceder a la base 

		const idNoticia = req.params.id; //capturamos el id
		const updateNoticia: iNoticia = req.body; // llamamos al req.body si veo la consulta envio el id y el body veo la noticia a actualizar

		const result = await noticiaRepository.update(idNoticia,updateNoticia);
		//si result afecto a alguna linea y si no afecto a nada voy a poner un error
		if (!result.affected) {
			throw new Error('No se pudo actualizar la noticia');
		}
		res.json({ msg: 'Noticia actualizada de manera correcta!' });
	} catch (error) {
		console.log(error);
		res.status(404).json({ msg: 'No se pudo actualizar la noticia!' });
	}

};

//Lista de noticias del usuario 
export const listarNoticiaByUsuario = async (req: Request, res: Response) => {
	try {
		const noticiaRepository = await dbcontext.getRepository(Noticia);
		const noticias = await noticiaRepository.find({ //en la documentacion dice la forma que debe ser el find
			where: { usuario: { id: req.usuario.id } }, //el user id deben ser igual con el que esta logueado, de esta forma lo puede buscar con el ID
			order: {
				create_at: 'DESC', //la manera que me lo acomoda
			},
		});

		res.json({ data: noticias, cantidad: noticias.length });
	} catch (error) {
		console.log(error);
		res.status(500).json({ msg: 'No se pudo obtener un listado de noticias' });
	}
};
