const { log } = require('../logger');
const tabsService = require('../services/tabsService');

const getAllTabs = async (req, res) => {
  try {
    const userId = req.token.user.id;
    const tabs = await tabsService.getAllTabs(userId);
    res.json(tabs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tabs' });
  }
};

const getTabById = async (req, res) => {
  try {
    const userId = req.token.user.id;
    const tab = await tabsService.getTabById(req.params.id, userId);
    res.json(tab);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tab' });
  }
};

const createTab = async (req, res) => {
  try {
    const { name } = req.body;
    const userId = req.token.user.id;

    const response = await tabsService.createTab(name, userId);

    res.json(response);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create tab' });
  }
};

const updateTab = async (req, res) => {
  try {
    const { name } = req.body;
    const userId = req.token.user.id;

    const response = await tabsService.updateTab(req.params.id, name, userId);

    res.json(response);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update tab' });
  }
};

const deleteTab = async (req, res) => {
  try {
    const userId = req.token.user.id;
    await tabsService.deleteTab(req.params.id, userId);
    res.json({ message: 'Tab deleted successfully' });
  } catch (error) {
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
