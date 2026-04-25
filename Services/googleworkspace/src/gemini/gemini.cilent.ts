
### services/google-workspace/src/gemini/gemini.client.ts
```typescript
/**
 * ============================================================
 * FILE: services/google-workspace/src/gemini/gemini.client.ts
 * ============================================================
 */

import { GoogleGenerativeAI, GenerativeModel } from '@google/generative-ai';
import { createLogger } from '@readycheck/utils';

const logger = createLogger('Google:GeminiClient');

export interface GeminiWorkspaceConfig {
  apiKey: string;
  model: string;
}

/**
 * Specialized Gemini client for Google Workspace integration tasks.
 * Focused on generating Forms questions and processing unstructured Doc/Meet data.
 */
export class GeminiWorkspaceClient {
  private readonly model: GenerativeModel;

  constructor(config: GeminiWorkspaceConfig) {
    if (!config.apiKey) {
      throw new Error('GEMINI_API_KEY is required for Workspace intelligence.');
    }
    const genAI = new GoogleGenerativeAI(config.apiKey);
    this.model = genAI.getGenerativeModel({ model: config.model });
  }

  /**
   * Generates a structural set of assessment questions from an Action Card.
   */
  async generateQuestionsFromDirective(directive: string): Promise<string> {
    logger.debug('Prompting Gemini for assessment questions...');
    
    const prompt = `
      Convert the following operational directive into 3 practical, action-based multiple choice questions.
      Focus on safety, routing, and role-specific success.
      
      DIRECTIVE: "${directive}"
      
      OUTPUT: Valid JSON array of { title, options, correctIndex }.
    `;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text().replace(/```json|```/g, '').trim();
    } catch (error) {
      logger.error('Gemini question generation failed', error);
      throw new Error('Intelligence Error: Unable to synthesize assessment questions.');
    }
  }
}
```
