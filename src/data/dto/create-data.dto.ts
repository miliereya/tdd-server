import { IsArray, IsString } from 'class-validator'
import { Types } from 'mongoose'

export class CreateDataDto {
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

export class CreateManyDto {
	@IsArray()
	data: CreateDataDto[]
}
