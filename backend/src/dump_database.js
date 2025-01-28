require('dotenv').config();

const fs = require('fs');
const path = require('path');
const mysqldump = require('mysqldump');
const db = require('./database'); // Import your connection object
const connection = db.connection

const dumpDatabase = async () => {

  const outputDir = path.resolve(__dirname, './../sql'); // Points to ./backend/sql
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true }); // Create the directory if it doesn't exist
    }

  const timestamp = new Date().toISOString().split('T')[0];
  const fileName = `database_dump_${timestamp}.sql`;
  const filePath = path.join(outputDir, fileName); // Full path to the SQL file

  console.log('Starting database dump...');

  try {
    await mysqldump({
      connection:{
        host: connection.config.host,
        user: connection.config.user,
        password: connection.config.password,
        database: connection.config.database
      },
      dumpToFile: filePath, // Directly write to the file
    });
    console.log(`Database dumped to ${filePath}`);
  } catch (err) {
    console.error('Error during database dump:', err);
  }

  db.closeConnection()
};

dumpDatabase();
