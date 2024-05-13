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
import { Validate } from '@app/common'
import { Auth, Email } from 'src/user/decorators'

@Controller('data')
export class DataController {
	constructor(private readonly dataService: DataService) {}

	// @Post('create')
	// async create(
	// 	@Query('table') table: string,
	// 	@Body() dto: { data: any; parentField: string }
	// ) {
	// 	await this.dataService.create({ table, ...dto })
	// }

	@Post('create-many')
	@Validate()
	@Auth()
	async createMany(@Email() email: string, @Body() dto: CreateManyDto) {
		dto.data.forEach(async (record) =>
			record.updateId
				? await this.dataService.update(
						{
							...record,
							_id: record.updateId,
						},
						email
					)
				: await this.dataService.create(record, email)
		)
	}

	@Get('search')
	@Auth()
	@Validate()
	async search(
		@Query('title') title: string,
		@Query('value') value: string,
		@Query('parentIndex') parentIndex: string,
		@Email() email: string
	) {
		return await this.dataService.search(
			{
				title,
				value,
				parentIndex,
			},
			email
		)
	}

	@Get('find-all')
	async findAll(@Query('table') table: string) {
		return await this.dataService.findAll(table)
	}

	// @Put('update/:_id')
	// async update(
	// 	@Param('_id') _id: Types.ObjectId,
	// 	@Query('table') table: string,
	// 	@Body() data: { data: object; parentField: string }
	// ) {
	// 	await this.dataService.update({ _id, table, ...data })
	// }

	@Delete('delete/:_id')
	@HttpCode(200)
	async delete(
		@Param('_id') _id: Types.ObjectId,
		@Query('table') table: string
	) {
		await this.dataService.delete(_id, table)
	}
}
