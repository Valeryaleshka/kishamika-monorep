import { AuthService } from './auth.service';
import * as authTypes from './auth.types';
import express from 'express';
import * as usersService from '../users/users.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    getMe(req: express.Request): Promise<authTypes.AuthResult | null>;
    login(input: authTypes.AuthInput, res: express.Response): Promise<authTypes.AuthResult>;
    register(input: usersService.UserForCreate, res: express.Response): Promise<{
        result: boolean;
    }>;
    logout(res: express.Response): Promise<{
        message: string;
    }>;
}
