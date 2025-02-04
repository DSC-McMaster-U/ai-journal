const { log } = require('../logger');
const journalService = require('../services/journalService');

const getJournals = async (req, res) => {
  try {
    const userId = req.token.user.id;
    const dailyRecordId = req.dailyRecord.id;
    const { tabId } = req.query;

    let journals;
    if (tabId) {
      journals = await journalService.getTabJournals(userId, tabId);
    } else {
      journals = await journalService.getDailyJournals(userId, dailyRecordId);
    }

    res.status(200).json({ data: journals });
  } catch (error) {
    log(`Controller Error: ${error.message}`);
    res.status(500).json({ error: 'Failed to fetch journals' });
  }
};

const createJournal = async (req, res) => {
  try {
    const { title, content, tabId } = req.body;
    const userId = req.token.user.id;
    const dailyRecordId = req.dailyRecord.id;

    if (!title) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    let journal;

    if (tabId) {
      journal = await journalService.createTabJournal(
        userId,
        dailyRecordId,
        tabId,
        title,
        content
      );
    } else {
      journal = await journalService.createDailyJournal(
        userId,
        dailyRecordId,
        title,
        content
      );
    }

    res.status(201).json({
      data: {
        id: journal.id,
        title: journal.title,
        content: journal.content,
        userId: journal.user_id,
        tabId: journal.tab_id || null,
        dailyRecordId: journal.daily_record_id || null,
        createdAt: journal.created_at,
        updatedAt: journal.updated_at,
      },
    });
  } catch (error) {
    log(`Controller Error: ${error.message}`);

    if (error.message === 'A daily journal already exists for this record') {
      return res.status(409).json({ error: error.message });
    }

    res.status(500).json({ error: 'Failed to create journal' });
  }
};

const updateJournalInfo = async (req, res) => {
  try {
    const { title, tabId } = req.body;
    const { id } = req.params;
    const userId = req.token.user.id;

    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    const journal = await journalService.updateJournalInfo(
      id,
      userId,
      title,
      tabId
    );

    const response = {
      id: journal.id,
      title: journal.title,
      tabId: journal.tab_id,
      updatedAt: journal.updated_at,
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
    const userId = req.token.user.id;

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
  getJournals,
  createJournal,
  updateJournalInfo,
  deleteJournal,
};
