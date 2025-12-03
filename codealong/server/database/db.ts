import Database from 'better-sqlite3';
import path from 'path';

// Create database file in the server directory
const dbPath = path.join(process.cwd(), 'server', 'database', 'jokes.db');
const db = new Database(dbPath);

// Initialize the database schema
export function initDatabase() {
  // Create jokes table
  db.exec(`
    CREATE TABLE IF NOT EXISTS jokes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      text TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
}

// Initialize on import
initDatabase();

export default db;
