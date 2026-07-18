// import { GoogleGenAI } from "@google/genai";

//Gemini Server Side
// const apiKey = process.env.GEMINI_API_KEY;

// if (!apiKey) {
//     throw new Error("GEMINI_API_KEY is missing from environment variables.");
// }

// export const ai = new GoogleGenAI({ apiKey });

// export const CHAT_MODEL = "gemini-2.5-flash";

// gemini-2.5-flash (unavailable)
//gemini-3.1-flash-lite
//gemini-3.5-flash

//Latest Model

import { GoogleGenAI } from "@google/genai";

//Gemini Server Side
const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
    throw new Error("GEMINI_API_KEY is missing from environment variables.");
}

export const ai = new GoogleGenAI({ apiKey });

// export const CHAT_MODEL = "gemini-flash-latest";
export const CHAT_MODEL = "gemini-3.1-flash-lite";

