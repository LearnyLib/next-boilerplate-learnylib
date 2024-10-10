import { AxiosError, AxiosResponse } from 'axios';
import { OpenaiAPI } from './OpenaiAPI';
import { ChatType } from './types';

export async function postChatToComplete(
  chat: ChatType,
): Promise<AxiosResponse> {
  try {
    return await OpenaiAPI.post('/chat/completions', chat);
  } catch (error) {
    if (error instanceof AxiosError)
      console.log(`OpenAI API error`, error.response?.data);
    throw new Error(`OpenAI API error`);
  }
}
