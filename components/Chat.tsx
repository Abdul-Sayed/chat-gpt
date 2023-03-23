"use client";

import { QuerySnapshot, DocumentData } from "firebase/firestore";
import { ArrowDownCircleIcon } from "@heroicons/react/24/outline";
import Message from "./Message";

type Props = {
  messages: QuerySnapshot<DocumentData> | undefined;
};

function Chat({ messages }: Props) {
  return (
    <div className="flex-1 overflow-x-hidden overflow-y-scroll scrollbar-hide">
      {messages?.empty ? (
        <>
          <p className="mt-10 text-center text-white">Type in a prompt below to get started!</p>
          <ArrowDownCircleIcon className="h-10 w-10 mx-auto mt-5 text-white animate-bounce" />
        </>
      ) : (
        <div>
          {messages?.docs.map((message) => (
            <Message key={message.id} message={message.data()} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Chat;
