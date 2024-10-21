import { Project } from "../../types";
import { ProjectFromDb, ProjectResponse } from "./dbType";
import { createID } from "./util";

export const createProjectResponse = (proj: Project): ProjectResponse => {
  const { id, datePublished, userId, title, beskrivelse, image, teknologibruk, status, publicc, publishedAt } = proj;

  return {
    ...proj,
    id,
    datePublished: datePublished ? new Date().toISOString() : null,
    userId,
    title,
    beskrivelse,
    image,
    teknologibruk,
    status,
    publicc,
    publishedAt: publishedAt ? new Date().toISOString() : null
  };
};

// Konverterer en database-representasjon til en applikasjonsmodell
export const fromDb = (project: ProjectFromDb) => {
  return {
    id: project.id,
    datePublished: project.datePublished ? new Date(project.datePublished).toISOString() : null,
    userId: project.userId,
    title: project.title,
    beskrivelse: project.beskrivelse,
    image: project.image,
    teknologibruk: project.teknologibruk,
    status: project.status,
    publicc: project.publicc,
    publishedAt: project.publishedAt ? new Date(project.publishedAt).toISOString() : null,
  };
};

export const createProject = (proj: Partial<Project>): Project => {
    return {
      id: proj.id ?? createID(),
      datePublished: proj.datePublished ?? new Date().toISOString(),
      userId: proj.userId ?? "",
      title: proj.title ?? "",
      beskrivelse: proj.beskrivelse ?? "",
      image: proj.image ?? "",
      teknologibruk: proj.teknologibruk ?? [],
      status: proj.status ?? "",
      publicc: proj.publicc ?? false,
      publishedAt: proj.publishedAt ?? new Date().toISOString(),
    };
  };

  export const toDb = (data: Project) => {
    const project = createProject(data);
    
    return {
      id: project.id,
      datePublished: project.datePublished ? new Date().toISOString() : null,
      userId: project.userId,
      title: project.title,
      beskrivelse: project.beskrivelse,
      image: project.image,
      teknologibruk: project.teknologibruk,
      status: project.status,
      publicc: project.publicc,
      publishedAt: project.publishedAt ? new Date().toISOString() : null,
    };
  };