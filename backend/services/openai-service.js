const OpenAI = require('openai');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});


console.log("API Key loaded:", !!process.env.OPENAI_API_KEY);

async function getChatReply(message){
    try{
        const completion = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [{ role: 'user', content: message }],
        });


        const reply = completion.data.choices[0].message.content;
        
        return reply;

    }catch(error){
        console.log('ne radi openai api', error.response?.data || error.message || error);
        throw error;
    }
}

module.exports = { getChatReply };