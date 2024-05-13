import { IsString } from 'class-validator'
import { TableBase } from './table-base.dto'

export class SearchDto {
	@IsString()
	title: string

	@IsString()
	value: string

	@IsString()
	parentIndex: string
}

export class FullSearchDto extends TableBase {
	@IsString()
	value: string
}
