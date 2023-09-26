import { Request, Response } from "express";
import { usuarios } from "./usuarios.entity";
import { dbcontext } from "../db/dbcontext";
import { IUsuario } from "./usuarios.interface";
import logger from "../logger/logger";

export const crearUsuario =async (req: Request, res: Response) => {
    try {
        const usuarioRepository= dbcontext.getRepository(usuarios);
        let usuarioData: IUsuario= req.body;

        usuarioData.email=usuarioData.email.toLowerCase(); //para pasarlo minus, normalizar.
        
        const usuario= await usuarioRepository.create(usuarioData);
        const guardarUsuario= await usuarioRepository.save(usuario);

        res.json({
			msg: `Se creo el usuario con el id: ${guardarUsuario.id}`,
		});
    } catch (error) {
        logger.error(`Fallo crear el usuario ${error}`);
		res.status(500).json({ msg: 'No se pudo guardar el usuario'});
        
    }
    
}