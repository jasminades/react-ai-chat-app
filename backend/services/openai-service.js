const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function getChatReply(message) {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo', 
      messages: [{ role: 'user', content: message }],
    });

    const reply = completion.choices[0].message.content;
    return reply;
  } catch (error) {
    console.error('openai error:', error.response?.data || error.message);
    throw new Error('no quota. try again later');
  }
}

module.exports = { getChatReply };
