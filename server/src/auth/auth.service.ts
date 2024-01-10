import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { ITokens } from './interfaces/token.interface';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto/auth.dto';
import * as argon2 from 'argon2';
import { TokenDto } from './dto/token.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: CreateUserDto) {
    const oldUser = await this.userService.findByEmail(dto.email);

    if (oldUser) {
      throw new BadRequestException('User already registered');
    }

    const user = await this.userService.create(dto);

    const tokens = await this.getTokens(user);

    return {
      user,
      ...tokens,
    };
  }

  async login(dto: AuthDto) {
    const user = await this.validateUser(dto);
    const tokens = await this.getTokens(user);

    return {
      user,
      ...tokens,
    };
  }

  async getNewTokens({ refreshToken }: TokenDto) {
    if (!refreshToken) {
      throw new UnauthorizedException('Please login');
    }

    const result = await this.jwtService.verifyAsync(refreshToken);

    if (!result) {
      throw new UnauthorizedException('Invalid refresh token or expired token');
    }

    const user = await this.userService.findById(result.id);

    const tokens = await this.getTokens(user);

    return {
      user,
      ...tokens,
    };
  }

  async validateUser(dto: AuthDto) {
    const user = await this.userService.findByEmail(dto.email);

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const isValidPassword = await argon2.verify(user.password, dto.password);

    if (!isValidPassword) {
      throw new BadRequestException('Invalid password');
    }

    return user;
  }

  async verify(token: string): Promise<User> {
    return this.jwtService.verifyAsync(token);
  }

  private async getTokens(dto: Partial<User>): Promise<ITokens> {
    const payload: Partial<User> = {
      id: dto.id,
      isAdmin: dto.isAdmin,
      roles: dto.roles,
      email: dto.email,
    };

    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '1h',
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: '30d',
    });

    return {
      accessToken,
      refreshToken,
    };
  }
}
