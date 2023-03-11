import * as dotenv from 'dotenv';
dotenv.config();

export const {
  PORT,
  MONGODB_URL,
  JWT_SECRET_KEY,
  AZURE_OCP_APIM_SUBSCRIPTION_KEY,
  AZURE_OCP_APIM_REGION,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
} = process.env;
