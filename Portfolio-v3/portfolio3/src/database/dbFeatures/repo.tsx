import db, { DB } from "../db";
import type {
  CreateProject,
  dbProject,
  ProjectFromDb,
  UpdateProject,
} from "./dbType";
import { fromDb, toDb } from "./mapper";
import type { Query } from "../../../lib/query";
import type { Result } from "../../../lib/ind";


export const createProjectRepository = (db: DB) => {
  const exist = async (id: string): Promise<boolean> => {
    const query = db.prepare(
      "SELECT COUNT(*) as count FROM projects WHERE id = ?"
    );
    const data = query.get(id) as { count: number };
    return data.count > 0;
  };

  const getById = async (id: string): Promise<Result<dbProject>> => {
    try {
      const proj = await exist(id);
      if (!proj)
        return {
          success: false,
          error: { code: "NOT_FOUND", message: "Project not found" },
        };
      const query = db.prepare("SELECT * FROM projects WHERE id = ?");
      const data = query.get(id) as ProjectFromDb;
      return {
        success: true,
        data: fromDb(data),
      };
    } catch (error) {
      return {
        success: false,
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: "Feil med henting av project",
        },
      };
    }
  };

  const list = async (params?: Query): Promise<Result<dbProject[]>> => {
    try {
      const { name, pageSize = 10, page = 0 } = params ?? {};

      const offset = (Number(page) - 1) * Number(pageSize);

      const hasPagination = Number(page) > 0;

      let query = "SELECT * FROM projects";
      query += name ? `WHERE name LIKE '%${name}%'` : "";
      query += pageSize ? ` LIMIT ${pageSize}` : "";
      query += offset ? ` OFFSET ${offset}` : "";

      const statement = db.prepare(query);

      const data = statement.all() as ProjectFromDb[];

      const { total } = db
        .prepare("SELECT COUNT(*) as total from projects")
        .get() as {
        total: number;
      };

      const totalPages = Math.ceil(total / Number(pageSize ?? 1));
      const hasNextPage = Number(page) < totalPages;
      const hasPreviousPage = Number(page ?? 1) > 1;

      return {
        success: true,
        data: data.map(fromDb),
        ...(hasPagination
          ? {
              total: data.length,
              pageSize,
              page,
              totalPages,
              hasNextPage,
              hasPreviousPage,
            }
          : {}),
      };
    } catch (error) {
      return {
        success: false,
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: "Feil med henting av projecter",
        },
      };
    }
  };

  const create = async (data: CreateProject): Promise<Result<string>> => {
    try {
        const project = toDb(data);
      
        const query = db.prepare(`
          INSERT INTO projects (id, title, beskrivelse, datePublished, image, userId, status, publicc, publishedAt)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `);

        const insertTech = db.prepare(`
          INSERT INTO technologies (project_id, technology)
          VALUES (?, ?)
        `);

      query.run(
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
      return {
        success: true,
        data: project.id,
      };
    } catch (error) {
      console.error("Error deleting project:", error);

      return {
        success: false,
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: "Feil med oppretting av project",
        },
      };
    }
  };

  const update = async (data: UpdateProject): Promise<Result<dbProject>> => {
    try {
      const projectExist = await exist(data.id);

      if (!projectExist)
        return {
          success: false,
          error: { code: "NOT_FOUND", message: "Project not found" },
        };

      const proj = toDb(data);

      const query = db.prepare(`
        UPDATE projects
        SET title = ?,
        beskrivelse = ?,
        WHERE id = ?
      `);

      query.run(
        proj.title,
        proj.beskrivelse,
        proj.image,
        JSON.stringify(proj.teknologibruk),
        proj.status,
        proj.publicc,
        proj.publishedAt,
        proj.datePublished,
        proj.id
      );

      return {
        success: true,
        data: fromDb(proj),
      };
    } catch (error) {
      console.log(error)
      return {
        success: false,
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: "Feil med oppdatering av projects",
        },
      };
    }
  };

  const remove = async (id: string): Promise<Result<string>> => {
    try {
      const proj = await exist(id);
  
      if (!proj) {
        return {
          success: false,
          error: { code: "NOT_FOUND", message: "Project not found" },
        };
      }
  
      const deleteRelated = db.prepare("DELETE FROM technologies WHERE project_id = ?");
      deleteRelated.run(id);
  
     const query = db.prepare("DELETE FROM projects WHERE id = ?");
      query.run(id);
  
      return {
        success: true,
        data: id,
      };
  
    } catch (error) {
      console.error("Error deleting project:", error);
      return {
        success: false,
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: "Feil med sletting av project",
        },
      };
    }
  };
  
  

  return { create, list, getById, update, remove };
};

export const projectRepository = createProjectRepository(db);

export type ProjectRepository = ReturnType<typeof createProjectRepository>;
