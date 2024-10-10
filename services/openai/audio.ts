import { AxiosError, AxiosResponse } from 'axios';
import { OpenaiAPI } from './OpenaiAPI';
import { AudioType } from './types';

export async function postAudioToTranscribe(
  audio: AudioType,
): Promise<AxiosResponse> {
  try {
    const formData = new FormData();
    formData.append('model', audio.model);
    formData.append('file', audio.file);
    return await OpenaiAPI.post('/audio/transcriptions', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  } catch (error) {
    if (error instanceof AxiosError)
      console.log(`OpenAI API error`, error.response?.data);
    throw new Error(`OpenAI API error`);
  }
}
