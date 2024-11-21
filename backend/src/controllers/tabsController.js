const tabsService = require('../services/tabsService');

// Controller for fetching all tabs
const getAllTabs = async (req, res) => {
    try {
        const tabs = await tabsService.getAllTabs();
        res.json(tabs);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch tabs' });
    }
};

// Controller for fetching a tab by ID
const getTabById = async (req, res) => {
    try {
        const tab = await tabsService.getTabById(req.params.id);
        res.json(tab);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch tab' });
    }
};

// Controller for creating a new tab
const createTab = async (req, res) => {
    try {
        const { id, name, userId } = req.body;
        await tabsService.createTab(id, name, userId);
        res.json({ message: 'Tab created successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create tab' });
    }
};

// Controller for updating a tab by ID
const updateTab = async (req, res) => {
    try {
        const { name } = req.body;
        await tabsService.updateTab(req.params.id, name);
        res.json({ message: 'Tab updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update tab' });
    }
};

// Controller for deleting a tab by ID
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
};