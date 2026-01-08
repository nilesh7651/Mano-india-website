const { GoogleGenerativeAI } = require("@google/generative-ai");

const SYSTEM_INSTRUCTION = `
You are the "Mano India Assistant" for a premium event management platform (Mano India).
Your tone is: Professional, Warm, Helpful, and Concise.
Your role: Help users with Venues, Artists, and general inquiries.

Key Information:
- Venues: Marriage Halls, Banquet Halls, Open Gardens. Price: 50k - 5L.
- Artists: Singers, Dancers, Musicians. Price: 15k - 5L.
- Booking: 20% advance required.
- Contact: support@manoindia.in.

Instructions:
1. Keep answers short (under 3 sentences per paragraph).
2. If asked about something outside events/Mano India, politely steer back to events.
3. Don't invent specific venue names or artist names, just describe categories.
`;

const DEFAULT_MODEL = process.env.GEMINI_MODEL || "models/gemini-flash-latest";
let resolvedModelName = null;

const normalizeModelName = (name) => {
    if (!name) return null;
    if (name.startsWith("models/")) return name;
    return `models/${name}`;
};

const listModels = async (apiKey) => {
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
        const message = data?.error?.message || `Failed to list models (HTTP ${response.status})`;
        throw new Error(message);
    }

    return data.models || [];
};

const resolveGenerativeModelName = async (apiKey) => {
    if (resolvedModelName) return resolvedModelName;

    const preferred = normalizeModelName(DEFAULT_MODEL);

    try {
        const models = await listModels(apiKey);
        const supportsGenerate = (m) => Array.isArray(m.supportedGenerationMethods) && m.supportedGenerationMethods.includes("generateContent");

        const exact = models.find((m) => m?.name === preferred && supportsGenerate(m));
        if (exact) {
            resolvedModelName = exact.name;
            return resolvedModelName;
        }

        const flashLatest = models.find((m) => m?.name === "models/gemini-flash-latest" && supportsGenerate(m));
        if (flashLatest) {
            resolvedModelName = flashLatest.name;
            return resolvedModelName;
        }

        const firstGemini = models.find((m) => (m?.name || "").startsWith("models/gemini-") && supportsGenerate(m));
        if (firstGemini) {
            resolvedModelName = firstGemini.name;
            return resolvedModelName;
        }

        throw new Error("No Gemini model available for generateContent on this API key.");
    } catch (e) {
        resolvedModelName = preferred;
        return resolvedModelName;
    }
};

const extractRetryAfterSeconds = (error) => {
    const details = error?.errorDetails;
    if (!Array.isArray(details)) return null;
    const retryInfo = details.find((d) => d?.["@type"] === "type.googleapis.com/google.rpc.RetryInfo");
    const delay = retryInfo?.retryDelay;
    if (typeof delay !== "string") return null;
    const match = delay.match(/^(\d+)s$/);
    if (!match) return null;
    return Number(match[1]);
};

const handleChat = async (req, res) => {
    try {
        const { history, message } = req.body;
        const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY; // Fallback to VITE_ if copied directly

        if (!apiKey) {
            console.error("Gemini API Key is missing in backend env");
            return res.status(500).json({ error: "Service configuration error" });
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const modelName = await resolveGenerativeModelName(apiKey);
        const model = genAI.getGenerativeModel({
            model: modelName,
            systemInstruction: SYSTEM_INSTRUCTION
        });

        const chat = model.startChat({
            history: [
                {
                    role: "user",
                    parts: [{ text: SYSTEM_INSTRUCTION }],
                },
                {
                    role: "model",
                    parts: [{ text: "Understood. I am Mano India Assistant. I will assist users with venues, artists, and event planning professionally and concisely." }],
                },
                ...(history || []).map(msg => ({
                    role: msg.role === 'bot' ? 'model' : 'user',
                    parts: [{ text: msg.content }]
                }))
            ],
        });

        const result = await chat.sendMessage(message);
        const responseText = result.response.text();

        res.json({ response: responseText });

    } catch (error) {
        console.error("Gemini Chat Error:", error);

        if (error?.status === 429) {
            const retryAfterSeconds = extractRetryAfterSeconds(error);
            if (retryAfterSeconds != null) {
                res.set("Retry-After", String(retryAfterSeconds));
            }
            return res.status(429).json({
                error: "Gemini rate limit / quota exceeded",
                retryAfterSeconds,
            });
        }

        res.status(500).json({ error: "Failed to generate response" });
    }
};

module.exports = { handleChat };
