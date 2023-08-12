
const generateResponse = async (userMessage) => {
  const apiKey = 'OPENAI_API_KEY';
  const prompt = `User: ${userMessage}\nAI:`;

  const response = await openai.Completion.create({
    engine: 'davinci', // Choose the appropriate engine
    prompt: prompt,
    max_tokens: 50, // Adjust the response length as needed
    apiKey: apiKey,
  });

  return response.choices[0].text.trim();
};

export default generateResponse;
