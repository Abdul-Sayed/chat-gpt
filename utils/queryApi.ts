import openai from "./chatgpt";

const query = async (prompt: string, model: string) => {
  const completion = await openai
    .createCompletion({
      model,
      prompt,
      temperature: 0.5,
      top_p: 1,
      max_tokens: 1000,
      frequency_penalty: 0.5,
      presence_penalty: 0.5,
    })
    .then((res) => res.data.choices[0].text)
    .catch((error) => {
      if (error.response) {
        return `${error.response.status}: ${error.response.data}`;
      } else {
        return `ChatGPT was unable to find an answer for that. Error: ${error.message}`;
      }
    });

  return completion;
};

export default query;

// Pass prompt as an array of all previous messages to make the responses contextual. Or pass the chatID and make a call to get all the messages of that chat, and use that as the prompt. Also pass the temperature to make answers more creative or formal
