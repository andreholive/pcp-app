import { User } from "../entities/User";
import { UserRepository } from "../repositories/UserRepository";

export default class UserService {

    private userRepository:UserRepository;

    constructor(userRepository = new UserRepository()){

        this.userRepository = userRepository;

    }

    public createUser = async (user:User):Promise<User | null>=> {
        const userData = await this.userRepository.getUserByEmail(user.email);
        if(!userData){
            return await this.userRepository.createUser(user);
        }
        return null;    
    }

    public getUsers = async ():Promise<User[]> => {
        return await this.userRepository.getAllUsers();
    }
}