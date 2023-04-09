import { Request, Response } from "express";
import { User } from "../entities/User";
import UserService from "../services/UserService";

export default class UserController{

    private userService:UserService;

    constructor(userService = new UserService()){

        this.userService = userService;

    }

    createUser = async (request:Request, response:Response) => {

        const {email, password, name} = request.body;

        if(email && password && name){
            const user = new User(name, email, password);
            const createdUser = await this.userService.createUser(user);
            if(!createdUser){
                return response.sendStatus(409);
            }
            return response.status(201).send(createdUser);
        }
        return response.sendStatus(401);
        
    }

    getUsers = async (request:Request, response:Response) => {
        const users = await this.userService.getUsers();
        return response.status(200).send(users);
    }
}