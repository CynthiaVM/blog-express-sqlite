import { Request, Response, NextFunction } from "express";
import logger from '../logger/logger';

export function logMiddleware (req: Request, res: Response, next: NextFunction) {
    //console.log('Se ingreso a la url:${req.url}');
    logger.debug(`El ip ${req.ip} ingrea a ${req.url} [${req.method}]`);
    next();
}