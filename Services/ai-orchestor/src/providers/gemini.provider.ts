### services/ai-orchestrator/src/providers/gemini.provider.ts
```typescript
/**
 * ============================================================
 * FILE: services/ai-orchestrator/src/providers/gemini.provider.ts
 * ============================================================
 */

import { 
  GoogleGenerativeAI, 
  GenerativeModel, 
  GenerateContentResult 
} from '@google/generative-ai';
import { createLogger } from '@readycheck/utils';

const logger = createLogger('Provider:Gemini');

export interface GeminiConfig {
  apiKey: string;
  model: string;
  temperature?: number;
  maxOutputTokens?: number;
}

/**
 * Clean adapter for Google Gemini (Vertex AI / Generative AI).
 * Abstracted from business logic to serve as a pure LLM utility.
 */
export class GeminiProvider {
  private readonly genAI: GoogleGenerativeAI;
  private readonly model: GenerativeModel;

  constructor(private readonly config: GeminiConfig) {
    if (!config.apiKey) {
      throw new Error('Gemini API Key is missing. Ensure GEMINI_API_KEY is set in environment.');
    }

    this.genAI = new GoogleGenerativeAI(config.apiKey);
    this.model = this.genAI.getGenerativeModel({
      model: config.model,
      generationConfig: {
        temperature: config.temperature ?? 0.7,
        maxOutputTokens: config.maxOutputTokens ?? 2048,
      },
    });
  }

  /**
   * Primary method for prompt execution.
   * Handles raw text generation with basic retry/error infrastructure.
   */
  async executePrompt(prompt: string): Promise<string> {
    try {
      logger.debug('Executing Gemini prompt...');
      
      const result: GenerateContentResult = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      if (!text) {
        throw new Error('Gemini returned an empty response.');
      }

      return text.trim();
    } catch (error) {
      logger.error('Failed to execute Gemini prompt', error);
      throw new Error('Gemini Provider failure: Unable to complete content generation.');
    }
  }

  /**
   * Logic for structured data extraction.
   * Encourages the model to return valid JSON matching the mission requirements.
   */
  async executeJsonPrompt<T = any>(prompt: string): Promise<T> {
    const jsonPrompt = `${prompt}\n\nIMPORTANT: Return ONLY a valid JSON object. No markdown, no commentary.`;
    
    const rawResponse = await this.executePrompt(jsonPrompt);
    
    try {
      // Basic sanitization in case the model wraps in backticks
      const cleanJson = rawResponse.replace(/```json|```/g, '').trim();
      return JSON.parse(cleanJson) as T;
    } catch (error) {
      logger.error('Failed to parse JSON response from Gemini', { rawResponse });
      throw new Error('Gemini Provider failure: Model output was not valid JSON.');
    }
  }
}
```_
