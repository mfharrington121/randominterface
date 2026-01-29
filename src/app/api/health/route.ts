/**
 * GET /api/health
 *
 * Health check endpoint for Railway and monitoring
 */
export async function GET() {
  return Response.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    service: "ai-random-number-generator",
  });
}
