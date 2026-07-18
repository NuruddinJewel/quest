export interface ChatMessage {
    role: "user" | "model";
    text: string;
}

const STORAGE_KEY = "gaming-oasis-chat-history";

export function loadChatHistory(): ChatMessage[] {
    if (typeof window === "undefined") return [];
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? (JSON.parse(raw) as ChatMessage[]) : [];
    } catch {
        return [];
    }
}

export function saveChatHistory(messages: ChatMessage[]): void {
    if (typeof window === "undefined") return;
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
        // storage quota 
    }
}

export function clearChatHistory(): void {
    if (typeof window === "undefined") return;
    localStorage.removeItem(STORAGE_KEY);
}