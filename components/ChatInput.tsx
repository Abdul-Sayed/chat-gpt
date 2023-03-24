"use client";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { FormEvent, useState } from "react";
import { Message } from "../typings";
import {
  addDoc,
  collection,
  DocumentData,
  QuerySnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import toast from "react-hot-toast";
import ModelSelection from "./ModelSelection";
import useSWR from "swr";
import { Session } from "next-auth";

type Props = {
  chatId: string;
  session: Session | null;
  messages: QuerySnapshot<DocumentData> | undefined;
};

function ChatInput({ chatId, session, messages }: Props) {
  const [prompt, setPrompt] = useState("");

  // retrieve the model from SWR cache
  const { data: model } = useSWR("model", {
    fallbackData: "text-davinci-003",
  });

  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!prompt) return;
    const input = prompt.trim();
    setPrompt("");

    const message: Message = {
      text: input,
      createdAt: serverTimestamp(),
      user: {
        _id: session?.user?.email!,
        name: session?.user?.name!,
        avatar: session?.user?.image || `https://ui-avatars.com/api/?name=${session?.user?.name}`,
      },
    };

    // Save the user's message to the DB
    await addDoc(
      collection(db, "users", session?.user?.email!, "chats", chatId, "messages"),
      message
    );

    // Obtain the text of all prior messages in one string
    const promptHistory = (messages?.docs || [])
      .map((message) => message.data().text)
      .reduce((text, messages) => (text += messages), "");

    const notification = toast.loading("ChatGPT is thinking...");

    await fetch("/api/askQuestion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: promptHistory + input,
        chatId,
        model,
        session,
      }),
    }).then(() => {
      toast.success("ChatGPT has responded", { id: notification });
    });
  };

  return (
    <div className="bg-gray-700/50 text-gray-400 rounded-lg text-sm">
      <form onSubmit={sendMessage} className="flex p-5 space-x-5">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Type your message here..."
          disabled={!session}
          className="flex-1 bg-transparent outline-none disabled:cursor-not-allowed disabled:text-gray-300"
        />
        <button
          type="submit"
          disabled={!prompt || !session}
          className="bg-[#11A37F] hover:opacity-50 text-white font-bold px-4 py-2 rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          <PaperAirplaneIcon className="h-4 w-4 -rotate-45" />
        </button>
      </form>
      <div className="sm:hidden">
        <ModelSelection />
      </div>
    </div>
  );
}

export default ChatInput;
