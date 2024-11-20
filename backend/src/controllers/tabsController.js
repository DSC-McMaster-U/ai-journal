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

module.exports = {
    getAllTabs,
    getTabById,
};