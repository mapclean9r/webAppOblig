import { DB } from "./db";

export const createTables = (db: DB) => {
    db.exec(`
        CREATE TABLE IF NOT EXISTS projects (
          id TEXT PRIMARY KEY,
          title TEXT NOT NULL,
          beskrivelse TEXT NOT NULL,
          date TEXT NOT NULL,
          created_at TEXT NOT NULL,
          image TEXT,
          userId TEXT NOT NULL,
          status TEXT NOT NULL,
          publicc INTEGER NOT NULL,
          publishedAt TEXT
        );
        
        CREATE TABLE IF NOT EXISTS technologies (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          project_id TEXT NOT NULL,
          technology TEXT NOT NULL,
          FOREIGN KEY (project_id) REFERENCES projects(id)
        );
    `);
}