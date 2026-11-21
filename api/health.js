export default function handler(req, res) {
  const hasKey = Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'your_gemini_api_key_here');
  res.status(200).json({
    status: 'ok',
    service: 'BreatheWise AI Serverless Backend (Vercel)',
    hasGeminiKey: hasKey,
    timestamp: new Date().toISOString(),
  });
}

