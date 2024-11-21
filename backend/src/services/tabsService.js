const connection = require("../database");

// Query all tabs
const getAllTabs = () => {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM `ai-journal`.`tabs`", (error, results) => {
        if (error) {
            reject(error);
        } else {
            resolve(results);
        }
        });
    });
};

// Query tab by ID
const getTabById = (id) => {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM `ai-journal`.`tabs` WHERE id = ?", [id], (error, results) => {
        if (error) {
            reject(error);
        } else {
            resolve(results);
        }
        });
    });
};

// Create a new tab
const createTab = (id, name, userId) => {
    return new Promise((resolve, reject) => {
        connection.query("INSERT INTO `ai-journal`.`tabs` (id, name, userId) VALUES (?, ?, ?)", [id, name, userId], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};

// Update a tab by ID
const updateTab = (id, name) => {
    return new Promise((resolve, reject) => {
        connection.query("UPDATE `ai-journal`.`tabs` SET name = ? WHERE id = ?", [name, id], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};

// Delete a tab by ID
const deleteTab = (id) => {
    return new Promise((resolve, reject) => {
        connection.query("DELETE FROM `ai-journal`.`tabs` WHERE id = ?", [id], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};

module.exports = {
    getAllTabs,
    getTabById,
    createTab,
    updateTab,
    deleteTab,
};