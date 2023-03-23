import openai from "./chatgpt";

const query = async (prompt: string | any[], model: string) => {
  const completion = await openai
    .createCompletion({
      model,
      prompt,
      temperature: 0.5,
      top_p: 1,
      max_tokens: 1000,
      frequency_penalty: 1.5,
      presence_penalty: 0.5,
    })
    .then((res) => res.data.choices[0].text)
    .catch((error) => {
      return `ChatGPT was unable to find an answer for that. Error: ${error.message}. ${error.response?.data?.message}. ${error.response?.status} error`;
    });

  return completion;
};

export default query;
