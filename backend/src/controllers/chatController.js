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

const handleChat = async (req, res) => {
    try {
        const { history, message } = req.body;
        const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY; // Fallback to VITE_ if copied directly

        if (!apiKey) {
            console.error("Gemini API Key is missing in backend env");
            return res.status(500).json({ error: "Service configuration error" });
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        // Use gemini-pro which is stable and available in v1beta
        const model = genAI.getGenerativeModel({
            model: "gemini-pro",
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
        res.status(500).json({ error: "Failed to generate response" });
    }
};

module.exports = { handleChat };
