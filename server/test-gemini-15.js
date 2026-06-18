import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
dotenv.config();

async function testGemini15Pro() {
  if (!process.env.GEMINI_API_KEY) {
    console.error('No GEMINI_API_KEY found in .env');
    process.exit(1);
  }
  
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-1.5-pro',
      contents: 'Hello, are you gemini-1.5-pro?',
    });
    console.log('SUCCESS: ', response.text);
  } catch (err) {
    console.error('ERROR: ', err.message);
  }
}

testGemini15Pro();
