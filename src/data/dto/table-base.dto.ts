import { IsString } from 'class-validator'

export class TableBase {
	@IsString()
	table: string
}
