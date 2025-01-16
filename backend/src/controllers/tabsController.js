const tabsService = require('../services/tabsService');

const getAllTabs = async (req, res) => {
  // TODO make this return only tabs for this user
  try {
    const tabs = await tabsService.getAllTabs();
    res.json(tabs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tabs' });
  }
};

const getTabById = async (req, res) => {
  // TODO make this return only tabs for this user
  try {
    const tab = await tabsService.getTabById(req.params.id);
    res.json(tab);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tab' });
  }
};

const createTab = async (req, res) => {
  // TODO remove the need to pass userid in the body, use the middleware
  try {
    const { name, user_id } = req.body;

    await tabsService.createTab(name, user_id);

    // TODO return the created tab
    res.json({ message: 'Tab created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create tab' });
  }
};

const updateTab = async (req, res) => {
  try {
    const { name } = req.body;
    await tabsService.updateTab(req.params.id, name);

    // TODO return the updated tab
    res.json({ message: 'Tab updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update tab' });
  }
};

const deleteTab = async (req, res) => {
  try {
    await tabsService.deleteTab(req.params.id);
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
