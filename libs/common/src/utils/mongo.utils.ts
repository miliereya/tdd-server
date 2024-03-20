import { InvalidIdException } from '@app/api/exceptions'
import { BadRequestException } from '@nestjs/common'
import { Types } from 'mongoose'

type TypeParseToIdValue = string | number | Types.ObjectId

export const parseToId = <T>(
	value: TypeParseToIdValue | TypeParseToIdValue[]
) => {
	try {
		return Array.isArray(value)
			? (value.map((v) => new Types.ObjectId(v)) as T)
			: (new Types.ObjectId(value) as T)
	} catch (e) {
		throw new BadRequestException(InvalidIdException(value))
	}
}
