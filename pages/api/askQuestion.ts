// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Message } from "../../typings";
import query from "../../utils/queryApi";
import admin from "firebase-admin";
import { adminDb } from "../../firebaseAdmin";

type Data = {
  answer: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { prompt, chatId, model, session } = req.body;
  if (!prompt) {
    res.status(400).json({ answer: "Please provide a prompt!" });
    return;
  }

  //Populate the message from querying ChatGPT api
  const response = await query(prompt, model);

  const message: Message = {
    text: response || "ChatGPT was unable to find an answer for that",
    createdAt: admin.firestore.Timestamp.now(),
    user: {
      _id: "ChatGPT",
      name: "ChatGPT",
      avatar: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg",
    },
  };

  // Save ChatGPT's message to Firebase
  await adminDb
    .collection("users")
    .doc(session?.user?.email)
    .collection("chats")
    .doc(chatId)
    .collection("messages")
    .add(message);

  res.status(200).json({ answer: message.text });
}
