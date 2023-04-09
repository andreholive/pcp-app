
import { UserData } from "../entities/User";
import TokenService from "./TokenService";
import jwt from 'jsonwebtoken';

jest.mock('jsonwebtoken', () => ({
    sign: jest.fn(),
}));

describe('TokenService', () => {
    const tokenService = new TokenService('1234')
    const user:UserData = {
        user_id: '123456789',
        email: "user@emial.com",
        name: "user",
        admin: false
    }

    it('Should call a JWT function to generate a token', () => {
        tokenService.generateToken(user);
        expect(jwt.sign).toBeCalledWith(user, '1234',{ algorithm: 'HS256' });
    })

})

