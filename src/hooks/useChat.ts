"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { ChatMessage, loadChatHistory, saveChatHistory, clearChatHistory } from "@/lib/ai/chatMemory";

export function useChat() {
    const { data: session } = authClient.useSession();
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [sending, setSending] = useState(false);

    // Memory History
    useEffect(() => {
        setMessages(loadChatHistory());
    }, []);

    // Persist
    useEffect(() => {
        if (messages.length > 0) saveChatHistory(messages);
    }, [messages]);

    const sendMessage = async (text: string) => {
        if (!text.trim() || sending) return;

        const userMessage: ChatMessage = { role: "user", text };
        const nextMessages = [...messages, userMessage];
        setMessages(nextMessages);
        setSending(true);

        try {
            const res = await fetch("/api/ai/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: text,
                    history: messages, //User Manage
                    buyerId: session?.user?.id,
                }),
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.error || "Something went wrong");

            setMessages((prev) => [...prev, { role: "model", text: data.reply }]);
        } catch (err) {
            setMessages((prev) => [
                ...prev,
                { role: "model", text: "দুঃখিত, এই মুহূর্তে সাড়া দিতে পারছি না। একটু পরে আবার চেষ্টা করো।" },
            ]);
        } finally {
            setSending(false);
        }
    };

    const resetChat = () => {
        setMessages([]);
        clearChatHistory();
    };

    return { messages, sending, sendMessage, resetChat };
}