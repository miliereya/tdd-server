import { Inject, Injectable } from '@nestjs/common'
import { CreateTemplateDto } from './dto'
import { AmazonS3Service } from '@app/amazon-s3'
import { MONGODB_PROVIDER } from 'src/constants'
import { Db } from 'mongodb'

@Injectable()
export class TemplateService {
	constructor(
		@Inject(MONGODB_PROVIDER) private readonly db: Db,
		private readonly amazonS3Service: AmazonS3Service
	) {}

	async createTemplate(
		// user: UserCurrent,
		dto: CreateTemplateDto,
		file: Buffer
	) {
		console.log(dto)
		console.log(file)
		return
		const { title } = dto
		const filePath = `${dto.title}-${new Date().getTime()}`
		await this.amazonS3Service.upload(filePath, file)

		const data = { title, filePath }

		await this.db.collection('templates').insertOne(data)
	}
}
