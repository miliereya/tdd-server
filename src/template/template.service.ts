import { BadRequestException, Injectable } from '@nestjs/common'
import { CreateTemplateDto } from './dto'
import { AmazonS3Service } from '@app/amazon-s3'
import { TemplateRepository } from './repositories/template.repository'
import { Types } from 'mongoose'

@Injectable()
export class TemplateService {
	constructor(
		private readonly amazonS3Service: AmazonS3Service,
		private readonly templateRepository: TemplateRepository
	) {}

	async create(
		// user: UserCurrent,
		dto: CreateTemplateDto,
		email: string,
		file: Buffer
	) {
		const { title, cells, groups, fileType } = dto
		const filePath = await this.amazonS3Service.upload(file, fileType)

		const data = { title, filePath, cells, groups, email }

		try {
			const isTitleUsed = await this.templateRepository.findOne({ title })

			if (isTitleUsed) {
				throw 'already used'
			}
		} catch (e) {
			if (e === 'already used') {
				throw new BadRequestException('Title is already used')
			}
		}

		await this.templateRepository.create(data)
	}

	async getAll(email: string) {
		return this.templateRepository.find({ email })
	}

	async getOne(email: string, _id: string) {
		return this.templateRepository.findOne({
			email,
			_id: new Types.ObjectId(_id),
		})
	}

	async delete(email: string, title: string) {
		return this.templateRepository.findOneAndDelete({ email, title })
	}
}
