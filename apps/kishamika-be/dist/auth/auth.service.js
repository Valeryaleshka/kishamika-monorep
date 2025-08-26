"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = __importStar(require("bcrypt"));
let AuthService = class AuthService {
    usersService;
    jwtService;
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    async getMe(req) {
        const token = req.cookies?.access_token;
        if (!token) {
            return null;
        }
        try {
            const decoded = await this.jwtService.verifyAsync(token);
            const user = await this.usersService.findById(decoded.sub);
            if (!user) {
                return null;
            }
            return { userId: decoded.sub, username: decoded.username };
        }
        catch (_) {
            return null;
        }
    }
    async authenticate(input, res) {
        const user = await this.validateUser(input);
        if (!user) {
            throw new common_1.UnauthorizedException();
        }
        return this.signIn(user, res);
    }
    async validateUser(input) {
        const user = await this.usersService.findByEmail(input.email);
        if (user) {
            const isMatch = await bcrypt.compare(input.password, user.password);
            if (isMatch) {
                return {
                    userId: user.id,
                    email: user.email,
                };
            }
        }
        return null;
    }
    async register(input, res) {
        const user = await this.usersService.addUser(input);
        if (!user) {
            throw new common_1.UnauthorizedException();
        }
        await this.signIn(user, res);
        return { result: true };
    }
    signOut(res) {
        res.cookie('access_token', '', {
            httpOnly: true,
        });
        return Promise.resolve({ message: 'Loged out' });
    }
    async signIn(user, res) {
        const tokenPayload = {
            sub: user.userId,
            username: user.email,
        };
        const access_token = await this.jwtService.signAsync(tokenPayload);
        res.cookie('access_token', access_token, {
            httpOnly: true,
        });
        return {
            userId: user.userId,
            username: user.email,
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map