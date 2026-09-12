const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export const generatePostFromTopic = async ({ topic, tone = 'professional', language = 'en' }) => {
  if (!GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is not configured');
  }

  const prompt = `You are an expert social media copywriter. Generate a concise, engaging X post based on the user's topic. Requirements:
- Tone: ${tone}
- Language: ${language}
- Maximum length: 280 characters
- Make it polished, readable, and suitable for X
- Do not include hashtags unless they are helpful
- Topic: ${topic}`;

  const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=' + GEMINI_API_KEY, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [{ text: prompt }],
        },
      ],
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData?.error?.message || 'Gemini request failed');
  }

  const data = await response.json();
  const generatedText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!generatedText) {
    throw new Error('Gemini returned no generated content');
  }

  return generatedText.trim();
};

export const improvePost = async ({ content, tone = 'professional', language = 'en' }) => {
  if (!GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is not configured');
  }

  const prompt = `Rewrite and improve the following X post. Keep the core meaning but make it stronger, clearer, and more engaging.
- Tone: ${tone}
- Language: ${language}
- Maximum length: 280 characters

Original post:
${content}`;

  const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=' + GEMINI_API_KEY, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [{ text: prompt }],
        },
      ],
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData?.error?.message || 'Gemini improve request failed');
  }

  const data = await response.json();
  const improvedText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!improvedText) {
    throw new Error('Gemini returned no improved content');
  }

  return improvedText.trim();
};
