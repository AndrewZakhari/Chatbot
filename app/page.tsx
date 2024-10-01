import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

const Home = () => {
    return (
        <div className="bg-[url('/backgroundElipse.png')] bg-fixed md:bg-cover
         bg-no-repeat lg:bg-[url('/backgroundDesktop.png')] lg:bg-center md:min-h-screen">
            <div className="mx-12 lg:mx-0 lg:mb-16 flex flex-col items-center lg:items-start">
                <div className=" lg:flex lg:flex-col lg:items-center lg:w-screen">
            <div className="bg-gradient-to-r from-[#C002FF] to-[#2E0979] lg:w-fit bg-clip-text">
               <Link href="/">
               <h1 className="text-5xl lg:text-7xl   font-bold my-10 text-transparent">Creative AI</h1>
               </Link>
                </div>
                </div>
                <div className=" flex flex-col gap-10 my-10 lg:mx-32">
            <p className="font-semibold lg:text-4xl text-center lg:text-start text-3xl">As long as you can imagine it we can generate it</p>
            <p className="text-xl lg:text-2xl text-center lg:text-start opacity-70">Start Chatting and generate your ideas in real time </p>
            <Link className="flex justify-center lg:justify-start" href="/chat">
            <Button className="bg-gradient-to-r from-[#C002FF]
             to-[#2E0979]  font-bold rounded-xl lg:text-2xl lg:py-8 py-6 px-5">Start Chat</Button>
            </Link>
            </div>
            </div>
            <div className="flex mx-5 md:px-20 lg:mx-20">
            <Image className="h-[70px] rounded-full w-[70px] lg:h-[100px] lg:w-[100px]" src="/Logo.png" alt="Logo"  height={50} width={100}/>
             <div className="bg-[url('/promptBg.png')] md:w-[500px]
             lg:bg-[url('/promptBgDesk.png')] lg:px-5 lg:py-3 lg:w-max lg:my-8
              rounded-xl my-5 bg-cover overflow-hidden">
                <p className=" p-5 pl-10 lg:text-3xl">Hi there! I&apos;m Creative AI, and I&apos;m here to help you bring your ideas to life.
                     I can generate creative  text formats, like poems, code, scripts,
                     musical pieces, email, letters, etc. I can also answer your questions in an informative way,
                     even if  they&apos;re open ended, challenging, or strange. My purpose is to be a 
                     helpful and creative tool, and I&apos;m always learning and improving. What  can I help you with today?</p>
             </div>
             </div>
        </div>
    )
}

export default Home