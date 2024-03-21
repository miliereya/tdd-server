import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common'
import { ConfirmEmailDto, LoginDto, RegisterDto, SendCodeDto } from './dto'
import { UserRepository } from './repositories/user.repository'
import { VerificationRepository } from './repositories/verification.repository'
import { Response } from 'express'
import { EmailService } from '@app/email'
import { generateConfirmationToken, generateSixDigitsCode } from '@app/common'
import { JwtService } from '@nestjs/jwt'
import { TokenPayload } from './types'

@Injectable()
export class UserService {
	constructor(
		private readonly userRepository: UserRepository,
		private readonly verificationRepository: VerificationRepository,
		private readonly emailService: EmailService,
		private readonly jwtService: JwtService
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

		await this.emailService.sendConfirmationEmail(
			dto.email,
			confirmationLink
		)

		return user
	}

	private async generateToken(
		tokenPayload: TokenPayload,
		response: Response
	) {
		const token = await this.jwtService.signAsync(tokenPayload, {
			secret: process.env.JWT_SECRET,
			expiresIn: '30d',
		})

		response.header('token', token)
	}

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

	async confirmEmail(dto: ConfirmEmailDto, response: Response) {
		const { token, email } = dto
		try {
			await this.verificationRepository.findOne({
				email,
				confirmationToken: token,
			})
		} catch (e) {
			throw new BadRequestException()
		}

		await this.userRepository.findOneAndUpdate(
			{ email },
			{ $set: { isConfirmed: true } }
		)

		await this.generateToken({ email }, response)
	}

	async login(dto: LoginDto) {
		const user = await this.userRepository.findOne({ email: dto.email })

		if (!user) throw new NotFoundException('User not found')

		if (!user.isConfirmed)
			throw new BadRequestException('Confirm your email address')

		const code = generateSixDigitsCode()
		const expireDate = new Date().getTime() + 1000 * 60 * 5

		await this.verificationRepository.findOneAndUpdate(
			{
				email: user.email,
			},
			{ $set: { code, expireDate } }
		)

		await this.emailService.sendCodeEmail(dto.email, String(code))
	}

	async sendCode(dto: SendCodeDto, response: Response) {
		const { code, email } = dto

		try {
			const verification = await this.verificationRepository.findOne({
				email,
				code,
			})

			const isCodeExpired = verification.expireDate < new Date().getTime()

			await this.verificationRepository.findOneAndUpdate(
				{ email },
				{ $set: { expireDate: null, code: null } }
			)

			if (isCodeExpired) {
				throw 'Expired'
			}

			return await this.generateToken({ email }, response)
		} catch (e) {
			if (e === 'Expired')
				throw new BadRequestException('Code is already expired')

			throw new BadRequestException('Invalid code')
		}
	}
}
