"use client";

import { collection, orderBy, query } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../../../firebase";
import { useSession } from "next-auth/react";

import Chat from "../../../components/Chat";
import ChatInput from "../../../components/ChatInput";

type Props = {
  params: {
    id: string;
  };
};
function ChatPage({ params: { id } }: Props) {
  const { data: session } = useSession();

  const [messages, loading, error] = useCollection(
    session &&
      query(
        collection(db, "users", session.user?.email!, "chats", id, "messages"),
        orderBy("createdAt", "asc")
      )
  );

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Chat messages={messages} />
      <ChatInput chatId={id} session={session} messages={messages} />
    </div>
  );
}

export default ChatPage;
