import { z } from "zod";

export const ProjectSchema = z.object({
    id: z.string().uuid(),
    datePublished: z.string().nullable(),
    userId: z.string(),
    title: z.string(),
    beskrivelse: z.string(),
    image: z.string(),
    teknologibruk: z.string().array(),
    status: z.string(),
    publicc: z.boolean(),
    publishedAt: z.string().nullable(),
  });

export const dbProject = z.object({
    id: z.string(),
    datePublished: z.string().nullable(),
    userId: z.string(),
    title: z.string(),
    beskrivelse: z.string(),
    image: z.string(),
    teknologibruk: z.string().array(),
    status: z.string(),
    publicc: z.boolean(),
    publishedAt: z.string().nullable(),
  });

  export const createProjectSchema = dbProject.omit({

  });

  export const updateProjectSchema = dbProject.omit({

  });

  export const studentResponseSchema = dbProject.extend({

  });


  export type dbProject = z.infer<typeof ProjectSchema>;
  export type ProjectFromDb = z.infer<typeof dbProject>;
  export type CreateProject = z.infer<typeof createProjectSchema>;
  export type UpdateProject = z.infer<typeof updateProjectSchema>;
  export type ProjectResponse = z.infer<typeof studentResponseSchema>;

  export const validateCreateProject = (data: unknown) => {
    return createProjectSchema.safeParse(data);
  };
  
  export const validateUpdateProject = (data: unknown) => {
    return updateProjectSchema.safeParse(data);
  };
  
  export const validateProject = (data: unknown) => {
    return ProjectSchema.safeParse(data);
  };