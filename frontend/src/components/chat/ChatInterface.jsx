import { useState, useRef, useEffect } from 'react';
import { SendHorizontal, LoaderCircle, X, MessageSquare, Minimize2, ChevronDown } from 'lucide-react';
import { ChatMessage } from './ChatMessage';
import { cn } from "../../lib/utils";
import { CHAT_DATA } from './chatData';
import { getGeminiResponse } from '../../services/aiService';
import { useNavigate } from 'react-router-dom';

const QuickReplies = ({ replies, onReplyClick, disabled }) => {
    if (!replies || replies.length === 0) return null;

    return (
        <div className="flex flex-wrap items-center justify-start gap-2 p-4 animate-fadeIn">
            {replies.map((reply) => (
                <button
                    key={reply}
                    className="rounded-full border border-amber-500/30 text-amber-500 bg-black/40 hover:bg-amber-500/10 backdrop-blur-sm transition-all duration-300 transform hover:scale-105 px-3 py-1.5 text-xs md:text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
                    onClick={() => onReplyClick(reply)}
                    disabled={disabled}
                >
                    {reply}
                </button>
            ))}
        </div>
    );
};

const TypingIndicator = () => (
    <div className="flex items-center gap-1 p-4 bg-secondary/40 backdrop-blur-sm rounded-2xl rounded-bl-none border border-amber-500/10 w-fit animate-slideInLeft">
        <div className="w-2 h-2 rounded-full bg-amber-500/60 animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-2 h-2 rounded-full bg-amber-500/60 animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-2 h-2 rounded-full bg-amber-500/60 animate-bounce"></div>
    </div>
);

