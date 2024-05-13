import { Cell, Group } from '@app/common'
import { IsArray, IsNotEmpty, IsString, MaxLength } from 'class-validator'

export class CreateTemplateDto {
	@IsNotEmpty()
	@IsString()
	@MaxLength(255)
	title: string

	@IsArray()
	cells: Cell[]

	@IsArray()
	groups: Group[]

	@IsString()
	fileType: string
}
