import { Dashboard } from "@/components/Dashboard";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            🎲 AI Random Number Generator
          </h1>
          <p className="text-gray-600 text-lg">
            Generate truly random numbers using AI and visualize the distribution
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Powered by Google Gemini 2.5 Flash Lite via OpenRouter
          </p>
        </div>

        {/* Dashboard */}
        <Dashboard />

        {/* Footer */}
        <div className="mt-12 text-center text-sm text-gray-500">
          <p>Built with Next.js, Tailwind CSS, and Recharts</p>
        </div>
      </div>
    </main>
  );
}
