### services/api-gateway/src/auth/auth.controller.ts
```typescript
/**
 * ============================================================
 * FILE: services/api-gateway/src/auth/auth.controller.ts
 * ============================================================
 */

import { Controller, Post, Get, Body, HttpCode, HttpStatus, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

/**
 * INLINE DTOs for Auth Layer
 */
class SignInDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsOptional()
  password?: string;
}

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Authenticate operator or mission coordinator' })
  @ApiResponse({ status: 200, description: 'Successfully authenticated.' })
  async signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @Get('me')
  @ApiOperation({ summary: 'Retrieve current operational session' })
  async getMe(@Request() req: any) {
    // In a real implementation, a Guard would populate req.user from JWT
    const mockUserId = 'usr_91'; 
    return this.authService.getProfile(mockUserId);
  }

  @Post('signout')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Invalidate current session' })
  async signOut() {
    return { success: true };
  }

  @Post('refresh')
  @ApiOperation({ summary: 'Request token rotation' })
  async refresh(@Body() body: { refreshToken: string }) {
    return this.authService.refreshToken(body.refreshToken);
  }
}
```_
