import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { AbstractDocument, DB_COLLECTIONS } from '@app/common'
import { Types } from 'mongoose'

@Schema({ versionKey: false })
export class Template extends AbstractDocument {
	@Prop({ ref: DB_COLLECTIONS.USERS, default: [] })
	user: Types.ObjectId

	@Prop()
	filePath: string
}

export const TemplateSchema = SchemaFactory.createForClass(Template)
