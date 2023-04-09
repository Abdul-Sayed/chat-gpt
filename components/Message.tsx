"use client";

import { DocumentData } from "firebase/firestore";
import { useSession } from "next-auth/react";

type Props = {
  message: DocumentData;
};
function Message({ message }: Props) {
  const isChatGPT = message.user.name === "ChatGPT";
  return (
    <section className={`py-5 text-white ${isChatGPT && "bg-[#434654]"}`}>
      <div className="flex space-x-5 px-10 max-w-2xl mx-auto">
        <img src={message.user.avatar} alt="user avatar" className="w-8 h-8" />
        <p className="pt-1 text-sm">{message.text}</p>
      </div>
    </section>
  );
}

export default Message;
//  src={[message.user.avatar, `https://ui-avatars.com/api/?name=${session?.user?.name!}`]}
