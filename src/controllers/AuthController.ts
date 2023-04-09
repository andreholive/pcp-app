import { NextFunction, Request, Response } from "express";
import AuthService from "../services/AuthService";

export class AuthController {
    
    private service: AuthService

    constructor(service = new AuthService()){
        this.service = service;
    }

    authUser = async (request:Request, response:Response) => {

        const {email, password} = request.body;

        if(!email){
            return response.sendStatus(400)
        }
        if(!password){
            return response.sendStatus(400)
        }

        const authorization = await this.service.authenticate(email, password);

        if(!authorization.success){
            return response.sendStatus(401)
        }
        
        return response.status(200).json(authorization);
    }

    verifyToken = async (request:Request, response:Response, next: NextFunction) => {
        const autorization = request.headers['authorization'];
        if(!autorization){
            return response.status(401).send('Sem header');
        }
        const userData = this.service.verifyToken(autorization.split(' ')[1]);

        if(userData){
            response.locals.userData = userData;
            return next();
        }
        return response.status(401).send('erro no token')
            
    }

    verifyAdminPrivileges = async (request:Request, response:Response, next: NextFunction) => {

        const autorization = request.headers['authorization'];
        if(!autorization){
            return response.status(401).send('Sem header');
        }
        const userData = this.service.verifyToken(autorization.split(' ')[1])
        if(userData){
            if(userData.admin){
                response.locals.userData = userData;
                return next();
            }
            return response.status(401).send('Unauthorized');
        }
        return response.status(401).send('Unauthorized');
    }

}