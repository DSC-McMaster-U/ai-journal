const { executeQuery } = require('../utils/query');
const { getTabById } = require('./tabsService');

const getDailyJournals = async (userId) => {
  const journals = await executeQuery(
    `SELECT * FROM journals 
       WHERE user_id = ? 
       AND tab_id IS NULL
       ORDER BY created_at DESC`,
    [userId]
  );

  return journals.map((journal) => ({
    id: journal.id,
    title: journal.title,
    content: JSON.parse(journal.content),
    tab_id: journal.tab_id,
    created_at: journal.created_at,
    updated_at: journal.updated_at,
  }));
};

const getTabJournals = async (userId, tabId) => {
  const journals = await executeQuery(
    `SELECT * FROM journals 
       WHERE user_id = ? 
       AND tab_id = ?
       ORDER BY created_at DESC`,
    [userId, tabId]
  );

  return journals.map((journal) => ({
    id: journal.id,
    title: journal.title,
    content: JSON.parse(journal.content),
    tab_id: journal.tab_id,
    created_at: journal.created_at,
    updated_at: journal.updated_at,
  }));
};

const getJournalById = async (journalId, userId) => {
  const journal = await executeQuery(
    `SELECT * FROM journals WHERE id = ? AND user_id = ?`,
    [journalId, userId]
  );

  if (journal.length === 0) {
    throw new Error('Journal not found');
  }

  return {
    id: journal[0].id,
    title: journal[0].title,
    content: JSON.parse(journal[0].content),
    user_id: journal[0].user_id,
    tab_id: journal[0].tab_id,
    daily_record_id: journal[0].daily_record_id,
    created_at: journal[0].created_at,
    updated_at: journal[0].updated_at,
  };
};

const createDailyJournal = async (userId, dailyRecordId, title, content) => {
  const existingJournal = await executeQuery(
    'SELECT id FROM journals WHERE user_id = ? AND daily_record_id = ? AND tab_id IS NULL',
    [userId, dailyRecordId]
  );

  if (existingJournal.length > 0) {
    throw new Error('A daily journal already exists for this record');
  }

  const result = await executeQuery(
    `INSERT INTO journals (title, content, user_id, daily_record_id) 
       VALUES (?, ?, ?, ?)`,
    [title, JSON.stringify(content), userId, dailyRecordId]
  );

  return {
    id: result.insertId,
    title,
    content,
    user_id: userId,
    daily_record_id: dailyRecordId,
    tab_id: null,
    created_at: new Date(),
    updated_at: new Date(),
  };
};

const createTabJournal = async (
  userId,
  dailyRecordId,
  tabId,
  title,
  content
) => {
  const tab = await getTabById(tabId, userId);
  if (tab.length === 0) {
    throw new Error(
      'Unauthorized: Tab does not belong to the user or does not exist'
    );
  }

  const result = await executeQuery(
    `INSERT INTO journals (title, content, user_id, daily_record_id, tab_id) 
       VALUES (?, ?, ?, ?, ?)`,
    [title, JSON.stringify(content), userId, dailyRecordId, tabId]
  );

  return {
    id: result.insertId,
    title,
    content,
    user_id: userId,
    daily_record_id: dailyRecordId,
    tab_id: tabId,
    created_at: new Date(),
    updated_at: new Date(),
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
  const params = tabId
    ? [title, tabId, journalId, userId]
    : [title, journalId, userId];

  const result = await executeQuery(updateQuery, params);

  if (result.affectedRows === 0) {
    throw new Error('Journal not found');
  }

  return {
    id: journalId,
    title,
    tab_id: tabId,
    updated_at: new Date(),
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
  getDailyJournals,
  getTabJournals,
  getJournalById,
  createDailyJournal,
  createTabJournal,
  updateJournalInfo,
  deleteJournal,
};
