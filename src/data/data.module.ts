import { Module } from '@nestjs/common'
import { DataService } from './data.service'
import { DataController } from './data.controller'
import { MongoDbModule } from 'src/mongo/mongo.module'

@Module({
	imports: [MongoDbModule],
	controllers: [DataController],
	providers: [DataService],
})
export class DataModule {}
