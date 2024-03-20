import { Module } from '@nestjs/common'
import { TemplateService } from './template.service'
import { TemplateController } from './template.controller'
import { AmazonS3Module } from '@app/amazon-s3'
import { MongoDbModule } from 'src/mongo/mongo.module'

@Module({
	imports: [AmazonS3Module, MongoDbModule],
	controllers: [TemplateController],
	providers: [TemplateService],
})
export class TemplateModule {}
