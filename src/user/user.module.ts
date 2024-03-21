import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { DatabaseModule, HealthModule, User, UserSchema } from '@app/common'
import { UserRepository } from './repositories/user.repository'
import {
	Verification,
	VerificationSchema,
} from '@app/common/schemas/verification.schema'
import { VerificationRepository } from './repositories/verification.repository'
import { EmailModule } from '@app/email'
import { JwtModule } from '@nestjs/jwt'

@Module({
	imports: [
		DatabaseModule,
		DatabaseModule.forFeature([
			{ name: User.name, schema: UserSchema },
			{ name: Verification.name, schema: VerificationSchema },
		]),
		JwtModule.register({
			global: true,
			secret: process.env.JWT_SECRET,
			signOptions: { expiresIn: '60s' },
		}),
		EmailModule,
		HealthModule,
	],
	controllers: [UserController],
	providers: [UserService, UserRepository, VerificationRepository],
})
export class UserModule {}
