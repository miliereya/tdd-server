import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common'
import { ConfirmEmailDto, LoginDto, RegisterDto } from './dto'
import { UserRepository } from './repositories/user.repository'
import { VerificationRepository } from './repositories/verification.repository'
import { Response } from 'express'
import { EmailService, getConfirmAccountTemplate } from '@app/email'
import {
	generateConfirmationToken,
	generateSixDigitsCode,
	parseToId,
} from '@app/common'

@Injectable()
export class UserService {
	constructor(
		private readonly userRepository: UserRepository,
		private readonly verificationRepository: VerificationRepository,
		private readonly emailService: EmailService
	) {}

	async register(dto: RegisterDto) {
		const isEmailAvailable = await this.checkEmailExists(dto.email)

		if (!isEmailAvailable) {
			throw new BadRequestException('Email is already used.')
		}

		const user = await this.userRepository.create(dto)

		const confirmationToken = generateConfirmationToken()
		const confirmationLink = `${process.env.CLIENT_URL}/confirm-email?token=${confirmationToken}&email=${user.email}`

		await this.verificationRepository.create({
			email: user.email,
			confirmationToken,
		})

		await this.emailService.send({
			to: dto.email,
			subject: 'Email confirmation',
			from: 'tdd.parser.excel@gmail.com',
			html: getConfirmAccountTemplate({
				email: dto.email,
				link: confirmationLink,
			}),
		})

		return user
		// this.sendVerificationLink(user.email)
	}

	// private async generateToken(
	// 	tokenPayload: TokenPayload,
	// 	response: Response
	// ) {
	// 	const expires = new Date()
	// 	expires.setSeconds(
	// 		expires.getSeconds() + this.configService.get('JWT_EXPIRATION')
	// 	)

	// 	const token = this.jwtService.sign(tokenPayload)

	// 	response.header('Bearer', token)
	// }

	private async checkEmailExists(email: string) {
		try {
			await this.userRepository.findOne({
				email,
			})
		} catch (err) {
			return true
		}
		return false
	}

	async confirmEmail(dto: ConfirmEmailDto) {
		const { token, email } = dto
		try {
			await this.verificationRepository.findOne({
				email,
				confirmationToken: token,
			})
		} catch (e) {
			throw new BadRequestException()
		}

		this.userRepository.findOneAndUpdate(
			{ email },
			{ $set: { isConfirmed: true } }
		)
	}

	async login(dto: LoginDto) {
		const user = await this.userRepository.findOne({ email: dto.email })

		if (!user) throw new NotFoundException('User not found')

		if (!user.isConfirmed)
			throw new BadRequestException('Confirm your email address')

		const code = generateSixDigitsCode()
		const expireDate = new Date(Date.now() + 5 * 60 * 1000)

		await this.verificationRepository.findOneAndUpdate(
			{
				user: parseToId(user._id),
			},
			{ $set: { code, expireDate } }
		)

		// await this.emailService.send({
		// 	to: dto.email,
		// 	subject: 'Login Code',
		// 	from: 'tdd.parser.excel@gmail.com',
		// 	html: getConfirmAccountTemplate(code),
		// })
	}

	// async refresh(userId: Types.ObjectId, response: Response) {
	// 	const user = await this.userService.getPrivateUser(userId)
	// 	await this.generateToken(userId, response)

	// 	return user
	// }
}
