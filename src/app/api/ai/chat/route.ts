// import { NextRequest, NextResponse } from "next/server";
// import { ai, CHAT_MODEL } from "@/lib/ai/provider";
// import { chatToolDeclarations, executeTool } from "@/lib/ai/chatTools";
// import type { Content } from "@google/genai";

// const SYSTEM_INSTRUCTION = `তুমি Gaming Oasis-এর AI সহকারী — একটা premium game CD marketplace।
// তুমি ইউজারকে গেম খুঁজতে, দাম জানতে, আর তাদের নিজের অর্ডার স্ট্যাটাস চেক করতে সাহায্য করো।
// সংক্ষিপ্ত, বন্ধুত্বপূর্ণ, এবং gaming-culture-friendly টোনে উত্তর দাও। দরকার হলে দেওয়া tools ব্যবহার করো, অনুমান করে উত্তর দিও না।`;

// export async function POST(req: NextRequest) {
//     try {
//         const { message, history, buyerId } = await req.json();

//         if (!message || typeof message !== "string") {
//             return NextResponse.json({ error: "Message is required" }, { status: 400 });
//         }

//         // client থেকে আসা history (role/text) কে Gemini-র Content ফরম্যাটে রূপান্তর
//         const contents: Content[] = [
//             ...(Array.isArray(history)
//                 ? history.map((m: { role: "user" | "model"; text: string }) => ({
//                     role: m.role,
//                     parts: [{ text: m.text }],
//                 }))
//                 : []),
//             { role: "user", parts: [{ text: message }] },
//         ];

//         let response = await ai.models.generateContent({
//             model: CHAT_MODEL,
//             contents,
//             config: {
//                 systemInstruction: SYSTEM_INSTRUCTION,
//                 tools: [{ functionDeclarations: chatToolDeclarations }],
//             },
//         });

//         // 🔁 মডেল যদি কোনো tool কল করতে চায়, সেটা রান করে আবার মডেলকে ফলাফল ফেরত দাও
//         let loopCount = 0;
//         while (response.functionCalls && response.functionCalls.length > 0 && loopCount < 3) {
//             const call = response.functionCalls[0];
//             const toolResult = await executeTool(call.name!, call.args || {}, { buyerId });

//             contents.push({
//                 role: "model",
//                 parts: [{ functionCall: { name: call.name, args: call.args } }],
//             });
//             contents.push({
//                 role: "user",
//                 parts: [
//                     {
//                         functionResponse: {
//                             name: call.name!,
//                             response: { result: toolResult },
//                         },
//                     },
//                 ],
//             });

//             response = await ai.models.generateContent({
//                 model: CHAT_MODEL,
//                 contents,
//                 config: {
//                     systemInstruction: SYSTEM_INSTRUCTION,
//                     tools: [{ functionDeclarations: chatToolDeclarations }],
//                 },
//             });

//             loopCount++;
//         }

//         return NextResponse.json({ reply: response.text || "দুঃখিত, উত্তর তৈরি করতে পারিনি।" });
//     } catch (error: unknown) {
//         console.error("AI chat error:", error);
//         return NextResponse.json({ error: "AI assistant is temporarily unavailable." }, { status: 500 });
//     }
// }

//Updated

import { NextRequest, NextResponse } from "next/server";
import { ai, CHAT_MODEL } from "@/lib/ai/provider";
import { chatToolDeclarations, executeTool } from "@/lib/ai/chatTools";
import type { Content } from "@google/genai";

const SYSTEM_INSTRUCTION = `তুমি Gaming Oasis-এর AI সহকারী — একটা premium game CD marketplace।
তুমি ইউজারকে গেম খুঁজতে, দাম জানতে, আর তাদের নিজের অর্ডার স্ট্যাটাস চেক করতে সাহায্য করো।
সংক্ষিপ্ত, বন্ধুত্বপূর্ণ, এবং gaming-culture-friendly টোনে উত্তর দাও। দরকার হলে দেওয়া tools ব্যবহার করো, অনুমান করে উত্তর দিও না।
 
Language rule: ইউজার যেই ভাষায় প্রশ্ন করবে, ঠিক সেই ভাষাতেই উত্তর দাও।
- ইউজার ইংরেজিতে জিজ্ঞেস করলে → পুরো উত্তর ইংরেজিতে দাও।
- ইউজার বাংলায় (বাংলা লিপি বা Banglish/রোমান হরফে বাংলা) জিজ্ঞেস করলে → বাংলাতেই উত্তর দাও।
- মাঝপথে ভাষা বদলিও না, আর দুই ভাষা মিশিয়ে উত্তর দিও না।`;


export async function POST(req: NextRequest) {
    try {
        const { message, history, buyerId } = await req.json();

        if (!message || typeof message !== "string") {
            return NextResponse.json({ error: "Message is required" }, { status: 400 });
        }

        // client (Context)
        const contents: Content[] = [
            ...(Array.isArray(history)
                ? history.map((m: { role: "user" | "model"; text: string }) => ({
                    role: m.role,
                    parts: [{ text: m.text }],
                }))
                : []),
            { role: "user", parts: [{ text: message }] },
        ];

        let response = await ai.models.generateContent({
            model: CHAT_MODEL,
            contents,
            config: {
                systemInstruction: SYSTEM_INSTRUCTION,
                tools: [{ functionDeclarations: chatToolDeclarations }],
            },
        });

        // Model tool Call
        let loopCount = 0;
        while (response.functionCalls && response.functionCalls.length > 0 && loopCount < 3) {
            const call = response.functionCalls[0];
            const toolResult = await executeTool(call.name!, call.args || {}, { buyerId });

            //Thinkin Model (latest)
            const modelContent = response.candidates?.[0]?.content;
            if (modelContent) {
                contents.push(modelContent);
            }

            contents.push({
                role: "user",
                parts: [
                    {
                        functionResponse: {
                            name: call.name!,
                            response: { result: toolResult },
                        },
                    },
                ],
            });

            response = await ai.models.generateContent({
                model: CHAT_MODEL,
                contents,
                config: {
                    systemInstruction: SYSTEM_INSTRUCTION,
                    tools: [{ functionDeclarations: chatToolDeclarations }],
                },
            });

            loopCount++;
        }

        return NextResponse.json({ reply: response.text || "দুঃখিত, উত্তর তৈরি করতে পারিনি।" });
    }
    // catch (error: unknown) {
    //     console.error("AI chat error:", error);
    //     return NextResponse.json({ error: "AI assistant is temporarily unavailable." }, { status: 500 });
    // }
    catch (error: unknown) {
        console.error("AI chat error:", error);

        const isRateLimit = error instanceof Error && error.message.includes("429");

        return NextResponse.json(
            {
                error: isRateLimit
                    ? "একটু বেশি দ্রুত মেসেজ পাঠাচ্ছো! কিছুক্ষণ অপেক্ষা করে আবার চেষ্টা করো। 🙏"
                    : "AI assistant is temporarily unavailable.",
            },
            { status: 500 }
        );
    }
}