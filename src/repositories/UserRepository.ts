import { EntityManager } from "typeorm";
import { appDataSource } from "../database";
import { User } from "../entities/User";

export class UserRepository {
    private manager: EntityManager

    constructor(manager: EntityManager = appDataSource.manager){
        this.manager = manager;
    }

    createUser = async (user:User):Promise<User> => {
        return this.manager.save(user);
    }

    getUserByEmailAndPassword = async (email:string, password:string) => {
        return await this.manager.findOne(User, {where:{
            email,
            password
        }})
    }

    getUserById = async (user_id:string) => {
        return await this.manager.findOne(User, {where:{
            user_id
        }});
    }

    getUserByEmail = async (email:string) => {
        return await this.manager.findOne(User, {where:{
            email
        }});
    }

    getAllUsers = async () => {
        return await this.manager.find(User);
    }
}