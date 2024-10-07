import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleAIFileManager } from "@google/generative-ai/server";
import { NextApiRequest } from "next";
import {REQUEST} from "../chat/route";

export async function POST(request: REQUEST) {

    const genAI = new GoogleGenerativeAI(process.env.GEMINIAPI!);

    const fileManager = new GoogleAIFileManager(process.env.GEMINIAPI!);

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const uploadResponse = await fileManager.uploadFile("media/gemini.pdf", {
        mimeType: "application/pdf",
        displayName : "gemini.pdf"
    });

    console.log("uploadResponse:", uploadResponse.file.displayName, "as:" , uploadResponse.file.sha256Hash);

    return new Response("OK");
}