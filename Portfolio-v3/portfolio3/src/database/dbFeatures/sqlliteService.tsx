import {
  projectRepository,
  type ProjectRepository,
} from "./repo";

import {
  validateCreateProject,
  type CreateProject,
  type dbProject,
  type ProjectResponse,
  type UpdateProject,
} from "./dbType";

import type { Result } from "../../../lib/ind"

import { createProject, createProjectResponse } from "./mapper";
import type { Query } from "../../../lib/query";

export const createProjectService = (projectRepository: ProjectRepository) => {
  const getById = async (id: string): Promise<Result<dbProject | undefined>> => {
    return projectRepository.getById(id);
  };

  const list = async (query?: Query): Promise<Result<ProjectResponse[]>> => {
    const result = await projectRepository.list(query);
    if (!result.success) return result;

    return {
      ...result,
      data: result.data.map(createProjectResponse),
    };
  };

  const create = async (data: CreateProject): Promise<Result<string>> => {
    const proj = createProject(data);

    if (!validateCreateProject(proj).success) {
      return {
        success: false,
        error: { code: "BAD_REQUEST", message: "Invalid student data" },
      };
    }
    return projectRepository.create(proj);
  };

  const update = async (data: UpdateProject) => {
    const proj = createProject(data);

    if (!validateCreateProject(proj).success) {
      return {
        success: false,
        error: { code: "BAD_REQUEST", message: "Invalid student data" },
      };
    }

    return projectRepository.update(proj);
  };

  const remove = async (id: string) => {
    return projectRepository.remove(id);
  };

  return {
    list,
    create,
    update,
    getById,
    remove,
  };
};

export const projectService = createProjectService(projectRepository);

export type ProjectService = ReturnType<typeof createProjectService>;