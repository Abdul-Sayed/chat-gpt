"use client";

import { getFirestore, collection, query, orderBy } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";

import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import NewChat from "./NewChat";
import { db } from "../firebase";
import ChatRow from "./ChatRow";
import ModelSelection from "./ModelSelection";

function SideBar() {
  const { data: session, status } = useSession();
  // Get a list of the chat messages
  const [chats, loading, error] = useCollection(
    session &&
      query(collection(db, "users", session?.user?.email!, "chats"), orderBy("createdAt", "asc"))
  );
  return (
    <section className="flex flex-col h-screen p-2">
      <div className="flex-1">
        <NewChat />
        <div className="hidden sm:inline">
          <ModelSelection />
        </div>
        <div className="flex flex-col space-y-2 my-2">
          {loading && (
            <div className="animate-pulse text-center text-white">
              <p>Loading Chats...</p>
            </div>
          )}
          {chats?.docs.map((chat) => (
            <ChatRow key={chat.id} id={chat.id} />
          ))}
        </div>
      </div>
      {session && (
        <img
          onClick={() => signOut()}
          src={session?.user?.image!}
          alt="Profile Pic"
          className="h-12 w-12 rounded-full cursor-pointer mx-auto mb-2 hover:opacity-50"
        />
      )}
    </section>
  );
}

export default SideBar;
