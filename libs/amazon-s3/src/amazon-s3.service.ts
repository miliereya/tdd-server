import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { v4 as uuid } from 'uuid'

@Injectable()
export class AmazonS3Service {
	private readonly s3Client = new S3Client({
		region: this.configService.getOrThrow('AWS_S3_REGION'),
	})

	private readonly AWS_URL = this.configService.getOrThrow('AWS_URL')

	constructor(private readonly configService: ConfigService) {}

	async upload(file: Buffer, type: string) {
		const key = `${uuid()}.${type}`
		await this.s3Client.send(
			new PutObjectCommand({
				Bucket: 'tdd-templates',
				Key: key,
				Body: file,
			})
		)

		return this.AWS_URL + key
	}
}
