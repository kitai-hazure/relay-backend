import { HttpException, HttpStatus } from '@nestjs/common';
export const getToken = (context: any) => {
  const authorization = context?.req?.headers?.authorization;
  const token = authorization?.split(' ')[1];
  if (token === undefined)
    throw new HttpException(
      'Invalid request, token not found',
      HttpStatus.BAD_REQUEST,
    );
  return token;
};
