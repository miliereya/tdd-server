import { Module } from '@nestjs/common'
import { mongoDbProvider } from './mongo.provider'

@Module({
	providers: [mongoDbProvider],
	exports: [mongoDbProvider],
})
export class MongoDbModule {}
