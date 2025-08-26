import { UserForCreate, UsersService } from '../users/users.service';
import { AuthInput, AuthResult, SignInpData } from './auth.types';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { CustomRequest } from './guards/auth.guard';
export declare class AuthService {
    private usersService;
    private readonly jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    getMe(req: CustomRequest): Promise<AuthResult | null>;
    authenticate(input: AuthInput, res: Response): Promise<AuthResult>;
    validateUser(input: AuthInput): Promise<SignInpData | null>;
    register(input: UserForCreate, res: Response): Promise<{
        result: boolean;
    }>;
    signOut(res: Response): Promise<{
        message: string;
    }>;
    signIn(user: SignInpData, res: Response): Promise<AuthResult>;
}
