'use client';
import { useState } from "react";
import axios from 'axios';
import type { FormEvent } from "react";
import { Button } from "@/components/ui/button";
import showdown from 'showdown';
import Image from "next/image";


export default function Home() {

const [prompt, setPrompt] = useState<string>("");
const [res, setRes] = useState<Array<string>>([]);
const [question, setQuestion] = useState<Array<string>>([]);
const [loading , setLoading] = useState<boolean>(false);
const [scroll, setScroll] =  useState<boolean>(false);

if(scroll){
  window.scrollTo(0, document.body.scrollHeight);
  setScroll(false);
}

const handleSubmit = async (e : FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  if(!prompt) return;
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
  setScroll(true);
  })
}
  

  return (
  <div className="bg-black p-10 lg:px-72 overflow-y-scroll flex flex-col justify-center items-center">
    <div className="p-10 rounded-3xl w-full flex flex-col gap-10 ">
      {!loading ?
      <>
      {res.length !== 0 ?
      <>
      {res.map((result , i) => {
        const converter = new showdown.Converter();
        const html = converter.makeHtml(result);
        const id = i.toString();
      
        
        return (
          <div key={i} className="flex border-b-2 border-black py-10 lg:w-full flex-col gap-5">
            <div>
      <p className="text-3xl font-bold border-b-2 flex flex-col lg:w-full border-black w-fit items-end justify-end gap-5">
        <Image src="/User.png" width={50} height={50} alt="User" />
        <span className="bg-white bg-opacity-20 px-5 py-3 rounded-3xl"> {question[i]}</span>
        
         </p>
         </div>
         <div className="flex flex-col gap-5">
          <Image src="/Gemini.png" width={50} height={50} alt="Gemini" />
       <p className="text-2xl w-fit bg-white bg-opacity-20 rounded-3xl px-5 py-3">
          <span  id={i.toString()} dangerouslySetInnerHTML={{__html: html}}></span>
        </p>
        </div>
      </div>
        )
      })
      
}
      </>
       : 
       <div className=" flex flex-col justify-start w-full h-1/2 gap-5">
       <Image src="/Gemini.png" width={50} height={50} alt="Gemini" />
       <p className="text-2xl bg-opacity-20 bg-white px-5 py-3 rounded-3xl w-fit ">How can i help you</p>
       </div>
       }
       </> :
       <div className=" flex justify-center h-1/2 text-opacity-50 ">
        <span className=" animate-spin">
          <Image src="/Gemini.png" width={50} height={50} alt="Gemini" />
        </span>
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
