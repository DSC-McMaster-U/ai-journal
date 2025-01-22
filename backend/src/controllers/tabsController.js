const { log, fetching } = require('../logger');
const tabsService = require('../services/tabsService');

const getAllTabs = async (req, res) => {
  try {
    const userId = req.token.user.id;
    const tabs = await tabsService.getAllTabs(userId);

    fetching('GET /tabs', { userId });

    res.status(200).json({ data: tabs });
  } catch (error) {
    log(`Controller Error: ${error.message}`);
    res.status(500).json({ error: 'Failed to fetch tabs' });
  }
};

const getTabById = async (req, res) => {
  try {
    const userId = req.token.user.id;
    const tabId = req.params.id;

    fetching('GET /tabs/:id', { tabId, userId });

    const tab = await tabsService.getTabById(tabId, userId);

    if (tab.length === 0) {
      return res.status(404).json({ error: 'Tab not found' });
    }

    res.status(200).json({ data: tab[0] });
  } catch (error) {
    log(`Controller Error: ${error.message}`);
    res.status(500).json({ error: 'Failed to fetch tab by ID' });
  }
};

const createTab = async (req, res) => {
  try {
    const { name, color } = req.body;
    const userId = req.token.user.id;

    fetching('POST /tabs', { name, userId, color });

    const response = await tabsService.createTab(name, userId, color);

    res.status(201).json({
      data: {
        id: response.insertId,
        name,
        user_id: userId,
        color,
      },
    });
  } catch (error) {
    log(`Controller Error: ${error.message}`);
    res.status(500).json({ error: 'Failed to create tab' });
  }
};

const updateTab = async (req, res) => {
  try {
    const { name, color } = req.body;
    const tabId = req.params.id;
    const userId = req.token.user.id;

    fetching('PUT /tabs/:id', { tabId, name, userId, color });

    const response = await tabsService.updateTab(tabId, name, userId, color);

    if (response.affectedRows === 0) {
      return res.status(404).json({ error: 'Tab not found' });
    }

    res.status(200).json({
      data: {
        id: tabId,
        name,
        user_id: userId,
        color,
      },
    });
  } catch (error) {
    log(`Controller Error: ${error.message}`);
    res.status(500).json({ error: 'Failed to update tab' });
  }
};

const deleteTab = async (req, res) => {
  try {
    const tabId = req.params.id;
    const userId = req.token.user.id;

    fetching('DELETE /tabs/:id', { tabId, userId });

    const response = await tabsService.deleteTab(tabId, userId);

    if (response.affectedRows === 0) {
      return res.status(404).json({ error: 'Tab not found' });
    }

    res.status(200).json({ message: 'Tab deleted successfully' });
  } catch (error) {
    log(`Controller Error: ${error.message}`);
    res.status(500).json({ error: 'Failed to delete tab' });
  }
};

module.exports = {
  getAllTabs,
  getTabById,
  createTab,
  updateTab,
  deleteTab,
};
