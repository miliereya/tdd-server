import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	Delete,
	Query,
	Put,
	HttpCode,
} from '@nestjs/common'
import { DataService } from './data.service'
import { TypeTable } from './types'
import { Types } from 'mongoose'
import { CreateManyDto } from './dto'

@Controller('data')
export class DataController {
	constructor(private readonly dataService: DataService) {}

	@Post('create')
	async create(
		@Query('table') table: TypeTable,
		@Body() dto: { data: any; parentField: string }
	) {
		await this.dataService.create({ table, ...dto })
	}

	@Post('create-many')
	async createMany(@Body() dto: CreateManyDto) {
		dto.data.forEach(async (record) =>
			record._id
				? await this.dataService.update({ ...record, _id: record._id })
				: await this.dataService.create(record)
		)
	}

	@Get('search')
	async search(
		@Query('parentField') parentField: string,
		@Query('table') table: TypeTable,
		@Query('value') value: string
	) {
		return await this.dataService.search({
			parentField,
			table,
			value,
		})
	}

	@Get('find-all')
	async findAll(@Query('table') table: TypeTable) {
		return await this.dataService.findAll(table)
	}

	@Put('update/:_id')
	async update(
		@Param('_id') _id: Types.ObjectId,
		@Query('table') table: TypeTable,
		@Body() data: { data: object; parentField: string }
	) {
		await this.dataService.update({ _id, table, ...data })
	}

	@Delete('delete/:_id')
	@HttpCode(200)
	async delete(
		@Param('_id') _id: Types.ObjectId,
		@Query('table') table: TypeTable
	) {
		await this.dataService.delete(_id, table)
	}
}
