import { IsArray, IsObject, IsString } from 'class-validator'
import { TableBase } from './table-base.dto'

export class CreateDataDto extends TableBase {
	@IsString()
	parentField: string

	@IsObject()
	data: object
}

export class CreateManyDto {
	@IsArray()
	data: CreateDataDto[]
}
