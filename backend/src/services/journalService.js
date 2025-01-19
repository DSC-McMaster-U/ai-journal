const { connection } = require('../database');

const createDailyJournal = async (userId, dailyRecordId, title, content) => {
    return new Promise((resolve, reject) => {
        // First check if a daily journal already exists for this record
        connection.query(
            'SELECT id FROM journals WHERE daily_record_id = ?',
            [dailyRecordId],
            (error, results) => {
                if (error) {
                    reject(error);
                    return;
                }

                if (results.length > 0) {
                    reject(new Error('A daily journal already exists for this record'));
                    return;
                }

                // Create the journal entry
                connection.query(
                    'INSERT INTO journals (title, content, user_id, daily_record_id) VALUES (?, ?, ?, ?)',
                    [title, JSON.stringify(content), userId, dailyRecordId],
                    (error, results) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve({
                                id: results.insertId,
                                title,
                                content,
                                user_id: userId,
                                daily_record_id: dailyRecordId,
                                created_at: new Date(),
                                updated_at: new Date()
                            });
                        }
                    }
                );
            }
        );
    });
};

const createTabJournal = async (userId, tabId, title, content) => {
    return new Promise((resolve, reject) => {
        connection.query(
            'INSERT INTO journals (title, content, user_id, tab_id) VALUES (?, ?, ?, ?)',
            [title, JSON.stringify(content), userId, tabId],
            (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve({
                        id: results.insertId,
                        title,
                        content,
                        user_id: userId,
                        tab_id: tabId,
                        created_at: new Date(),
                        updated_at: new Date()
                    });
                }
            }
        );
    });
};

const updateJournalInfo = async (journalId, userId, title, tabId) => {
    return new Promise((resolve, reject) => {
        // First check if journal exists and if it's a daily record journal
        connection.query(
            'SELECT daily_record_id FROM journals WHERE id = ? AND user_id = ?',
            [journalId, userId],
            (error, results) => {
                if (error) {
                    reject(error);
                    return;
                }

                if (results.length === 0) {
                    reject(new Error('Journal not found'));
                    return;
                }

                // If it's a daily record journal, don't allow tab modification
                if (results[0].daily_record_id && tabId) {
                    reject(new Error('Cannot modify tab of a daily record journal'));
                    return;
                }

                // Update the journal
                const updateQuery = tabId
                    ? 'UPDATE journals SET title = ?, tab_id = ? WHERE id = ? AND user_id = ?'
                    : 'UPDATE journals SET title = ? WHERE id = ? AND user_id = ?';
                const params = tabId ? [title, tabId, journalId, userId] : [title, journalId, userId];

                connection.query(updateQuery, params, (error, results) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve({
                            id: journalId,
                            title,
                            tab_id: tabId,
                            updated_at: new Date()
                        });
                    }
                });
            }
        );
    });
};

const deleteJournal = async (journalId, userId) => {
    return new Promise((resolve, reject) => {
        connection.query(
            'DELETE FROM journals WHERE id = ? AND user_id = ?',
            [journalId, userId],
            (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    if (results.affectedRows === 0) {
                        reject(new Error('Journal not found or unauthorized'));
                    } else {
                        resolve({ id: journalId });
                    }
                }
            }
        );
    });
};

module.exports = {
    createDailyJournal,
    createTabJournal,
    updateJournalInfo,
    deleteJournal
};