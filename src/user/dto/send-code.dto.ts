import { IsEmail, IsString } from 'class-validator'

export class SendCodeDto {
	@IsString()
	code: string

	@IsEmail()
	email: string
}
