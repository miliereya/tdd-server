import { BadRequestException, Injectable } from '@nestjs/common'
import { CreateDataDto } from './dto/create-data.dto'
import { UpdateDataDto } from './dto/update-data.dto'
import { SearchDto } from './dto'
import { Types } from 'mongoose'
import { MongoRepository } from '@app/common'

@Injectable()
export class DataService {
	mongoRepository: MongoRepository

	constructor() {
		this.mongoRepository = new MongoRepository()
	}

	async create(dto: CreateDataDto) {
		const { data, parentField, table } = dto

		const entity = {
			data,
			parentField,
		}

		await this.mongoRepository.create(entity, table, 'user123')
	}

	async search(dto: SearchDto) {
		const { parentField, table, value } = dto

		if (!parentField || !table || !value)
			throw new BadRequestException('Invalid query params')

		const regexp = new RegExp(dto.value, 'i')

		const filter = { [`data.${parentField}`]: regexp }

		return await this.mongoRepository.findMany(filter, table, 'user123')
	}

	async findAll(table: string) {
		if (!table) throw new BadRequestException('Invalid query params')

		return await this.mongoRepository.findMany({}, table, 'user123')
	}

	async update(dto: UpdateDataDto) {
		const { _id, data, table, parentField } = dto

		if (!table || !_id)
			throw new BadRequestException('Invalid query params')

		await this.mongoRepository.replace(
			{ _id: new Types.ObjectId(_id) },
			{ parentField, data },
			table,
			'user123'
		)
	}

	async delete(_id: Types.ObjectId, table: string) {
		if (!table || !_id)
			throw new BadRequestException('Invalid query params')

		await this.mongoRepository.delete(
			{ _id: new Types.ObjectId(_id) },
			table,
			'user123'
		)
	}
}
