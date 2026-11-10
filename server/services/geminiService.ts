import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY?.trim() || '';

export const ai = apiKey
  ? new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

// Multi-model resilience order
const MODEL_CANDIDATES = ['gemini-2.5-flash', 'gemini-3.1-flash-lite', 'gemini-3.8-flash'];

export interface GenerateOptions {
  prompt: string;
  systemInstruction?: string;
  temperature?: number;
  timeoutMs?: number;
}

export async function generateGeminiContent(options: GenerateOptions): Promise<string> {
  if (!ai || !apiKey || apiKey.includes('MY_GEMINI_API_KEY') || apiKey === 'your-gemini-api-key') {
    return '';
  }

  const timeoutMs = options.timeoutMs || 4000;

  for (const model of MODEL_CANDIDATES) {
    try {
      const generatePromise = ai.models.generateContent({
        model,
        contents: options.prompt,
        config: {
          systemInstruction: options.systemInstruction,
          temperature: options.temperature ?? 0.3,
        },
      });

      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('Timeout')), timeoutMs)
      );

      const response: any = await Promise.race([generatePromise, timeoutPromise]);
      const text = response?.text?.trim() || '';
      if (text) {
        return text;
      }
    } catch (err: any) {
      console.warn(`[GeminiService] Model ${model} call notice:`, err?.message || err);
      // Attempt next model candidate or fallback
    }
  }

  return '';
}
