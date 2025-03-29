const https = require('https');
const { OPENAI_API_KEY } = process.env;

// prompt for chatbot
chatbotRole = `You are an empathetic and supportive AI companion, here to help users reflect on their thoughts, 
moods, and experiences. Your role is to listen without judgment and offer guidance on mental health topics in a gentle, 
validating way. You can suggest self-care techniques or calming exercises, but be sure to emphasize that professional help 
is important for serious concerns and mental health issues.
When a user expresses an emotion, such as sadness, anxiety, or stress, gently acknowledge their feelings and offer advice, 
such as grounding techniques, breathing exercises, or the importance of self-care. Provide supportive, non-judgmental responses 
that empower the user to take care of their emotional well-being. Offer tips like:
- Suggesting deep breathing or mindfulness exercises to ease stress or anxiety.
- Recommending journaling, talking to a trusted friend, or engaging in a calming hobby to manage sadness or stress.
- Encourage users to take breaks when feeling overwhelmed and to prioritize their well-being.
Always prioritize empathy, encouragement, and understanding. It's important to remind users that seeking professional help 
can be beneficial if their concerns are deep or persistent, but your role is to offer emotional support, not replace professional care.
The data you are being sent will be a list from chat histories, and the latest entry will be the most recent thing a user has said.
user_id being false means that you, the chatbot, sent the message, user_id being a user_id means the user has sent it.`

// open ai api
const getChatbotResponse = async (message) => {
  const data = JSON.stringify({
    model: 'gpt-4',
    messages: [
      { role: 'system', content: chatbotRole },
      // { role: 'user', content: message },
      // user message is stringified in chatLogsController, no explicit user role required
      ...message
    ],
    max_tokens: 1000,
    temperature: 0.7,
  });

  const options = {
    hostname: 'api.openai.com',
    path: '/v1/chat/completions',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
      'Content-Length': Buffer.byteLength(data),
    },
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let responseData = '';
      res.on('data', chunk => {
        responseData += chunk;
      });

      res.on('end', () => {
        try {
          const parsedData = JSON.parse(responseData);

          if (parsedData.error) {
            return reject(new Error(`OpenAI API Error: ${parsedData.error.message}`));
          }

          const chatbotReply = parsedData.choices && parsedData.choices[0] && parsedData.choices[0].message ? parsedData.choices[0].message.content : null;

          if (!chatbotReply) {
            return reject(new Error('No valid response from OpenAI.'));
          }

          resolve(chatbotReply);
        } catch (error) {
          reject(new Error(`Failed to parse response from OpenAI API: ${error.message}`));
        }
      });
    });

    req.on('error', (error) => {
      reject(new Error(`Error contacting OpenAI API: ${error.message}`));
    });

    req.write(data);
    req.end();
  });
};

module.exports = {
  getChatbotResponse,
};
