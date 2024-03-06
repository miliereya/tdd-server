import { BadRequestException, Inject, Injectable } from '@nestjs/common'
import { CreateDataDto } from './dto/create-data.dto'
import { UpdateDataDto } from './dto/update-data.dto'
import { MONGODB_PROVIDER } from 'src/constants'
import { Db } from 'mongodb'
import { SearchDto } from './dto'
import { TypeTable } from './types'
import { Types } from 'mongoose'

@Injectable()
export class DataService {
	constructor(@Inject(MONGODB_PROVIDER) private readonly db: Db) {}
	async create(dto: CreateDataDto) {
		const { data, parentField, table } = dto

		await this.db
			.collection(table)
			.insertOne({ parentField: parentField, ...data })
	}

	async search(dto: SearchDto) {
		const { parentField, table, value } = dto

		if (!parentField || !table || !value)
			throw new BadRequestException('Invalid query params')

		const regexp = new RegExp(dto.value, 'i')

		return await this.db
			.collection(table)
			.find({ [parentField]: regexp })
			.toArray()
	}

	async findAll(table: TypeTable) {
		if (!table) throw new BadRequestException('Invalid query params')

		return await this.db.collection(table).find().toArray()
	}

	async update(dto: UpdateDataDto) {
		const { _id, data, table } = dto

		if (!table || !_id)
			throw new BadRequestException('Invalid query params')

		await this.db
			.collection(table)
			.replaceOne({ _id: new Types.ObjectId(_id) }, data)
	}

	async delete(_id: Types.ObjectId, table: TypeTable) {
		if (!table || !_id)
			throw new BadRequestException('Invalid query params')

		await this.db
			.collection(table)
			.deleteOne({ _id: new Types.ObjectId(_id) })
	}
}
