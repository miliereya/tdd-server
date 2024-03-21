import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const Email = createParamDecorator((_, ctx: ExecutionContext) => {
	const request = ctx.switchToHttp().getRequest()
	const email = request.user.email

	return email
})
