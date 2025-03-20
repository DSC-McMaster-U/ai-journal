const chatsService = require('../services/chatsService');
const { log, error } = require('../logger');
const { send_authenticated_test_request } = require('../utils/test');

const getChats = async (req, res) => {
  try {
    const userId = req.token.user.id;
    const chats = await chatsService.getChats(userId);

    res.status(200).json({ data: chats });
  } catch (err) {
    error(`Controller Error: ${err.message}`);
    res.status(500).json({ error: 'Failed to fetch chats' });
  }
};

const createChat = async (req, res) => {
  try {
    const userId = req.token.user.id;
    const { chatName = null } = req.body;

    const response = await chatsService.createChat(userId, chatName);

    res.status(200).json({ data: response });
  } catch (err) {
    error(`Controller error: ${err.message}`);
    res.status(500).json({ error: 'failed to create chat' });
  }
};

const editChat = async (req, res) => {
  try {
    const { instanceId } = req.params;
    const { chatName, favourited } = req.body;

    const response = await chatsService.editChat(
      instanceId,
      chatName,
      favourited
    );

    res.status(200).json({ data: response });
  } catch (err) {
    error(`Controller error: ${err.message}`);
    res.status(500).json({ error: 'failed to edit chat' });
  }
};

const deleteChat = async (req, res) => {
  try {
    const { instanceId } = req.params;
    const response = await chatsService.deleteChat(instanceId);
    res.status(200).json({ data: response });
  } catch (err) {
    error(`Controller error: ${err.message}`);
    res.status(500).json({ error: 'failed to delete chat' });
  }
};

const testFunctions = async (req, res) => {
  console.log('===== TESTING CHAT FUNCTIONS =====');
  const userId = req.token.user.id;
  const userToken = req.header('Authorization');
  const createChatWithoutName = await send_authenticated_test_request(
    '/api/chats/',
    userToken,
    'POST',
    {
      chatName: req.header('ChatName'),
    }
  );

  const latestChat = await send_authenticated_test_request(
    '/api/chats/',
    userToken,
    'GET',
    undefined
  )
    .then(async (results) => {
      return await results.json();
    })
    .then((data) => {
      return data['data'][data['data'].length - 1];
    });

  console.log('===== NEWEST CHAT INFO IN DATA BASE =====');
  console.log(latestChat);
  console.log(latestChat['id']);

  const sendMessage = await send_authenticated_test_request(
    `/api/chats/${latestChat['id']}`,
    userToken,
    'PUT',
    {
      chatName: 'new chat name fr',
      favourited: true,
    }
  );

  const chatWithId = await send_authenticated_test_request(
    '/api/chats/',
    userToken,
    'GET',
    undefined
  )
    .then(async (results) => {
      return await results.json();
    })
    .then((data) => {
      return data['data'].filter((elem) => elem['id'] === latestChat['id'])[0];
    });

  console.log('===== UPDATED CHAT INFO =====');
  console.log(chatWithId);

  const deleteChat = await send_authenticated_test_request(
    `/api/chats/${latestChat['id']}`,
    userToken,
    'DELETE',
    undefined
  );

  const chatsWithIdStill = await send_authenticated_test_request(
    '/api/chats/',
    userToken,
    'GET',
    undefined
  )
    .then(async (results) => {
      return await results.json();
    })
    .then((data) => {
      return data['data'].filter((elem) => elem['id'] === latestChat['id']);
    });

  console.log('===== DATA STILL WITH ID (SHOULD BE EMPTY) =====');
  console.log(chatsWithIdStill);

  console.log('+++++ END OF TESTING INFO +++++');

  res.status(200).json({ 'Test Result': 'Successful' });
};

module.exports = { getChats, createChat, editChat, deleteChat, testFunctions };
