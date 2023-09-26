import express from 'express';
import { login } from './auth.service';

export const authRoutes = express.Router();

//cuando vaya para login 
authRoutes.post('/login', login); 