"use client";

import { PlusIcon } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

function NewChat() {
  const router = useRouter();
  const { data: session } = useSession();

  const createNewChat = async () => {
    // users holds a list of user emails
    // an email maps to many chats
    // any of the chats hold hashes with the doc id key and the message object value
    const doc = await addDoc(collection(db, "users", session?.user?.email!, "chats"), {
      userId: session?.user?.email!,
      createdAt: serverTimestamp(),
    });
    console.log("doc id:", doc.id);
    router.push(`/chat/${doc.id}`);
  };

  return (
    <div onClick={createNewChat} className="border border-gray-700 chatRow">
      <PlusIcon className="h-4 w-4" />
      <p>New Chat</p>
    </div>
  );
}

export default NewChat;
