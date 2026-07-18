import { ChatMessage as ChatMessageType } from "@/lib/ai/chatMemory";
import { IoGameControllerOutline } from "react-icons/io5";

interface ChatMessageProps {
    message: ChatMessageType;
}

export default function ChatMessage({ message }: ChatMessageProps) {
    const isUser = message.role === "user";

    return (
        <div className={`flex items-start gap-2.5 ${isUser ? "justify-end" : "justify-start"}`}>
            {!isUser && (
                <div className="w-7 h-7 shrink-0 rounded-full bg-cyan/10 border border-cyan/30 flex items-center justify-center text-cyan text-sm">
                    <IoGameControllerOutline />
                </div>
            )}
            <div
                className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap
                    ${isUser
                        ? "bg-cyan text-obsidian rounded-br-sm font-medium"
                        : "bg-carbon border border-gray-800 text-ivory rounded-bl-sm"
                    }`}
            >
                {message.text}
            </div>
        </div>
    );
}