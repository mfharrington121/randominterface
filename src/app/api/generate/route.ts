import { NextRequest } from "next/server";
import { generateRandomNumber } from "@/lib/openrouter";
import type { GenerateRequest, SSEMessage, ModelOption } from "@/types/api";

/**
 * POST /api/generate
 *
 * Generates random numbers using AI and streams them via Server-Sent Events (SSE)
 *
 * Request body: { count: 1 | 5 | 30 }
 * Response: text/event-stream
 */
export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body: GenerateRequest = await request.json();
    const { count, model = "anthropic/claude-sonnet-4.5" } = body;

    // Validate count
    if (![1, 5, 30].includes(count)) {
      return new Response(
        JSON.stringify({ error: "Invalid count. Must be 1, 5, or 30" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Validate model
    const validModels: ModelOption[] = [
      "anthropic/claude-sonnet-4.5",
      "google/gemini-3-flash-preview",
      "openai/gpt-4o-mini",
      "sao10k/l3-lunaris-8b",
      "mistralai/ministral-3b"
    ];
    if (model && !validModels.includes(model)) {
      return new Response(
        JSON.stringify({ error: "Invalid model selection" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Create SSE stream
    const encoder = new TextEncoder();

    const stream = new ReadableStream({
      async start(controller) {
        try {
          // Start all API calls in parallel
          const promises = Array(count)
            .fill(null)
            .map(() => generateRandomNumber(0, model));

          // Process results as they complete
          for (let i = 0; i < promises.length; i++) {
            try {
              const number = await promises[i];

              // Send number event
              const message: SSEMessage = {
                type: "number",
                value: number,
                progress: i + 1,
                total: count,
              };

              const data = `data: ${JSON.stringify(message)}\n\n`;
              controller.enqueue(encoder.encode(data));

              console.log(`Generated number ${i + 1}/${count}: ${number} (${model})`);
            } catch (error) {
              console.error(`Error generating number ${i + 1}/${count}:`, error);

              // Send error event
              const errorMessage: SSEMessage = {
                type: "error",
                error: error instanceof Error ? error.message : String(error),
              };

              const data = `data: ${JSON.stringify(errorMessage)}\n\n`;
              controller.enqueue(encoder.encode(data));

              // Continue with next number instead of stopping
              continue;
            }
          }

          console.log(`Completed generating ${count} numbers (${model})`);


          // Send completion event
          const doneMessage: SSEMessage = {
            type: "done",
          };

          const data = `data: ${JSON.stringify(doneMessage)}\n\n`;
          controller.enqueue(encoder.encode(data));
        } catch (error) {
          console.error("Error in SSE stream:", error);

          // Send final error event
          const errorMessage: SSEMessage = {
            type: "error",
            error: error instanceof Error ? error.message : String(error),
          };

          const data = `data: ${JSON.stringify(errorMessage)}\n\n`;
          controller.enqueue(encoder.encode(data));
        } finally {
          controller.close();
        }
      },
    });

    // Return SSE stream response
    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache, no-transform",
        "Connection": "keep-alive",
        "X-Accel-Buffering": "no", // Disable nginx buffering
      },
    });
  } catch (error) {
    console.error("Error in POST /api/generate:", error);

    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Internal server error"
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

// Enable dynamic rendering (required for streaming)
export const dynamic = "force-dynamic";
