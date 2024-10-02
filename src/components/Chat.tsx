import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
type ChatMsgDto = {
  content: string;
  user_name: string;
  user_uuid: string;
  image_url: string;
  created_at: string; // Możemy użyć `string`, aby pasowało do formatu JSON
};
import {
  format,
  formatDistance,
  formatRelative,
  subDays,
  formatDistanceToNow,
} from "date-fns";

type Event = {
  type: string;
  payload: any;
};

export const Chat = () => {
  const [messages, setMessages] = useState<ChatMsgDto[]>([]); // Przechowywanie wiadomości
  const [inputValue, setInputValue] = useState(""); // Przechowywanie wartości z pola tekstowego
  const ws = useRef<null | WebSocket>(null); // Referencja do WebSocket
  const bottomChatRef = useRef<null | HTMLDivElement>(null);
  const wrapperRef = useRef<null | HTMLDivElement>(null);

  // Funkcja, która przewija element do widoczności określonego punktu
  const scrollToBottom = () => {
    if (bottomChatRef.current) {
      console.log(bottomChatRef.current);
      bottomChatRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  };

  useEffect(() => {
    ws.current = new WebSocket("ws://localhost:8090/api/v1/chat");
    if (!ws.current) return;

    ws.current.onopen = () => {
      console.log("Connected to WebSocket");
      const event: Event = {
        type: "chat_load_msgs",
        payload: 10,
      };
      if (!ws.current) return;
      ws.current.send(JSON.stringify(event));
    };

    ws.current.onmessage = (event) => {
      try {
        console.log(event.data);
        // Parsowanie JSON do obiektu chatMsgDto
        const newEvent: Event = JSON.parse(event.data);
        if (newEvent.type === "chat_message") {
          console.log(newEvent);
          setMessages((prevMessages) => [...prevMessages, newEvent.payload]);
          return;
        } else newEvent.type === "chat_messages";
        {
          console.log(newEvent.payload);
          const msgs: ChatMsgDto[] = newEvent.payload;
          msgs.forEach((element) => {
            setMessages((prevMessages) => [...prevMessages, element]);
          });
          return;
        }
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    ws.current.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.current.onclose = () => {
      console.log("WebSocket connection closed");
    };

    // Zamykanie połączenia po odmontowaniu komponentu
    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  const sendMessage = () => {
    if (ws.current && inputValue.trim() !== "") {
      const event: Event = {
        type: "chat_message",
        payload: inputValue,
      };
      ws.current.send(JSON.stringify(event));
      setInputValue(""); // Czyszczenie pola tekstowego po wysłaniu wiadomości
    }
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]); // Zależność od zmiany wiadomości
  return (
    <div className="p-1 h-96 flex flex-col justify-end">
      <div className="flex flex-col gap-1 my-0.5  overflow-y-auto">
        {messages.map((msg, index) => {
          return (
            <motion.div
              animate={{
                transition: {
                  duration: 0.8,

                  ease: "easeInOut",
                },
                scale: [0, 1],
              }}
              key={index}
              className="flex gap-1 text-sm bg-black bg-opacity-25 p-0.5 rounded-xl"
            >
              <img
                src={msg.image_url}
                alt={`${msg.user_name} photo on the chat`}
                className="h-8 w-8 rounded-full"
              />
              <div className="w-full flex flex-col text-center">
                <div className="flex items-center justify-between m-auto w-full">
                  <p className="text-xs ">{msg.user_name}</p>
                  <p className="text-[10px]">
                    {/* {
                                            formatDistanceToNow(msg.created_at, { addSuffix: true })
                                        } */}
                  </p>
                </div>
                <p>{msg.content}</p>
              </div>
            </motion.div>
          );
        })}
        <div ref={bottomChatRef}></div>
      </div>
      <div className="flex gap-1 justify-between">
        <input
          type="input"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type your message..."
          className="input w-full text-xs text-start"
        />
        <motion.button
          type="submit"
          onClick={sendMessage}
          whileHover={{ scale: 1.02, rotate: 0 }}
          whileTap={{ scale: 1 }}
          animate={{
            backgroundColor: ["#0ab2f1", "#14b8a6", "#0ab2f1"],
            transition: {
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
          className="
                    hover:scale-[98.1%]
                    hover:shadow-none
                    duration-300
                    relative m-auto flex gap-0.5 te  shadow-sm shadow-teal-500
            items-center bg-teal-500 py-0.5 px-2 rounded-xl border-white border font-"
        >
          Send
        </motion.button>
      </div>
    </div>
  );
};
