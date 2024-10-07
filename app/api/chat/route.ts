import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleAIFileManager } from "@google/generative-ai/server";
import { NextApiRequest} from "next";

export interface REQUEST extends NextApiRequest {
    json(): Promise<{ data: { prompt: string } }>;
}


export async function POST( request: REQUEST) {
    
const genAI = new GoogleGenerativeAI(process.env.GEMINIAPI!);

const fileManager = new GoogleAIFileManager(process.env.GEMINIAPI!);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const reqPrompt = await request.json();

const prompt = reqPrompt.data.prompt;


const result = await model.generateContent(prompt);
    return new Response(
            result.response.text()
    );
}
