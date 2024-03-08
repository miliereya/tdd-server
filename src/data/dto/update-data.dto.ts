import { Types } from 'mongoose'
import { TableBase } from './table-base.dto'
import { IsObject, IsString } from 'class-validator'

export class UpdateDataDto extends TableBase {
	@IsString()
	_id: Types.ObjectId

	@IsObject()
	data: object

	@IsString()
	parentField: string
}
