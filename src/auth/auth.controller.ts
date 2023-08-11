import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { Tokens } from './types';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
    
    @Post('/signup')
    signup(@Body() dto: AuthDto): Promise<Tokens> {
        return this.authService.signup(dto)
    }

    @Post('/signin')
    signin() {
        return this.authService.signin();
    }

    @Post('/logout')
    logout() {
        return this.authService.logout();
    }

    @Post('/refresh')
    refreshTokens() {
        return this.authService.refreshTokens();
    }
}
