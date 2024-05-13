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

	async create(dto: CreateDataDto, email: string) {
		const { fields, parentIndex, title } = dto

		const parentValue = fields.find((f) => f.index === parentIndex).value

		if (!parentValue) return

		await this.mongoRepository.create({ parentValue, fields }, title, email)
	}

	async search(dto: SearchDto, email: string) {
		const { title, value, parentIndex } = dto

		if (!title || !value || !parentIndex)
			throw new BadRequestException('Invalid query params')

		const regexp = new RegExp(dto.value, 'i')

		const filter = { parentValue: regexp }
		return await this.mongoRepository.findMany(filter, title, email)
	}

	async findAll(table: string) {
		if (!table) throw new BadRequestException('Invalid query params')

		return await this.mongoRepository.findMany({}, table, 'user123')
	}

	async update(dto: UpdateDataDto, email: string) {
		const { _id, title, fields, parentIndex } = dto

		if (!title || !_id || !parentIndex)
			throw new BadRequestException('Invalid query params')

		const parentValue = fields.find((f) => f.index === parentIndex).value

		if (!parentValue) return
		await this.mongoRepository.replace(
			{ _id: new Types.ObjectId(_id) },
			{ parentValue, fields },
			title,
			email
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
