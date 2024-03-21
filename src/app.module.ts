import { Module } from '@nestjs/common'
import { DataModule } from './data/data.module'
import { ConfigModule } from '@nestjs/config'
import { TemplateModule } from './template/template.module'
import { UserModule } from './user/user.module'

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		DataModule,
		TemplateModule,
		UserModule,
	],
})
export class AppModule {}
