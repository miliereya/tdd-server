import { IsString } from 'class-validator'
import { TableBase } from './table-base.dto'

export class SearchDto extends TableBase {
	@IsString()
	parentField: string

	@IsString()
	value: string
}

export class FullSearchDto extends TableBase {
	@IsString()
	value: string
}
