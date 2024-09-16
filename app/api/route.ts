import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextApiRequest, NextApiResponse } from "next";

interface REQUEST extends NextApiRequest {
    json(): Promise<any>;
}


export async function POST( request: REQUEST) {
    
const genAI = new GoogleGenerativeAI(process.env.GEMINIAPI!);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const reqPrompt = await request.json();

const prompt = reqPrompt.data.prompt;


const result = await model.generateContent(prompt);
console.log(result.response.text());
    return new Response(
            result.response.text()
    );
}
