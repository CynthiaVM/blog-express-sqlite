import { NextFunction, Request, Response } from 'express';

export const verifyTokenMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const token = req.headers['authorization']; //validarlo

	if (!token) {
		return res.status(403).json({ msg: 'Token no proporcionado' });
	}

	// TODO: verificar que el token
	// decode y enviar la informacion a la siguiente

	next();
};