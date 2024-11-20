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

module.exports = {
    getAllTabs,
    getTabById,
};