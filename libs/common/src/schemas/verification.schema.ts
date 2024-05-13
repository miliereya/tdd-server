import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { AbstractDocument } from '@app/common'

@Schema({ versionKey: false })
export class Verification extends AbstractDocument {
	@Prop()
	email: string

	@Prop({ length: 6, default: null })
	code: string | null

	@Prop({ default: null })
	expireDate: number | null

	@Prop()
	confirmationToken: string
}

export const VerificationSchema = SchemaFactory.createForClass(Verification)
