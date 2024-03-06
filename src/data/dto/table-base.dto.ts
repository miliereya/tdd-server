import { IsString } from 'class-validator'
import { TypeTable } from '../types'

export class TableBase {
	@IsString()
	table: TypeTable
}
