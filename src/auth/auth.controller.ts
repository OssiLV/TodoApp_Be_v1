import { Controller, Get, UseGuards, Res, Req } from '@nestjs/common';
import { Response, Request } from 'express';
import { JwtGuard } from './guards/jwt.guard';
import { GoogleGuard } from './guards/google.guard';
import { GithubGuard } from './guards/github.guard';

@Controller('auth')
export class AuthController {
  @Get('google')
  @UseGuards(GoogleGuard)
  googleLogin() {
    // initiates the Google OAuth2 login flow
  }

  @Get('google/callback')
  @UseGuards(GoogleGuard)
  googleLoginCallback(@Req() req: Request, @Res() res: Response) {
    // handles the Google OAuth2 callback
    const jwt: string = req.user as string;
    console.log(req.user);

    if (jwt) res.redirect('http://localhost:4200/login/succes/' + jwt);
    else res.redirect('http://localhost:4200/login/failure');
  }

  @Get('github')
  @UseGuards(GithubGuard)
  githubLogin() {
    // initiates the Google OAuth2 login flow
  }

  @Get('github/callback')
  @UseGuards(GithubGuard)
  githubLoginCallback(@Req() req: Request, @Res() res: Response) {
    // handles the Google OAuth2 callback
    const jwt: string = req.user as string;
    console.log(req.user);

    if (jwt) res.redirect('http://localhost:4200/login/succes/' + jwt);
    else res.redirect('http://localhost:4200/login/failure');
  }

  @Get('protected')
  @UseGuards(JwtGuard)
  protectedResource(@Req() req: Request, @Res() res: Response) {
    return res.json(req.user);
  }
}
