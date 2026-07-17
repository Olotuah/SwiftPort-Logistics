import "./Chat.css";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

import API from "../../config/api";

import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import QuickReplies from "./QuickReplies";
import TypingIndicator from "./TypingIndicator";

import { getBotResponse } from "../../services/chatbot";


export default function ChatWindow({ close }) {


  const initialMessage = {
    sender:"bot",
    text:
    "👋 Welcome to SwiftPort Logistics.\n\nI'm SwiftBot AI.\n\nHow can I help you today?"
  };


  const [messages,setMessages] = useState([
    initialMessage
  ]);


  const [waitingForTracking,setWaitingForTracking] = useState(false);


  const [showQuickReplies,setShowQuickReplies] = useState(true);


  const [isTyping,setIsTyping] = useState(false);


  const chatEndRef = useRef(null);



  /*
  Auto scroll only after new message
  */

  useEffect(()=>{

    setTimeout(()=>{

      chatEndRef.current?.scrollIntoView({
        behavior:"smooth",
        block:"end"
      });

    },100);

  },[messages,isTyping]);




  const sendMessage = async(text)=>{


    if(!text.trim()) return;



    /*
    Hide quick actions permanently
    until chatbot reopened
    */

    setShowQuickReplies(false);



    setMessages(prev=>[
      ...prev,
      {
        sender:"user",
        text
      }
    ]);




    /*
    Tracking process
    */


    if(waitingForTracking){


      setWaitingForTracking(false);

      setIsTyping(true);



      try{


        const response = await axios.get(
          `${API}/api/packages/track/${text}`
        );



        setTimeout(()=>{


          setMessages(prev=>[
            ...prev,
            {
              sender:"bot",
              type:"shipment",
              data:response.data
            }
          ]);


          setIsTyping(false);


        },1000);



      }

      catch(error){


        setTimeout(()=>{


          setMessages(prev=>[
            ...prev,
            {
              sender:"bot",
              text:
              "❌ Sorry, I couldn't find that tracking ID.\n\nPlease check it and try again."
            }
          ]);


          setIsTyping(false);


        },1000);


      }


      return;

    }




    /*
    Normal chatbot replies
    */


    setIsTyping(true);



    setTimeout(()=>{


      const reply = getBotResponse(text);



      if(reply.type==="tracking"){


        setWaitingForTracking(true);


      }



      setMessages(prev=>[
        ...prev,
        {
          sender:"bot",
          text:reply.text
        }
      ]);



      setIsTyping(false);



    },900);



  };






  /*
  When chatbot closes
  reset quick actions
  */

  const closeChat = ()=>{


    setShowQuickReplies(true);


    close();


  };





return (

<div

className="
chat-window
fixed
z-[99998]

right-6
bottom-24

w-[390px]
max-w-[calc(100vw-32px)]

h-[min(700px,calc(100vh-120px))]

bg-white
rounded-3xl
shadow-2xl
border

overflow-hidden

flex
flex-col

max-lg:left-4
max-lg:right-4
max-lg:w-auto
max-lg:h-[calc(100vh-110px)]
"

>


<ChatHeader close={closeChat}/>



<div

className="
chat-scroll
flex-1
overflow-y-auto
bg-gray-50
p-5
"

>



{
messages.map((message,index)=>(

<ChatMessage

key={index}

message={message}

/>

))

}



{
isTyping && <TypingIndicator/>
}




{
showQuickReplies &&

<QuickReplies

sendMessage={sendMessage}

/>

}




<div ref={chatEndRef}/>



</div>



<ChatInput sendMessage={sendMessage}/>



</div>


);


}