import sqlite3 from 'sqlite3';

export async function initDB() {
  const db = new sqlite3.Database('./dev.db');
  
  db.serialize(() => {
    // Todos table
    db.run(`
      CREATE TABLE IF NOT EXISTS todos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        text TEXT NOT NULL,
        completed INTEGER DEFAULT 0,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Analytics table
    db.run(`
      CREATE TABLE IF NOT EXISTS analytics (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        visitor_id TEXT NOT NULL,
        page TEXT,
        event_type TEXT,
        duration INTEGER,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Sessions table for tracking session start/end
    db.run(`
      CREATE TABLE IF NOT EXISTS sessions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        visitor_id TEXT NOT NULL,
        start_time TEXT,
        end_time TEXT,
        duration INTEGER
      )
    `);
  });

  return db;
}

export function getDB() {
  return new sqlite3.Database('./dev.db');
}