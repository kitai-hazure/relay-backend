const jwt = require('jsonwebtoken');
import { JWT_SECRET_KEY } from '../constants/env';
import { IPayload } from 'src/types/payload.type';

export const signJWT = (payload: IPayload) => {
  // console.log("SECRET KEY: ", JWT_SECRET_KEY);
  return jwt.sign(payload, JWT_SECRET_KEY);
};

export const verifyJWT = (token: string) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET_KEY, { algorithm: 'RS256' });
    return { payload: decoded, expired: false };
  } catch (err) {
    return { payload: null, expired: true };
  }
};
