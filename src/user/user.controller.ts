import { Body, Controller, HttpCode, Post } from '@nestjs/common'
import { UserService } from './user.service'
import { ConfirmEmailDto, LoginDto, RegisterDto } from './dto'

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
	@Post('confirm-email')
	async confirmEmail(@Body() dto: ConfirmEmailDto) {
		return await this.userService.confirmEmail(dto)
	}
}
