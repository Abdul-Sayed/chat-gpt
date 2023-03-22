"use client";

import { getFirestore, collection, orderBy, query } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebase";
import { useSession } from "next-auth/react";
import Message from "./Message";
import { ArrowDownCircleIcon } from "@heroicons/react/24/outline";

type Props = {
  chatId: string;
};

function Chat({ chatId }: Props) {
  const { data: session } = useSession();

  const [messages, loading, error] = useCollection(
    session &&
      query(
        collection(db, "users", session.user?.email!, "chats", chatId, "messages"),
        orderBy("createdAt", "asc")
      )
  );

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
