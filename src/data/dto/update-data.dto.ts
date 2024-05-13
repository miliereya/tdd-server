import { Types } from 'mongoose'
import { IsArray, IsString } from 'class-validator'

export class UpdateDataDto {
	@IsString()
	_id: Types.ObjectId

	@IsString()
	parentIndex: string

	@IsArray()
	fields: {
		index: string
		value: string
	}[]

	updateId?: Types.ObjectId

	@IsString()
	title: string
}
