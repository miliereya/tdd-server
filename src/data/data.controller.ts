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
import { Types } from 'mongoose'
import { CreateManyDto } from './dto'

@Controller('data')
export class DataController {
	constructor(private readonly dataService: DataService) {}

	@Post('create')
	async create(
		@Query('table') table: string,
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
		@Query('table') table: string,
		@Query('value') value: string
	) {
		return await this.dataService.search({
			parentField,
			table,
			value,
		})
	}

	@Get('find-all')
	async findAll(@Query('table') table: string) {
		return await this.dataService.findAll(table)
	}

	@Put('update/:_id')
	async update(
		@Param('_id') _id: Types.ObjectId,
		@Query('table') table: string,
		@Body() data: { data: object; parentField: string }
	) {
		await this.dataService.update({ _id, table, ...data })
	}

	@Delete('delete/:_id')
	@HttpCode(200)
	async delete(
		@Param('_id') _id: Types.ObjectId,
		@Query('table') table: string
	) {
		await this.dataService.delete(_id, table)
	}
}
