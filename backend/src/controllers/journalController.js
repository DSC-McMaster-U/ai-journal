const journalService = require('../services/journalService');

const createDailyJournal = async (req, res) => {
    try {
        const { title, content } = req.body;
        const userId = req.user.id;
        const dailyRecordId = req.dailyRecord.id;

        if (!title || !content) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const journal = await journalService.createDailyJournal(userId, dailyRecordId, title, content);


        const response = {
            id: journal.id,
            title: journal.title,
            content: journal.content,
            userId: journal.user_id,
            dailyRecordId: journal.daily_record_id,
            createdAt: journal.created_at,
            updatedAt: journal.updated_at
        };

        res.status(201).json(response);
    } catch (error) {
        if (error.message === 'A daily journal already exists for this record') {
            res.status(409).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Failed to create daily journal' });
        }
    }
};

const createTabJournal = async (req, res) => {
    try {
        const { title, content, tabId } = req.body;
        const userId = req.user.id;

        if (!title || !content || !tabId) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const journal = await journalService.createTabJournal(userId, tabId, title, content);

        // Transform response to camelCase for API consistency
        const response = {
            id: journal.id,
            title: journal.title,
            content: journal.content,
            userId: journal.user_id,
            tabId: journal.tab_id,
            createdAt: journal.created_at,
            updatedAt: journal.updated_at
        };

        res.status(201).json(response);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create journal' });
    }
};

const updateJournalInfo = async (req, res) => {
    try {
        const { title, tabId } = req.body;
        const { id } = req.params;
        const userId = req.user.id;

        if (!title) {
            return res.status(400).json({ error: 'Title is required' });
        }

        const journal = await journalService.updateJournalInfo(id, userId, title, tabId);

        // Transform response to camelCase for API consistency
        const response = {
            id: journal.id,
            title: journal.title,
            tabId: journal.tab_id,
            updatedAt: journal.updated_at
        };

        res.status(200).json(response);
    } catch (error) {
        if (error.message === 'Cannot modify tab of a daily record journal') {
            res.status(400).json({ error: error.message });
        } else if (error.message === 'Journal not found') {
            res.status(404).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Failed to update journal' });
        }
    }
};

const deleteJournal = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        await journalService.deleteJournal(id, userId);
        res.status(200).json({ message: 'Journal deleted successfully' });
    } catch (error) {
        if (error.message === 'Journal not found or unauthorized') {
            res.status(404).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Failed to delete journal' });
        }
    }
};

module.exports = {
    createDailyJournal,
    createTabJournal,
    updateJournalInfo,
    deleteJournal
};