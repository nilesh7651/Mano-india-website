import { cn } from "../../lib/utils";
import { Bot, User } from "lucide-react";

export function ChatMessage({ role, content, timestamp }) {
    const isBot = role === 'bot';
    return (
        <div className={cn("flex items-end gap-3 w-full animate-slideInUp", isBot ? "justify-start" : "justify-end")}>
            {isBot && (
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gradient-to-br from-amber-500/10 to-amber-900/10 flex items-center justify-center text-amber-500 mb-4 border border-amber-500/30 shadow-[0_0_10px_rgba(245,158,11,0.1)]">
                    <Bot size={18} />
                </div>
            )}
            <div className={cn("flex flex-col", isBot ? "items-start" : "items-end")}>
                <div
                    className={cn(
                        "max-w-[85%] md:max-w-[280px] lg:max-w-[320px] rounded-2xl p-3 md:p-4 shadow-lg transition-all duration-300",
                        isBot
                            ? "bg-black/40 backdrop-blur-md rounded-bl-none border border-amber-500/20 text-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
                            : "bg-gradient-to-br from-amber-500 to-amber-600 text-black font-semibold rounded-br-none shadow-[0_4px_15px_rgba(245,158,11,0.3)]"
                    )}
                >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{content}</p>
                </div>
                {timestamp && (
                    <span className="text-[10px] text-gray-500 mt-1 px-1">{timestamp}</span>
                )}
            </div>
            {!isBot && (
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-amber-500 flex items-center justify-center text-black mb-4 shadow-lg shadow-amber-500/20">
                    <User size={18} />
                </div>
            )}
        </div>
    );
}
