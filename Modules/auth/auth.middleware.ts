import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import logger from '../logger/logger';

const secret = process.env.SECRET_JWT || 'DefaultPassword';

export const verifyTokenMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const token = req.headers['authorization']?.replace('Bearer ', ''); //validarlo

	if (!token) {
		return res.status(403).json({ msg: 'Token no proporcionado' });
	}

	//verificar que el token
	jwt.verify(token, secret, (err: any, decoded: any) => {
		if (err) {
			logger.error(err);
			return res.status(401).json({ msg: 'Cuidado, Token no valido!' });
		}
		//agregarlo al request 
		logger.debug(JSON.stringify(decoded));
		req.usuario = decoded.usuario;
		next();
	});
	
};
