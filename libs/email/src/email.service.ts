import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { MailService, MailDataRequired } from '@sendgrid/mail'
import { getConfirmAccountTemplate } from './templates'
import { getCodeTemplate } from './templates/get-code.template'

@Injectable()
export class EmailService {
	constructor(
		private readonly configService: ConfigService,
		private readonly mailService: MailService
	) {
		this.mailService.setApiKey(
			this.configService.get<string>('SEND_GRID_KEY')
		)
	}

	async send(mail: MailDataRequired) {
		return await this.mailService.send(mail)
	}

	async sendConfirmationEmail(email: string, confirmationLink: string) {
		return await this.mailService.send({
			to: email,
			subject: 'Email confirmation',
			from: 'tdd.parser.excel@gmail.com',
			html: getConfirmAccountTemplate({
				email,
				confirmationLink,
			}),
		})
	}

	async sendCodeEmail(email: string, code: string) {
		return await this.mailService.send({
			to: email,
			subject: 'Authentication Code',
			from: 'tdd.parser.excel@gmail.com',
			html: getCodeTemplate({
				email,
				code,
			}),
		})
	}
}
