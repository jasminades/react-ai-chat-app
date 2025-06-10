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
        console.error('ne radi chat controller', error.response?.data || error.message || error);

        res.status(500).json({error: 'greska neka'});
    }
}
