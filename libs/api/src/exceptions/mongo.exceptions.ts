import { capitalizeAndSingularize } from '@app/common'

export const DocumentNotFoundException = (modelName: string) =>
	`${modelName} was not found`

export const InvalidIdException = (value?: any) =>
	value ? `Value: '${value}' should be id format` : 'Invalid id format'

export const DuplicateFieldException = (field: string, modelName: string) =>
	`Duplicate value in field '${field}' in ${capitalizeAndSingularize(
		modelName
	)} model`
