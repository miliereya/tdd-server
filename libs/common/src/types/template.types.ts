export type TypeFieldSize = 'small' | 'large'
export type TypeOperation = '+' | '-' | '*' | '/' | '>' | '<'
export type TypeCellValue = 'separator' | 'input' | TypeOperation

// Inputs
export interface Field {
	value: string
	index: string // uuid
	size: TypeFieldSize
}

export interface Group {
	title: string
	parentField: string
	withDb: boolean
	isSaved: boolean
	fields: Field[]
}

// Cells
export interface CellValue {
	value: string
	type: TypeCellValue
	title?: string
	fieldIndex?: string | string[]
}

export interface Cell {
	index: string // CELL_1
	values: CellValue[]
}
