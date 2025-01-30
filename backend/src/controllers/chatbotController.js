const chatbotService = require('../services/chatbotService');
const { log } = require('../logger');

const getChatbotResponse = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    log(`User message: ${message}`);

    const response = await chatbotService.getChatbotResponse(message);

    res.status(200).json({ response });
  } catch (error) {
    log(`Controller Error: ${error.message}`);
    res.status(500).json({ error: `Failed to generate response: ${error.message}` });
  }
};

module.exports = {
  getChatbotResponse,
};
