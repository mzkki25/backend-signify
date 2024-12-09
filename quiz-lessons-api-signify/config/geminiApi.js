import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

// Fungsi untuk menghasilkan teks berdasarkan prompt
async function generateAIResponse(prompt) {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(prompt);

        return result.response.text();
    } catch (error) {
        console.error("Error generating content:", error.message);
        return null;
    }
}

// Contoh penggunaan fungsi
const prompt = "Explain how AI works";
generateAIResponse(prompt).then((response) => {
    if (response) {
        console.log("Generated Text:", response);
    } else {
        console.log("Failed to generate content.");
    }
});
