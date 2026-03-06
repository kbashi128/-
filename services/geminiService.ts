
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getCreativePrompt = async (field: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `أنت مساعد إبداعي لـ "منصة مبدعون". اقترح موضوعاً إبداعياً جديداً للكتابة أو الرسم في مجال ${field}. اجعل الاقتراح ملهماً للشباب.`,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "واصل الإبداع، العالم ينتظر نصوصك!";
  }
};
