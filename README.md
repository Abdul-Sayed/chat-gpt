# ChatGPT

## Web app using React, NextJS 13 with Server and Client components, Typescript, OpenAI ChatGPT API, Firebase, Firestore, Firebase Admin, NextAuth with Firebase, useSWR, React-Select, React Hot Toast, TailwindCSS

API: `https://api.openai.com/v1/chat/completions`

### File and Folder structure

The app folder contains the application wide layout, as well as the navigation routes

```
Root ('/')

Layout
|
├──Login (if not logged in)
|
├───SideBar
|   └──NewChat <==> routes to `/chat/chatId`
|   └──ModelSelection <==> calls `api/getModels`
|   └──ChatRow <==> routes to `/chat/chatId`
|
└───Page

Sub Route ('/chat')

Page
|
├───Chat
|   └──Message
|
└──ChatInput <==> calls '/api/askQuestion'

```

### API Routes

pages/api/getModels -> Gets all the Chat Engines or models from the openai api.  
pages/api/askQuestions -> Call the ChatGPT api to get a response to the user's prompt. And save the response message to the db.

#### State

> SWR was used to manage serverside state

    // Set the model in one component with a setModel function
    const { data: model, mutate: setModel } = useSWR("model", {
      fallbackData: "text-davinci-003",
    });

    // retrieve the model from SWR cache
    const { data: model } = useSWR("model", {
      fallbackData: "text-davinci-003",
    });

### FireStore Data Structure

> database -> 'users' collection -> Email documents -> 'chats' collection -> ChatId documents -> 'messages' collection -> messageId documents -> message

To read data client side:

    // Retrieve all messages from the db
    const [messages, loading, error] = useCollection(
      session &&
        query(
          collection(db, "users", session.user?.email!, "chats", id, "messages"),
          orderBy("createdAt", "asc")
        )
    );

To write data client side:

    // Save the user's message to the messages collection
    await addDoc(
      collection(db, "users", session?.user?.email!, "chats", chatId, "messages"),
      message
    );

To write data serverside:

    // Add a message to the messages collection
    await adminDb
      .collection("users")
      .doc(session?.user?.email)
      .collection("chats")
      .doc(chatId)
      .collection("messages")
      .add(message);

#### Next Auth config

In 'pages/api/auth/[...nextauth].js', Google was configured as the OAuth Provider.  
In SessionProvider.tsx, a provider wrapper with the client side session is returned, which is used to wrap everything in the primary Layout.tsx.

Session is obtained in a serverside component with:

    import { getServerSession } from "next-auth";
    const session = await getServerSession(authOptions);

Session is obtained ina client side component with:

    import { useSession } from "next-auth/react";
    const { data: session, status } = useSession();
