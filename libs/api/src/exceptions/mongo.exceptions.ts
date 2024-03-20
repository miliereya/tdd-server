export const DocumentNotFoundException = (modelName: string) =>
	`${modelName} was not found`

export const InvalidIdException = (value?: any) =>
	value ? `Value: '${value}' should be id format` : 'Invalid id format'
