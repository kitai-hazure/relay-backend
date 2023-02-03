import { BadGatewayException, Injectable } from '@nestjs/common';
import {
  AZURE_OCP_APIM_REGION,
  AZURE_OCP_APIM_SUBSCRIPTION_KEY,
} from 'src/constants/env';
import { TranslateInput } from 'src/graphql.types';
import axios from 'axios';

@Injectable()
export class TranslateService {
  async translate(input: TranslateInput): Promise<string> {
    try {
      const res = await axios.post(
        `https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&from=${input.source}&to=${input.target}`,
        JSON.stringify([{ text: input.text }]),
        {
          headers: {
            'Ocp-Apim-Subscription-Key': AZURE_OCP_APIM_SUBSCRIPTION_KEY,
            'Ocp-Apim-Subscription-Region': AZURE_OCP_APIM_REGION,
            'Content-type': 'application/json',
          },
        },
      );
      return res.data[0].translations[0].text;
    } catch {
      throw new BadGatewayException(
        'An error occurred while translating. Please check language or try again later.',
      );
    }
  }
}
