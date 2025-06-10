const openaiService = require('../services/openai-service');

exports.handleChat = async (req, res) => {
    try{
        const userMessage = req.body.message;
        if(!userMessage){
            return res.status(400).json({error: 'message is required'});
        }

        const reply = await openaiService.getChatReply(userMessage);

        res.json({ reply });
    }catch(error){
        console.error('chat controller error:', error.message);
        res.status(500).json({ error: error.message || 'Internal server error' });
    }
}
