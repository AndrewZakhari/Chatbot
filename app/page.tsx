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
  <div className="bg-black lg:p-10 lg:px-72 overflow-y-scroll flex flex-col justify-center items-center">
    <div id="headerDiv" className="bg-gradient-to-r from-fuchsia-500 to-blue-700 bg-clip-text">
      <h1 id="header" className="text-5xl lg:text-6xl py-10 px-5 text-transparent ">Creative AI</h1>
    <div id="header's underline" className="w-full h-0.5 bg-gradient-to-r from-fuchsia-500 to-blue-700 text-transparent">h</div>      
    </div>
    <div className="p-10 rounded-3xl w-full flex flex-col gap-10 ">
      {!loading ?
      <>
      
      {res.length !== 0 ?
      <>
      {res.map((result , i) => {
        // converts the response to html to be displayed 
        const converter = new showdown.Converter();
        const html = converter.makeHtml(result);
        
      // Response screen 
        return (
          <div key={i}  className="flex border-b-2 border-black lg:py-10 lg:w-full flex-col gap-5">
            <div className="flex flex-col items-end">
      <p className="lg:text-3xl text-lg font-bold border-b-2 flex flex-col lg:w-full border-black w-fit items-end gap-5">
        <Image src="/User.png" width={50} height={50} alt="User" />
        <span className="bg-white bg-opacity-20 px-5 py-3 rounded-3xl"> {question[i]}</span>
        
         </p>
         </div>
         <div className="flex flex-col gap-5 "> 
          <Image src="/Gemini.png" width={50} height={50} alt="Gemini" />
          <div className="overflow-x-scroll rounded-3xl ">
       <p className="lg:text-2xl text-sm bg-white bg-opacity-20 w-fit  rounded-3xl px-5 lg:mb-0 py-3">
          <span 
           ref={(span) => { 
            if(span){
      span.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }}
           className="w-full font-semibold" id={i.toString()} dangerouslySetInnerHTML={{__html: html}}></span> 
        </p> 
     </div> 
      <div className="text-transparent bg-gradient-to-r from-fuchsia-500 to-blue-700 mb-24 h-0.5 lg:w-1/3 w-1/2">h</div>
        </div>
      </div>
        )
      })
      
}
      </>
       : 
       // Welcome screen
       <div className=" flex flex-col justify-start w-full h-1/2 gap-5">
       <Image src="/Gemini.png" width={50} height={50} alt="Gemini" />
       <p className="text-2xl bg-opacity-20 bg-white px-5 py-3 rounded-3xl w-fit ">How can i help you</p>
       </div>
       }
       </> :
       // Loading screen
       <div className=" flex justify-center h-1/2 text-opacity-50 ">
        <span className=" animate-spin">
          <Image src="/Gemini.png" width={100} height={100} alt="Gemini" />
        </span>
        </div>
      }
      
    </div>
      <form className="p-10  flex flex-row  fixed z-10 gap-5 justify-center bottom-0 w-full" method="post" onSubmit={handleSubmit}>
        <div className=" bg-neutral-800  rounded-3xl flex  items-center lg:w-1/3 px-5 py-3 lg:flex lg:justify-between">
      <input onChange={(e) => setPrompt(e.target.value)} value={prompt} 
      className="bg-transparent px-5 py-3 rounded-3xl lg:text-2xl text-opacity-50  lg:w-full h-full focus:outline-none"
       name="prompt" type="text" autoFocus={true}  placeholder="Enter a prompt" autoComplete="off"/>
      <Button className="bg-neutral-700 rounded-full h-full hover:bg-neutral-600 p-2 " type="submit">
        <Image src="/Send.png" width={40} height={40} alt="Submit" />
      </Button>
      </div>
    </form>
  </div>
  );
}
