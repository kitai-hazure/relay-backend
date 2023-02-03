import * as dotenv from 'dotenv';
dotenv.config();

export const {
  PORT,
  MONGODB_URL,
  JWT_SECRET_KEY,
  AZURE_OCP_APIM_SUBSCRIPTION_KEY,
  AZURE_OCP_APIM_REGION,
} = process.env;
