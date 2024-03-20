import {
	Body,
	Controller,
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
import { ParseFormDataJsonPipe } from '@app/common/pipes'

@Controller('template')
export class TemplateController {
	constructor(private readonly templateService: TemplateService) {}

	@Post('create')
	// @Auth()
	@UseInterceptors(FileInterceptor('file'))
	async create(
		@UploadedFile(new ParseFilePipe({}))
		file: Express.Multer.File,
		@Body(
			new ParseFormDataJsonPipe({ field: 'body' }),
			new ValidationPipe({ whitelist: true })
		)
		dto: CreateTemplateDto
		// @CurrentUser()
		// user: UserCurrent
	) {
		await this.templateService.createTemplate(dto, file.buffer)
	}
}
