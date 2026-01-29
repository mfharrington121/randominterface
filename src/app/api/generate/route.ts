import { NextRequest } from "next/server";
import { generateRandomNumber } from "@/lib/openrouter";
import type { GenerateRequest, SSEMessage } from "@/types/api";

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
    const { count } = body;

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

    // Create SSE stream
    const encoder = new TextEncoder();

    const stream = new ReadableStream({
      async start(controller) {
        try {
          // Generate numbers one by one
          for (let i = 1; i <= count; i++) {
            try {
              // Generate random number using OpenRouter API
              const number = await generateRandomNumber();

              // Send number event
              const message: SSEMessage = {
                type: "number",
                value: number,
                progress: i,
                total: count,
              };

              const data = `data: ${JSON.stringify(message)}\n\n`;
              controller.enqueue(encoder.encode(data));

              console.log(`Generated number ${i}/${count}: ${number}`);
            } catch (error) {
              console.error(`Error generating number ${i}/${count}:`, error);

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

          // Send completion event
          const doneMessage: SSEMessage = {
            type: "done",
          };

          const data = `data: ${JSON.stringify(doneMessage)}\n\n`;
          controller.enqueue(encoder.encode(data));

          console.log(`Completed generating ${count} numbers`);
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
