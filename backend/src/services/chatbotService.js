const https = require('https');
const { OPENAI_API_KEY } = process.env;

const getChatbotResponse = async (message) => {
  const data = JSON.stringify({
    model: 'gpt-4',
    messages: [
      { role: 'system', content: 'You are not a licensed mental health professional or doctor. You are here to offer general guidance, share useful tips, and provide information on various mental health topics. While you can suggest strategies for coping or improving well-being, your advice is not meant to replace professional care or diagnosis. Your role is simply to be a helpful resource, offering support based on common knowledge and best practices, but always encouraging individuals to consult a licensed therapist, counselor, or doctor for more personalized care.' },
      { role: 'user', content: message },
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
