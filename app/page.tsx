'use client';
import { useState } from "react";
import axios from 'axios';
import type { FormEvent } from "react";
import { Button } from "@/components/ui/button";
import showdown from 'showdown';


export default function Home() {

const [prompt, setPrompt] = useState<string>("");
const [res, setRes] = useState<Array<string>>([]);
const [question, setQuestion] = useState<Array<string>>([]);
const [loading , setLoading] = useState<boolean>(false);



const handleSubmit = async (e : FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const prevQuestion = [...question, prompt]
  setQuestion(prevQuestion);
  setLoading(true);
  axios.post('/api', {
    data : {
      prompt: prompt
    }
  }).then((response ) => {
    const result = [...res, response.data]
    setRes(result);
    
    
  }).then(() => {
  setLoading(false);
  })
}

  return (
  <div className="bg-black p-10 lg:px-72 overflow-y-scroll flex flex-col justify-center items-center">
    <div className="p-10 rounded-3xl bg-gray-500 flex flex-col gap-10 bg-opacity-50">
      {!loading ?
      <>
      {res.length !== 0 ?
      <>
      {res.map((result , i) => {
        const converter = new showdown.Converter();
        const html = converter.makeHtml(result);
        return (
          <div key={i} className="flex border-b-2 border-black py-10 items-center flex-col gap-5">
      <p className="text-3xl font-bold border-b-2 border-black w-fit text-center bg-black rounded-3xl px-5 py-3"> {question[i]}</p>
       <p className="text-2xl bg-black rounded-3xl px-5 py-3">
        <span className="font-bold">Gemini : </span>
          <span  id={i.toString()} dangerouslySetInnerHTML={{__html: html}}></span>
        </p>
      </div>
        )
      })
      
}
      </>
       : 
       <p className="text-2xl text-center">How can i help you</p>}
       </> :
       <div className=" flex justify-center h-1/2 text-opacity-50 ">
        <span className="text-3xl bg-black animate-pulse rounded-3xl px-5 py-3">Loading...</span>
        </div>
      }
      
    </div>
      <form className="p-10  flex flex-row fixed z-10 gap-5 justify-center bottom-0 w-full" method="post" onSubmit={handleSubmit}>
      <input onChange={(e) => setPrompt(e.target.value)} value={prompt} 
      className="bg-gray-700 px-5 py-3 rounded-3xl text-opacity-50  w-1/3 h-full text-center"
       name="prompt" type="text" placeholder="Enter a prompt" autoComplete="off"/>
      <Button className="border-gray-500 border-2 rounded-3xl px-5 py-3 h-full font-bold " type="submit">Submit</Button>
    </form>
  </div>
  );
}
