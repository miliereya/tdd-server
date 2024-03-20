import { IsNotEmpty, IsString, MaxLength } from 'class-validator'

export class CreateTemplateDto {
	@IsNotEmpty()
	@IsString()
	@MaxLength(255)
	title: string

	// @IsString()
	// @MaxLength(255)
	// rules: string
}
