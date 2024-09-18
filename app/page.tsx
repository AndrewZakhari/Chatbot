"use client";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import type { FormEvent } from "react";
import { Button } from "@/components/ui/button";
import showdown from "showdown";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const [prompt, setPrompt] = useState<string>("");
  const [res, setRes] = useState<Array<string>>([]);
  const [question, setQuestion] = useState<Array<string>>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Reference to the last message div
  const bottomRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const prevQuestion = [...question, prompt];
    setQuestion(prevQuestion);
    setLoading(true);
    axios
      .post("/api", {
        data: {
          prompt: prompt,
        },
      })
      .then((response) => {
        const result = [...res, response.data];
        setRes(result);
      })
      .then(() => {
        setLoading(false);
        setPrompt(""); // Clear the input after submission
      });
  };

  // Scroll to bottom whenever res or question changes
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [res, question]);


  return (
    <div className="lg:w-[90%] mx-auto w-[95%] 2xl:w-[1320px] pt-10 pb-32">
      <h1 className="text-6xl pb-10 text-center ">
        Your{" "}
        <span className="bg-gradient-to-br from-[#DE9BF0]  to-[#FED7B6] inline-block text-transparent bg-clip-text">
          Non Limit
        </span>{" "}
        chatBot
      </h1>
      <div className="space-y-5">
        {!loading ? (
          <>
            {res.length !== 0 ? (
              <>
                {res.map((result, i) => {
                  const converter = new showdown.Converter();
                  const html = converter.makeHtml(result);
                  return (
                    <div key={i}>
                      <li className="flex ms-auto gap-x-2 sm:gap-x-4">
                        <div className="grow text-end space-y-3">
                          <div className="inline-block bg-[#27282F] rounded-2xl p-4 shadow-sm">
                            <p className="text-sm text-white">{question[i]}</p>
                          </div>
                        </div>
                      </li>

                      <li className=" flex gap-x-2 sm:gap-x-4 me-11">
                        {" "}
                        <svg
                          className="size-11"
                          viewBox="0 0 200 200"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          {" "}
                          <g clip-path="url(#clip0_116_153)">
                            {" "}
                            <path
                              d="M100 0C103.395 53.7596 146.24 96.6052 200 100C146.24 103.395 103.395 146.24 100 200C96.6052 146.24 53.7596 103.395 0 100C53.7596 96.6052 96.6052 53.7596 100 0Z"
                              fill="url(#paint0_linear_116_153)"
                            />{" "}
                          </g>{" "}
                          <defs>
                            {" "}
                            <linearGradient
                              id="paint0_linear_116_153"
                              x1="100"
                              y1="0"
                              x2="100"
                              y2="200"
                              gradientUnits="userSpaceOnUse"
                            >
                              {" "}
                              <stop stop-color="#DF99F7" />{" "}
                              <stop offset="1" stop-color="#FFDBB0" />{" "}
                            </linearGradient>{" "}
                            <clipPath id="clip0_116_153">
                              {" "}
                              <rect
                                width="200"
                                height="200"
                                fill="white"
                              />{" "}
                            </clipPath>{" "}
                          </defs>{" "}
                        </svg>
                        <div className="max-w-lg bg-[#27282F] border border-none rounded-2xl p-4 space-y-3 dark:bg-neutral-900 dark:border-neutral-700">
                          <h2
                            className="font-medium  text-white"
                            id={i.toString()}
                            dangerouslySetInnerHTML={{ __html: html }}
                          ></h2>
                        </div>
                      </li>
                    </div>
                  );
                })}
                {/* Empty div to scroll into view */}
                <div className="" ref={bottomRef}></div>
              </>
            ) : (
              <li className="max-w-lg flex gap-x-2 sm:gap-x-4 me-11">
                {" "}
                <svg
                  className="size-11"
                  viewBox="0 0 200 200"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {" "}
                  <g clip-path="url(#clip0_116_153)">
                    {" "}
                    <path
                      d="M100 0C103.395 53.7596 146.24 96.6052 200 100C146.24 103.395 103.395 146.24 100 200C96.6052 146.24 53.7596 103.395 0 100C53.7596 96.6052 96.6052 53.7596 100 0Z"
                      fill="url(#paint0_linear_116_153)"
                    />{" "}
                  </g>{" "}
                  <defs>
                    {" "}
                    <linearGradient
                      id="paint0_linear_116_153"
                      x1="100"
                      y1="0"
                      x2="100"
                      y2="200"
                      gradientUnits="userSpaceOnUse"
                    >
                      {" "}
                      <stop stop-color="#DF99F7" />{" "}
                      <stop offset="1" stop-color="#FFDBB0" />{" "}
                    </linearGradient>{" "}
                    <clipPath id="clip0_116_153">
                      {" "}
                      <rect width="200" height="200" fill="white" />{" "}
                    </clipPath>{" "}
                  </defs>{" "}
                </svg>
                <div className="bg-[#27282F] border border-none rounded-2xl p-4 space-y-3 dark:bg-neutral-900 dark:border-neutral-700">
                  <h2 className="font-medium  text-white">
                    How can we help you ?
                  </h2>
                </div>
              </li>
            )}
          </>
        ) : (
          // loading
          <li className="max-w-lg flex gap-x-2 sm:gap-x-4 me-11">
            {" "}
            <svg
              className="size-11"
              viewBox="0 0 200 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {" "}
              <g clip-path="url(#clip0_116_153)">
                {" "}
                <path
                  d="M100 0C103.395 53.7596 146.24 96.6052 200 100C146.24 103.395 103.395 146.24 100 200C96.6052 146.24 53.7596 103.395 0 100C53.7596 96.6052 96.6052 53.7596 100 0Z"
                  fill="url(#paint0_linear_116_153)"
                />{" "}
              </g>{" "}
              <defs>
                {" "}
                <linearGradient
                  id="paint0_linear_116_153"
                  x1="100"
                  y1="0"
                  x2="100"
                  y2="200"
                  gradientUnits="userSpaceOnUse"
                >
                  {" "}
                  <stop stop-color="#DF99F7" />{" "}
                  <stop offset="1" stop-color="#FFDBB0" />{" "}
                </linearGradient>{" "}
                <clipPath id="clip0_116_153">
                  {" "}
                  <rect width="200" height="200" fill="white" />{" "}
                </clipPath>{" "}
              </defs>{" "}
            </svg>
            <div className="bg-[#27282F] border border-none rounded-2xl p-4 space-y-3 dark:bg-neutral-900 dark:border-neutral-700">
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px] bg-gradient-to-br from-[#F7FAFE]  to-[#B9DCFC]" />
                <Skeleton className="h-4 w-[200px] bg-gradient-to-br from-[#F7FAFE]  to-[#B9DCFC]" />
              </div>
            </div>
          </li>
        )}
      </div>
      <form
        className="p-10  flex flex-row fixed z-10 gap-5 justify-center bottom-0 w-full"
        method="post"
        onSubmit={handleSubmit}
      >
        <input
          onChange={(e) => setPrompt(e.target.value)}
          value={prompt}
          className="bg-gray-700 px-5 py-3 rounded-3xl text-opacity-50  w-1/3 h-full text-center"
          name="prompt"
          type="text"
          placeholder="Enter a prompt"
          autoComplete="off"
        />
        <Button
          className="border-gray-500 border-2 rounded-3xl px-5 py-3 h-full font-bold "
          type="submit"
        >
          Submit
        </Button>
      </form>
    </div>

    // <div className="lg:w-[90%] mx-auto w-[95%] 2xl:w-[1320px] pt-10">
    //   <h1 className="text-6xl pb-10 text-center ">Your <span className="bg-gradient-to-br from-[#DE9BF0]  to-[#FED7B6] inline-block text-transparent bg-clip-text">Non Limit</span> chatBot</h1>
    //   <ul className="space-y-5">
    //     <li className="max-w-lg flex gap-x-2 sm:gap-x-4 me-11">

    //     <svg className="size-11"  viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg"> <g clip-path="url(#clip0_116_153)"> <path d="M100 0C103.395 53.7596 146.24 96.6052 200 100C146.24 103.395 103.395 146.24 100 200C96.6052 146.24 53.7596 103.395 0 100C53.7596 96.6052 96.6052 53.7596 100 0Z" fill="url(#paint0_linear_116_153)"/> </g> <defs> <linearGradient id="paint0_linear_116_153" x1="100" y1="0" x2="100" y2="200" gradientUnits="userSpaceOnUse"> <stop stop-color="#DF99F7"/> <stop offset="1" stop-color="#FFDBB0"/> </linearGradient> <clipPath id="clip0_116_153"> <rect width="200" height="200" fill="white"/> </clipPath> </defs> </svg>

    //       <div className="bg-[#27282F] border border-none rounded-2xl p-4 space-y-3 dark:bg-neutral-900 dark:border-neutral-700">
    //         <h2 className="font-medium  text-white">
    //           How can we help?
    //         </h2>
    //         <div className="space-y-1.5">
    //           <p className="mb-1.5 text-sm text-white">
    //             You can ask questions like:
    //           </p>
    //           <ul className="list-disc list-outside space-y-1.5 ps-3.5">
    //             <li className="text-sm  dark:text-white">
    //               What's Preline UI?
    //             </li>

    //             <li className="text-sm  dark:text-white">
    //               How many Starter Pages & Examples are there?
    //             </li>

    //             <li className="text-sm  dark:text-white">
    //               Is there a PRO version?
    //             </li>
    //           </ul>
    //         </div>
    //       </div>
    //     </li>

    //     <li className="flex ms-auto gap-x-2 sm:gap-x-4">
    //       <div className="grow text-end space-y-3">
    //         <div className="inline-block bg-[#27282F] rounded-2xl p-4 shadow-sm">
    //           <p className="text-sm text-white">what's preline ui?</p>
    //         </div>
    //       </div>

    //       {/* <span className="shrink-0 inline-flex items-center justify-center size-[38px] rounded-full bg-gray-600">
    //         <span className="text-sm font-medium text-white leading-none">U</span>
    //       </span> */}
    //     </li>

    //     {/* <li className="max-w-lg flex gap-x-2 sm:gap-x-4 me-11">
    //     <svg className="size-11"  viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg"> <g clip-path="url(#clip0_116_153)"> <path d="M100 0C103.395 53.7596 146.24 96.6052 200 100C146.24 103.395 103.395 146.24 100 200C96.6052 146.24 53.7596 103.395 0 100C53.7596 96.6052 96.6052 53.7596 100 0Z" fill="url(#paint0_linear_116_153)"/> </g> <defs> <linearGradient id="paint0_linear_116_153" x1="100" y1="0" x2="100" y2="200" gradientUnits="userSpaceOnUse"> <stop stop-color="#DF99F7"/> <stop offset="1" stop-color="#FFDBB0"/> </linearGradient> <clipPath id="clip0_116_153"> <rect width="200" height="200" fill="white"/> </clipPath> </defs> </svg>

    //       <div className="bg-white border border-gray-200 rounded-2xl p-4 space-y-3 dark:bg-neutral-900 dark:border-neutral-700">
    //         <p className="text-sm text-gray-800 dark:text-white">
    //           Preline UI is an open-source set of prebuilt UI components based
    //           on the utility-first Tailwind CSS framework.
    //         </p>
    //         <div className="space-y-1.5">
    //           <p className="text-sm text-gray-800 dark:text-white">
    //             Here're some links to get started
    //           </p>
    //           <ul>
    //             <li>
    //               <a
    //                 className="text-sm text-blue-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium dark:text-blue-500 dark:hover:text-blue-400"
    //                 href="../docs/index.html"
    //               >
    //                 Installation Guide
    //               </a>
    //             </li>
    //             <li>
    //               <a
    //                 className="text-sm text-blue-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium dark:text-blue-500 dark:hover:text-blue-400"
    //                 href="../docs/frameworks.html"
    //               >
    //                 Framework Guides
    //               </a>
    //             </li>
    //           </ul>
    //         </div>
    //       </div>
    //     </li> */}
    //   </ul>
    // </div>
  );
}
