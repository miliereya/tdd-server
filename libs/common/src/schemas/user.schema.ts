import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { AbstractDocument, DB_COLLECTIONS } from '@app/common'
import { Types } from 'mongoose'

@Schema({ versionKey: false })
export class User extends AbstractDocument {
	@Prop()
	email: string

	@Prop({ default: false })
	isConfirmed: boolean

	@Prop({ ref: DB_COLLECTIONS.TEMPLATES, default: [] })
	templates: Types.ObjectId[]
}

export const UserSchema = SchemaFactory.createForClass(User)
