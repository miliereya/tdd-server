import {
	CanActivate,
	ExecutionContext,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class JwtAuthGuard implements CanActivate {
	constructor(
		private jwtService: JwtService,
		private readonly configService: ConfigService
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest()
		const token = request.headers.token
		if (!token) {
			throw new UnauthorizedException('Token was not provided')
		}
		try {
			const payload = await this.jwtService.verifyAsync(token, {
				secret: process.env.JWT_SECRET,
			})
			request.user = payload
		} catch {
			throw new UnauthorizedException('Token validation failed')
		}
		return true
	}
}
