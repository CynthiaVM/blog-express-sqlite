import jwt from 'jsonwebtoken';
import logger from '../logger/logger';

const secret = process.env.SECRET_JWT || 'DefaultPassword'; //llamamos nuestra clave

export const generarTokenJWT = (payload: object): string => {
	const token = jwt.sign(payload, secret, { expiresIn: '2h' }); //sign es firmar, payload, clave, tiempo de duracion token
	return token;
};

// export const verificarToken = (token:string): token => {

// }