import OpenAI from "openai";

// Initialize OpenAI client (API key should be set in env)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


export async function runPrompt(prompt) {
  // Count miliseconds and cost
  const start = Date.now();
  const response = await openai.chat.completions.create({
    model: "gpt-5-mini", 
    messages: [
      { role: "system", content: "Hãy làm theo chỉ dẫn một cách cẩn thận." },
      { role: "user", content: prompt },
    ],
  });
  const end = Date.now();
  console.log('Sent a request, response time: ', end - start, 'ms, cost:', response.usage.total_tokens, 'tokens');

  return response.choices[0]?.message?.content?.trim() || "";
}
