import { Injectable } from '@nestjs/common'
import { CreateTemplateDto } from './dto'
import { AmazonS3Service } from '@app/amazon-s3'

@Injectable()
export class TemplateService {
	constructor(private readonly amazonS3Service: AmazonS3Service) {}

	async createTemplate(
		// user: UserCurrent,
		dto: CreateTemplateDto,
		file: Buffer
	) {
		const { title } = dto
		const filePath = await this.amazonS3Service.upload(file)

		const data = { title, filePath }

		// await this.mongoRepository.db.collection('templates').insertOne(data)
	}
}
