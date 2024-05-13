import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	ParseFilePipe,
	Post,
	UploadedFile,
	UseInterceptors,
	ValidationPipe,
} from '@nestjs/common'
import { TemplateService } from './template.service'
import { FileInterceptor } from '@nestjs/platform-express'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Multer } from 'multer'
import { CreateTemplateDto } from './dto'
import { ParseFormDataJsonPipe, Validate } from '@app/common/pipes'
import { Auth, Email } from 'src/user/decorators'

@Controller('template')
export class TemplateController {
	constructor(private readonly templateService: TemplateService) {}

	@Post('create')
	@Auth()
	@UseInterceptors(FileInterceptor('file'))
	async create(
		@UploadedFile(new ParseFilePipe({}))
		file: Express.Multer.File,
		@Body(
			new ParseFormDataJsonPipe({ field: 'body' }),
			new ValidationPipe({ whitelist: true })
		)
		dto: CreateTemplateDto,
		// @CurrentUser()
		// user: UserCurrent
		@Email() email: string
	) {
		await this.templateService.create(dto, email, file.buffer)
	}

	@Get('all')
	@Auth()
	async getAll(@Email() email: string) {
		return await this.templateService.getAll(email)
	}

	@Validate()
	@Get('get-by-id/:_id')
	@Auth()
	async getByTitle(@Email() email: string, @Param('_id') _id: string) {
		return await this.templateService.getOne(email, _id)
	}

	@Delete(':title')
	@Auth()
	async delete(@Email() email: string, @Param('title') title: string) {
		return await this.templateService.delete(email, title)
	}
}
