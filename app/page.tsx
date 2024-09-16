'use client';
import Image from "next/image";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState } from "react";
import axios from 'axios';
import type { FormEvent } from "react";
import { Button } from "@/components/ui/button";

export default function Home() {

const [prompt, setPrompt] = useState<string | undefined>(undefined);
const [res, setRes] = useState<string | undefined>(undefined);
const [question, setQuestion] = useState<string | undefined>(undefined);
const [loading , setLoading] = useState<boolean>(false);

const handleSubmit = async (e : FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setQuestion(prompt);
  setLoading(true);
  axios.post('/api', {
    data : {
      prompt: prompt
    }
  }).then((response) => {
    setRes(response.data)
  }).then(() => {
  setPrompt(undefined);
  setLoading(false);
  })
}

  return (
  <div className="bg-black p-10 overflow-y-scroll">
    <div className="p-10 rounded-3xl bg-gray-500 bg-opacity-50">
      {!loading ?
      <>
      {res !== undefined ?
      <div className="flex flex-col gap-5">
      <p className="text-3xl font-bold">&gt; {question}</p>
       <p className="text-2xl">
        <span className="font-bold">Gemini : </span>
        {res}</p>
      </div>
       : 
       <p className="text-2xl text-center">How can i help you</p>}
       </> :
       <div className="animate-pulse w-full bg-black"></div>
      }
      
    </div>
      <form className="p-10  flex flex-row  gap-5 justify-center absolute bottom-0 w-full" method="post" onSubmit={handleSubmit}>
      <input onChange={(e) => setPrompt(e.target.value)} value={prompt} 
      className="bg-gray-700 px-5 py-3 rounded-3xl text-opacity-50 bg-opacity-50 w-3/4 h-full text-center"
       name="prompt" type="text" placeholder="Enter a prompt" autoComplete="off"/>
      <Button className="border-gray-500 border-2 rounded-3xl px-5 py-3 h-full font-bold " type="submit">Submit</Button>
    </form>
  </div>
  );
}
