import { Module } from '@nestjs/common'
import { EmailService } from './email.service'
import { ConfigModule } from '@nestjs/config'
import * as Joi from 'joi'
import { MailService } from '@sendgrid/mail'

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: ['.env'],
			isGlobal: true,
			validationSchema: Joi.object({
				SEND_GRID_KEY: Joi.string().required(),
			}),
		}),
	],
	providers: [EmailService, MailService],
	exports: [EmailService, MailService],
})
export class EmailModule {}
