import { Module } from '@nestjs/common'
import { DataModule } from './data/data.module'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule } from '@nestjs/config'
import { TemplateModule } from './template/template.module'

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		DataModule,
		MongooseModule.forRoot(process.env.MONGO_URI, { dbName: '' }),
		TemplateModule,
	],
})
export class AppModule {}
