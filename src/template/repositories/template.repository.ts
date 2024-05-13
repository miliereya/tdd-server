import { Injectable, Logger } from '@nestjs/common'
import { AbstractRepository, Template } from '@app/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

@Injectable()
export class TemplateRepository extends AbstractRepository<Template> {
	protected readonly logger = new Logger(TemplateRepository.name)

	constructor(
		@InjectModel(Template.name)
		templateModel: Model<Template>
	) {
		super(templateModel)
	}
}
