import { join } from 'path';
import { promises as fs } from 'fs';
import { DB } from './db';
import { Project } from '../types';

export const seed = async (db: DB) => {
  const path = join(import.meta.dirname, "data.json");
  const file = await fs.readFile(path, "utf-8");
  
  const { projects } = JSON.parse(file) as { projects: Project[] };

  const insertProject = db.prepare(`
    INSERT INTO projects (id, title, beskrivelse, datePublished, image, userId, status, publicc, publishedAt)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const insertTech = db.prepare(`
    INSERT INTO technologies (project_id, technology)
    VALUES (?, ?)
  `);

  db.transaction(() => {
    for (const project of projects) {
      insertProject.run(
        project.id,
        project.title,
        project.beskrivelse,
        project.datePublished,
        project.image,
        project.userId,
        project.status,
        project.publicc ? 1 : 0,
        project.publishedAt
      );

      for (const tech of project.teknologibruk) {
        insertTech.run(project.id, tech);
      }
    }
  })();
};
