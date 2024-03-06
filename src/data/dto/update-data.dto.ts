import { Types } from 'mongoose'
import { TableBase } from './table-base.dto'
import { IsString } from 'class-validator'

export class UpdateDataDto extends TableBase {
	@IsString()
	_id: Types.ObjectId

	data: object
}
