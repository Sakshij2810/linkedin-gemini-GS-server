// controllers/geminiController.js
import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from "axios";

const genAI = new GoogleGenerativeAI(process.env.GEN_AI_API_KEY);

function bufferToGenerativePart(buffer, mimeType) {
  return {
    inlineData: {
      data: buffer.toString("base64"),
      mimeType,
    },
  };
}

async function downloadImage(url) {
  const response = await axios.get(url, { responseType: "arraybuffer" });
  const mimeType = response.headers["content-type"];
  return { buffer: Buffer.from(response.data), mimeType };
}

export const generateGeminiContent = async (req, res) => {
  try {
    const { title, imageUrls } = req.body;
    console.log(title, imageUrls);

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const imageParts = await Promise.all(
      imageUrls.map(async (url) => {
        const { buffer, mimeType } = await downloadImage(url);
        return bufferToGenerativePart(buffer, mimeType);
      })
    );

    const result = await model.generateContent([title, ...imageParts]);
    const response = await result.response;
    const text = await response.text();

    res.status(200).json(text);
  } catch (error) {
    // console.error("Error generating content with Gemini API:", error);
    res.status(500).json({ error: error.message });
  }
};
