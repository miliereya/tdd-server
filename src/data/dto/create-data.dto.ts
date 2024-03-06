import { IsString } from 'class-validator'
import { TableBase } from './table-base.dto'

export class CreateDataDto extends TableBase {
	@IsString()
	parentField: string

	data: object
}

export class CreateManyDto {
	data: CreateDataDto[]
}
