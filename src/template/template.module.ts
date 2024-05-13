import { Module } from '@nestjs/common'
import { TemplateService } from './template.service'
import { TemplateController } from './template.controller'
import { AmazonS3Module } from '@app/amazon-s3'
import { DatabaseModule, Template, TemplateSchema } from '@app/common'
import { TemplateRepository } from './repositories/template.repository'

@Module({
	imports: [
		AmazonS3Module,
		DatabaseModule,
		DatabaseModule.forFeature([
			{ name: Template.name, schema: TemplateSchema },
		]),
	],
	controllers: [TemplateController],
	providers: [TemplateService, TemplateRepository],
})
export class TemplateModule {}
