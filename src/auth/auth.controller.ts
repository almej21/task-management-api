import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { GetCurrentUserId } from 'src/common/decorators';
import { RtGuard } from 'src/common/guards';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { Tokens } from './types';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('jwt-refresh'))
  @Get('/isloggedin')
  @HttpCode(HttpStatus.OK)
  isloggedin(@Res() res: Response) {
    console.log('isloggedin request');
    res.status(200).send({ msg: 'user is logged in' });
  }

  @Post('/signup')
  @HttpCode(HttpStatus.CREATED)
  signup(@Body() dto: AuthDto): Promise<Tokens> {
    console.log('sign up request');
    return this.authService.signup(dto);
  }

  @Post('/signin')
  @HttpCode(HttpStatus.OK)
  signin(@Body() dto: AuthDto): Promise<Tokens> {
    console.log('sign in request');
    return this.authService.signin(dto);
  }

  // @UseGuards(AuthGuard('jwt'))
  @UseGuards(RtGuard)
  @Post('/logout')
  @HttpCode(HttpStatus.OK)
  logout(@GetCurrentUserId() userId: number, @Res() res: Response) {
    console.log('log out request');
    this.authService.logout(userId);
    res.status(200).send({ msg: 'logout successfully' });
  }

  @UseGuards(RtGuard)
  @Post('/refreshtokens')
  @HttpCode(HttpStatus.OK)
  refreshTokens(@Req() req: Request) {
    console.log('refresh tokens request');
    const user = req.user;
    return this.authService.refreshTokens(user['sub'], user['refreshToken']);
  }
}
