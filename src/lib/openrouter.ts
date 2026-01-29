/**
 * OpenRouter API Client for AI Random Number Generation
 */

const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";
const MODEL = "google/gemini-2.5-flash-lite";
const PROMPT = "Generate a random number 1-100. Only output the number, nothing else. do not use human bias. actually generate a random number";

interface OpenRouterResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

/**
 * Generate a single random number (1-100) using OpenRouter API
 * @param retryCount Current retry attempt (for internal use)
 * @returns A random number between 1 and 100
 */
export async function generateRandomNumber(retryCount = 0): Promise<number> {
  const maxRetries = 2;
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    throw new Error("OPENROUTER_API_KEY environment variable is not set");
  }

  try {
    const response = await fetch(OPENROUTER_API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
        "X-Title": "AI Random Number Generator",
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          {
            role: "user",
            content: PROMPT,
          },
        ],
        temperature: 1.0, // High randomness
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`OpenRouter API error (${response.status}): ${error}`);
    }

    const data: OpenRouterResponse = await response.json();
    const content = data.choices[0]?.message?.content?.trim();

    if (!content) {
      throw new Error("Empty response from OpenRouter API");
    }

    // Extract number from response using regex
    const numberMatch = content.match(/\d+/);
    if (!numberMatch) {
      console.warn(`Could not extract number from response: "${content}"`);
      // Fallback to random number
      return Math.floor(Math.random() * 100) + 1;
    }

    const number = parseInt(numberMatch[0], 10);

    // Validate number is in range 1-100
    if (number < 1 || number > 100) {
      console.warn(`Number ${number} out of range, using fallback`);
      return Math.floor(Math.random() * 100) + 1;
    }

    return number;
  } catch (error) {
    console.error(`Error generating random number (attempt ${retryCount + 1}):`, error);

    // Retry logic
    if (retryCount < maxRetries) {
      console.log(`Retrying... (${retryCount + 1}/${maxRetries})`);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1s before retry
      return generateRandomNumber(retryCount + 1);
    }

    // After max retries, throw error
    throw new Error(
      `Failed to generate random number after ${maxRetries + 1} attempts: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
}
