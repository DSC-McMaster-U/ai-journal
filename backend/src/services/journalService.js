const { executeQuery } = require('../utils/query');

const createDailyJournal = async (userId, dailyRecordId, title, content) => {
    // Check if journal exists for this daily record
    const existingJournal = await executeQuery(
        'SELECT id FROM journals WHERE daily_record_id = ?',
        [dailyRecordId]
    );

    if (existingJournal.length > 0) {
        throw new Error('A daily journal already exists for this record');
    }

    const result = await executeQuery(
        'INSERT INTO journals (title, content, user_id, daily_record_id) VALUES (?, ?, ?, ?)',
        [title, JSON.stringify(content), userId, dailyRecordId]
    );

    return {
        id: result.insertId,
        title,
        content,
        user_id: userId,
        daily_record_id: dailyRecordId,
        created_at: new Date(),
        updated_at: new Date()
    };
};

const createTabJournal = async (userId, tabId, title, content) => {
    const result = await executeQuery(
        'INSERT INTO journals (title, content, user_id, tab_id) VALUES (?, ?, ?, ?)',
        [title, JSON.stringify(content), userId, tabId]
    );

    return {
        id: result.insertId,
        title,
        content,
        user_id: userId,
        tab_id: tabId,
        created_at: new Date(),
        updated_at: new Date()
    };
};

const updateJournalInfo = async (journalId, userId, title, tabId) => {
    const journal = await executeQuery(
        'SELECT daily_record_id FROM journals WHERE id = ? AND user_id = ?',
        [journalId, userId]
    );

    if (journal.length === 0) {
        throw new Error('Journal not found');
    }

    if (journal[0].daily_record_id && tabId) {
        throw new Error('Cannot modify tab of a daily record journal');
    }

    const updateQuery = tabId
        ? 'UPDATE journals SET title = ?, tab_id = ? WHERE id = ? AND user_id = ?'
        : 'UPDATE journals SET title = ? WHERE id = ? AND user_id = ?';
    const params = tabId ? [title, tabId, journalId, userId] : [title, journalId, userId];

    const result = await executeQuery(updateQuery, params);

    if (result.affectedRows === 0) {
        throw new Error('Journal not found');
    }

    return {
        id: journalId,
        title,
        tab_id: tabId,
        updated_at: new Date()
    };
};

const deleteJournal = async (journalId, userId) => {
    const result = await executeQuery(
        'DELETE FROM journals WHERE id = ? AND user_id = ?',
        [journalId, userId]
    );

    if (result.affectedRows === 0) {
        throw new Error('Journal not found or unauthorized');
    }

    return { id: journalId };
};

module.exports = {
    createDailyJournal,
    createTabJournal,
    updateJournalInfo,
    deleteJournal
};