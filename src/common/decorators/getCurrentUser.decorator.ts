import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { User } from 'src/users/user.schema';

export const GetCurrentUser = createParamDecorator(
  (data: keyof User | undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const user = request.user as User;
    return data ? user[data] : user;
  },
);
