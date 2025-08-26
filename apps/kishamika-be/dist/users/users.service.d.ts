import { SignInpData } from '../auth/auth.types';
import { DatabaseService } from '../database/database.service';
export type User = {
    id: number;
    email: string;
    password: string;
    name: string;
    createdAt?: string;
    updatedAt?: string;
};
export type UserForCreate = {
    email: string;
    password: string;
    name: string;
};
export declare class UsersService {
    private readonly databaseService;
    constructor(databaseService: DatabaseService);
    findByEmail(email: string): Promise<{
        id: number;
        email: string;
        password: string;
        name: string | null;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    findById(id: number): Promise<{
        id: number;
        email: string;
        password: string;
        name: string | null;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    getAllUsers(): Promise<{
        id: number;
        email: string;
        password: string;
        name: string | null;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    addUser(user: UserForCreate): Promise<SignInpData | null>;
}