export default function ChatInterface() {
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isPending, setIsPending] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const scrollAreaRef = useRef(null);
    const navigate = useNavigate();

    // Initialize with greeting
    useEffect(() => {
        if (messages.length === 0) {
            const greeting = CHAT_DATA.greeting;
            setMessages([{
                id: 'init',
                role: 'bot',
                content: greeting.message,
                quickReplies: greeting.options,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }]);
        }
    }, []);

    useEffect(() => {
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTo({
                top: scrollAreaRef.current.scrollHeight,
                behavior: "smooth"
            });
        }
    }, [messages, isOpen, isMinimized, isTyping]);

    const processResponse = async (text) => {
        const lowerText = text.toLowerCase();

        // Normalize logic to find key in CHAT_DATA
        let matchKey = 'default';

        // Direct match check
        if (CHAT_DATA[lowerText]) {
            matchKey = lowerText;
        } else {
            // Keyword match check
            const keys = Object.keys(CHAT_DATA);
            for (const key of keys) {
                if (lowerText.includes(key)) {
                    matchKey = key;
                    break;
                }
            }
        }

        const data = CHAT_DATA[matchKey];

        // Handle Navigation actions
        if (data.options.includes("Go to Venues Page")) navigate('/venues');
        if (data.options.includes("Go to Dashboard")) navigate('/dashboard');
        if (data.options.includes("Read Full Policy")) navigate('/refund-policy');
        if (data.options.includes("View Artists")) navigate('/artists');

        return {
            response: data.message,
            suggestedActions: data.options.filter(opt => !opt.startsWith('Go to') && !opt.startsWith('Read'))
        };
    };

    const handleSendMessage = async (messageContent) => {
        if (!messageContent.trim()) return;

        const userMessage = {
            id: String(Date.now()),
            role: 'user',
            content: messageContent,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput('');
        setIsPending(true);
        setIsTyping(true);

        try {
            const res = await processResponse(messageContent);

            let botResponse = res.response;
            let suggestedActions = res.suggestedActions;

            // If it's a generic default response, try AI
            if (botResponse.startsWith("I didn't quite catch that")) {
                // Filter history for context (exclude quick replies)
                const history = messages.map(m => ({ role: m.role, content: m.content }));
                const aiRes = await getGeminiResponse(history, messageContent);
                botResponse = aiRes.response;
                if (aiRes.suggestedActions?.length > 0) suggestedActions = aiRes.suggestedActions;
            }

            setIsTyping(false);
            const botMessage = {
                id: String(Date.now() + 1),
                role: 'bot',
                content: botResponse,
                quickReplies: suggestedActions,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages((prev) => [...prev, botMessage]);
        } catch (error) {
            setIsTyping(false);
            setMessages((prev) => [...prev, {
                id: String(Date.now() + 1),
                role: 'bot',
                content: "I'm having a bit of trouble connecting to my brain. Please try again.",
                quickReplies: ["Retry"],
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }]);
        } finally {
            setIsPending(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleSendMessage(input);
    };

    const handleQuickReplyClick = (reply) => {
        handleSendMessage(reply);
    };

    const lastMessage = messages[messages.length - 1];
    const lastBotMessageWithReplies = lastMessage?.role === 'bot' && lastMessage.quickReplies;

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-4 right-4 md:bottom-8 md:right-8 h-12 w-12 md:h-14 md:w-14 rounded-full bg-gradient-to-r from-amber-600 to-amber-500 text-white shadow-[0_0_20px_rgba(245,158,11,0.5)] flex items-center justify-center hover:scale-110 transition-transform duration-300 z-50 group"
            >
                <MessageSquare className="h-5 w-5 md:h-6 md:w-6 group-hover:animate-pulse" />
                <div className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full animate-bounce border border-black"></div>
            </button>
        );
    }

    return (
        <div className={cn(
            "fixed z-50 transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1) bg-black/95 backdrop-blur-xl border border-amber-500/20 shadow-2xl overflow-hidden flex flex-col",
            isMinimized
                ? "bottom-4 right-4 w-80 h-16 rounded-full cursor-pointer hover:bg-black/100" // Increased width/height, added cursor
                : "bottom-0 right-0 w-full h-[100dvh] md:bottom-4 md:right-4 md:w-[400px] md:h-[600px] md:rounded-2xl"
        )}
            onClick={() => isMinimized && setIsMinimized(false)} // Click anywhere to expand if minimized
        >
            {/* Header */}
            <div
                className={cn(
                    "flex items-center justify-between bg-gradient-to-r from-amber-900/40 via-black to-black select-none transition-all duration-300",
                    isMinimized ? "p-2 pl-3 border-none h-full" : "p-3 md:p-4 border-b border-amber-500/10 cursor-pointer"
                )}
                onClick={(e) => {
                    if (!isMinimized) {
                        // If open, clicking header minimizes it
                        setIsMinimized(true);
                    }
                    // If minimized, the parent onClick handles expansion, but we don't stop propagation here so it flows up.
                }}
            >
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <div className="h-2.5 w-2.5 bg-green-500 rounded-full absolute bottom-0 right-0 border-2 border-black z-10"></div>
                        <div className={cn(
                            "rounded-full bg-gradient-to-br from-amber-400 to-amber-700 flex items-center justify-center text-black font-bold shadow-lg shadow-amber-500/20 ring-1 ring-amber-500/50 transition-all",
                            isMinimized ? "h-10 w-10" : "h-9 w-9 md:h-10 md:w-10"
                        )}>
                            M
                        </div>
                    </div>
                    <div>
                        <h3 className="font-bold text-amber-500 text-sm md:text-base tracking-wide">Mano Assistant</h3>
                        <span className="text-[10px] md:text-xs text-amber-500/60 font-medium uppercase tracking-wider">Online</span>
                    </div>
                </div>
                <div className="flex items-center gap-1">
                    {!isMinimized && (
                        <button
                            onClick={(e) => { e.stopPropagation(); setIsMinimized(true); }}
                            className="p-2 hover:bg-white/10 rounded-full text-amber-500/70 hover:text-amber-500 transition-colors"
                        >
                            <Minimize2 size={18} />
                        </button>
                    )}

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            // If minimized, 'X' should probably just close it completely (setIsOpen false)
                            // If open, 'X' closes it completely
                            setIsOpen(false);
                            setIsMinimized(false);
                        }}
                        className="p-2 hover:bg-red-500/20 rounded-full text-amber-500/70 hover:text-red-500 transition-colors"
                    >
                        <X size={18} />
                    </button>
                </div>
            </div>

            {!isMinimized && (
                <>
                    <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-amber-500/20 scrollbar-track-transparent pb-4" ref={scrollAreaRef}>
                        {messages.map((message) => (
                            <ChatMessage
                                key={message.id}
                                role={message.role}
                                content={message.content}
                                timestamp={message.timestamp}
                            />
                        ))}
                        {isTyping && <TypingIndicator />}
                    </div>

                    <div className="flex-shrink-0 bg-black/60 backdrop-blur-md border-t border-amber-500/20">
                        {lastBotMessageWithReplies && !isPending && !isTyping && (
                            <QuickReplies
                                replies={lastMessage.quickReplies}
                                onReplyClick={handleQuickReplyClick}
                                disabled={isPending || isTyping}
                            />
                        )}

                        <form onSubmit={handleSubmit} className="p-3 md:p-4">
                            <div className="relative group">
                                <input
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Type your message..."
                                    className="w-full rounded-full bg-white/5 border border-amber-500/20 focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/30 pr-12 h-11 md:h-12 text-sm pl-5 text-gray-200 placeholder-gray-500 transition-all outline-none"
                                    disabled={isPending || isTyping}
                                />
                                <button
                                    type="submit"
                                    disabled={isPending || isTyping || !input.trim()}
                                    className="absolute right-1.5 top-1/2 -translate-y-1/2 h-8 w-8 md:h-9 md:w-9 rounded-full bg-amber-500 hover:bg-amber-400 text-black flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-amber-500/20 active:scale-95"
                                >
                                    {isPending ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <SendHorizontal className="h-4 w-4" />}
                                </button>
                            </div>
                        </form>
                    </div>
                </>
            )}
        </div>
    );
}
