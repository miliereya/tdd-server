import { Body, Controller, Get, HttpCode, Post, Res } from '@nestjs/common'
import { UserService } from './user.service'
import { ConfirmEmailDto, LoginDto, RegisterDto, SendCodeDto } from './dto'
import { Response } from 'express'
import { Auth, Email } from './decorators'

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post('register')
	async register(@Body() dto: RegisterDto) {
		return await this.userService.register(dto)
	}

	@HttpCode(200)
	@Post('login')
	async login(@Body() dto: LoginDto) {
		return await this.userService.login(dto)
	}

	@HttpCode(200)
	@Post('send-code')
	async sendCode(
		@Body() dto: SendCodeDto,
		@Res({ passthrough: true }) response: Response
	) {
		return await this.userService.sendCode(dto, response)
	}

	@HttpCode(200)
	@Post('confirm-email')
	async confirmEmail(
		@Body() dto: ConfirmEmailDto,
		@Res({ passthrough: true }) response: Response
	) {
		await this.userService.confirmEmail(dto, response)
	}

	@Get('test')
	@Auth()
	async test(@Email() email: string) {
		return email
	}
}
