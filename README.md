# 🎲 AI Random Number Generator

A beautiful, interactive web application that generates truly random numbers using AI (Google Gemini 2.5 Flash Lite) and visualizes the distribution in real-time with an animated histogram.

![AI Random Number Generator](https://img.shields.io/badge/Next.js-15-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-cyan) ![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

- **🤖 AI-Powered**: Uses Google Gemini 2.5 Flash Lite via OpenRouter API for genuinely random number generation
- **📊 Real-Time Visualization**: Watch numbers stream in and update the histogram live
- **🎨 Beautiful UI**: Modern, colorful design with smooth animations and gradients
- **📱 Responsive**: Works perfectly on desktop, tablet, and mobile devices
- **⚡ Fast Streaming**: Server-Sent Events (SSE) for efficient real-time updates
- **📈 Statistics**: View detailed stats including average, most/least frequent numbers
- **🔄 Flexible**: Choose to generate 1, 5, or 30 numbers at a time
- **♿ Accessible**: Built with accessibility in mind using shadcn/ui components

## 🚀 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Charts**: [Recharts](https://recharts.org/)
- **AI API**: [OpenRouter](https://openrouter.ai/)
- **Deployment**: [Railway](https://railway.app/)

## 📦 Installation

### Prerequisites

- Node.js 18+ installed
- OpenRouter API key ([get one here](https://openrouter.ai/keys))

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/randominterface.git
   cd randominterface
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory:
   ```bash
   cp .env.example .env.local
   ```

   Then edit `.env.local` and add your OpenRouter API key:
   ```env
   OPENROUTER_API_KEY=sk-or-v1-your-key-here
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 Usage

1. **Select the number count**: Choose 1, 5, or 30 numbers to generate from the dropdown
2. **Click "Generate Random Numbers"**: Watch as the AI generates random numbers in real-time
3. **View the histogram**: See the distribution update live as numbers stream in
4. **Check statistics**: Review average, most frequent, and least frequent numbers

## 🏗️ Project Structure

```
randominterface/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── generate/route.ts    # SSE streaming endpoint
│   │   │   └── health/route.ts      # Health check for Railway
│   │   ├── layout.tsx               # Root layout with metadata
│   │   ├── page.tsx                 # Main dashboard page
│   │   └── globals.css              # Global styles
│   │
│   ├── components/
│   │   ├── ui/                      # shadcn/ui components
│   │   ├── Dashboard.tsx            # Main dashboard container
│   │   ├── ControlPanel.tsx         # Generate button + controls
│   │   ├── RealtimeHistogram.tsx    # Live histogram chart
│   │   ├── StatusIndicator.tsx      # Progress indicator
│   │   └── StatsPanel.tsx           # Statistics display
│   │
│   ├── lib/
│   │   ├── openrouter.ts            # OpenRouter API client
│   │   ├── histogram.ts             # Histogram utilities
│   │   └── utils.ts                 # General utilities
│   │
│   └── types/
│       ├── api.ts                   # API types
│       └── histogram.ts             # Histogram types
│
├── public/                          # Static assets
├── .env.example                     # Environment variables template
├── .env.local                       # Your local env vars (gitignored)
├── next.config.ts                   # Next.js configuration
├── tailwind.config.ts               # Tailwind configuration
├── tsconfig.json                    # TypeScript configuration
└── package.json                     # Project dependencies
```

## 🚢 Deployment to Railway

### Quick Deploy

1. **Install Railway CLI** (optional, or use web interface)
   ```bash
   npm install -g @railway/cli
   ```

2. **Login to Railway**
   ```bash
   railway login
   ```

3. **Initialize project**
   ```bash
   railway init
   ```

4. **Add environment variables**
   ```bash
   railway variables set OPENROUTER_API_KEY=your_key_here
   railway variables set NODE_ENV=production
   ```

5. **Deploy**
   ```bash
   railway up
   ```

### Deploy via GitHub (Recommended)

1. Push your code to GitHub
2. Go to [Railway](https://railway.app/)
3. Click "New Project" → "Deploy from GitHub"
4. Select your repository
5. Add environment variables in Railway dashboard:
   - `OPENROUTER_API_KEY`: Your OpenRouter API key
   - `NODE_ENV`: `production`
6. Railway will automatically detect Next.js and deploy!

### Environment Variables for Railway

Required:
- `OPENROUTER_API_KEY`: Your OpenRouter API key

Optional:
- `NODE_ENV`: Set to `production` for production builds
- `NEXT_PUBLIC_SITE_URL`: Your Railway deployment URL

## 📊 API Endpoints

### `POST /api/generate`

Generate random numbers with real-time streaming.

**Request Body:**
```json
{
  "count": 5
}
```

**Response:** Server-Sent Events (SSE) stream

**Events:**
```json
// Number event
{
  "type": "number",
  "value": 42,
  "progress": 1,
  "total": 5
}

// Done event
{
  "type": "done"
}

// Error event
{
  "type": "error",
  "error": "Error message"
}
```

### `GET /api/health`

Health check endpoint for monitoring.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2025-01-29T12:00:00.000Z",
  "service": "ai-random-number-generator"
}
```

## 🧪 Development Scripts

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run ESLint
npm run lint

# Type check
npx tsc --noEmit
```

## 🎨 Customization

### Change AI Model

Edit [`src/lib/openrouter.ts`](src/lib/openrouter.ts:5):
```typescript
const MODEL = "google/gemini-2.5-flash-lite"; // Change to any OpenRouter model
```

### Add More Count Options

Edit [`src/components/ControlPanel.tsx`](src/components/ControlPanel.tsx:40):
```tsx
<SelectItem value="1">1 number</SelectItem>
<SelectItem value="5">5 numbers</SelectItem>
<SelectItem value="30">30 numbers</SelectItem>
<SelectItem value="100">100 numbers</SelectItem> {/* Add new option */}
```

### Change Color Scheme

Edit [`tailwind.config.ts`](tailwind.config.ts) and [`src/app/globals.css`](src/app/globals.css)

## 📝 How It Works

1. **User clicks "Generate"**: Frontend sends POST request to `/api/generate` with count
2. **Backend creates SSE stream**: API route sets up Server-Sent Events connection
3. **AI generates numbers**: For each number (1 to count):
   - Backend calls OpenRouter API with Gemini model
   - AI generates a random number 1-100
   - Number is validated and sent as SSE event
4. **Frontend updates live**: Dashboard receives events and:
   - Increments histogram bin for that number
   - Updates progress indicator
   - Adds to raw numbers array
5. **Statistics calculated**: When done, stats panel shows:
   - Total numbers generated
   - Average value
   - Most/least frequent numbers
   - Unique numbers count

## 🤔 Why AI for Random Numbers?

This project explores whether AI models exhibit bias in "random" number generation. Traditional pseudo-random number generators (PRNGs) use deterministic algorithms, while humans show bias toward certain numbers. AI models, trained on human data, may show interesting patterns or achieve genuine randomness depending on their training and temperature settings.

## 💰 Cost Estimate

**OpenRouter API (Gemini 2.5 Flash Lite):**
- ~$0.01 per 1M tokens
- Each number generation: ~60 tokens
- 30 numbers: ~1,800 tokens ≈ $0.00002
- 1,000 generations (30,000 numbers): ~$0.60

**Railway Hosting:**
- Starter Plan: $5/month
- Includes: 512MB RAM, shared CPU, 100GB bandwidth

**Total Monthly Cost**: ~$5-10 (depending on usage)

## 🐛 Troubleshooting

### "OPENROUTER_API_KEY is not set"
- Make sure `.env.local` exists and contains your API key
- Restart the dev server after adding environment variables

### Numbers not streaming
- Check browser console for errors
- Verify API key is valid
- Check that `/api/generate` endpoint is accessible

### Build errors
- Delete `.next` folder and `node_modules`
- Run `npm install` again
- Check Node.js version (requires 18+)

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests

## 📄 License

MIT License - feel free to use this project for learning or commercial purposes.

## 🙏 Acknowledgments

- [OpenRouter](https://openrouter.ai/) for AI API access
- [shadcn/ui](https://ui.shadcn.com/) for beautiful components
- [Vercel](https://vercel.com/) for Next.js
- [Railway](https://railway.app/) for easy deployment

## 📧 Contact

Questions or feedback? Open an issue on GitHub!

---

Built with ❤️ using Next.js, TypeScript, and AI
