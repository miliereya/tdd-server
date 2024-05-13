import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { AbstractDocument, Cell, DB_COLLECTIONS, Group } from '@app/common'

@Schema({ versionKey: false, timestamps: true })
export class Template extends AbstractDocument {
	@Prop({ ref: DB_COLLECTIONS.USERS, default: [] })
	email: string

	@Prop()
	filePath: string

	@Prop()
	title: string

	@Prop()
	cells: Cell[]

	@Prop()
	groups: Group[]
}

export const TemplateSchema = SchemaFactory.createForClass(Template)
