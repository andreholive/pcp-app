import jwt from 'jsonwebtoken';
import fs from 'fs';
import { UserData } from '../entities/User';
require('dotenv').config()

export default class TokenService {

    private secret:string

    constructor(
        secret = fs.readFileSync('./src/certificates/private.key', 'utf-8')
        )
        {
        this.secret = secret;
    }

    generateToken(payload: UserData): string {
        const token = jwt.sign(payload, this.secret, { expiresIn: '1h' });
        return token;
    }

    verifyToken(token: string): UserData | null{
        try {
            const payload = jwt.verify(token, this.secret) as UserData;
            return payload;
        } catch (error) {
            return null 
        }
    }

}