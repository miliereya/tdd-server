import { Module } from '@nestjs/common'
import { TemplateService } from './template.service'
import { TemplateController } from './template.controller'
import { AmazonS3Module } from '@app/amazon-s3'

@Module({
	imports: [AmazonS3Module],
	controllers: [TemplateController],
	providers: [TemplateService],
})
export class TemplateModule {}
