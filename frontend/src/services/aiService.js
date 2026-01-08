import API from "./api";

/**
 * Sends the user message and chat history to the backend for processing.
 * @param {Array} history - The chat history (excluding the current user message).
 * @param {string} userMessage - The current user message.
 * @returns {Promise<Object>} - The response object containing text and suggestions.
 */
export const getGeminiResponse = async (history, userMessage) => {
    try {
        const response = await API.post("/chat", {
            history,
            message: userMessage
        });

        // Backend should return { response: "text" }
        return {
            response: response.data.response,
            suggestedActions: []
        };

    } catch (error) {
        console.error("Gemini API/Server Error:", error);

        let errorMessage = "I'm having trouble connecting to the server. Please try again later.";

        if (error.response) {
            // Server responded with a status code outside of 2xx
            if (error.response.status === 404) {
                errorMessage = "Chat service endpoint not found. Please ensure backend is updated.";
            } else if (error.response.data && error.response.data.error) {
                errorMessage = `Server Error: ${error.response.data.error}`;
            }
        }

        return {
            response: errorMessage,
            suggestedActions: ["Retry", "Contact Support"]
        };
    }
};
