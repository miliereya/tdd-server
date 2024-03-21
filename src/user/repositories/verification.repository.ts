import { Injectable, Logger } from '@nestjs/common'
import { AbstractRepository, Verification } from '@app/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

@Injectable()
export class VerificationRepository extends AbstractRepository<Verification> {
	protected readonly logger = new Logger(VerificationRepository.name)

	constructor(
		@InjectModel(Verification.name)
		userModel: Model<Verification>
	) {
		super(userModel)
	}
}
