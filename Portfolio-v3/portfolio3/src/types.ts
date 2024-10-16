import { z } from "zod";

// Definerer et Zod-skjema for Habit
export const ProjectSchema = z.object({
  id: z.string().uuid(),
  datePublished: z.coerce.date(),
  userId: z.string(),
  title: z.string(),
  beskrivelse: z.string(),
  image: z.string(),
  teknologibruk: z.string().array(),
  status: z.string(),
  public: z.boolean(),
  publishedAt: z.coerce.date().nullable(),
});

export const User = z.object({
  id: z.string(),
  name: z.string(),
  role: z.string()
})

// Definerer et Zod-skjema for å opprette en ny Habit
export const ProjectCreateSchema = ProjectSchema.omit({ id: true, datePublished: true });

// Definerer et Zod-skjema for en array av Habit
export const ProjectArraySchema = z.array(ProjectSchema);

// Oppdatert type-definisjon basert på Zod-skjemaet
export type Project = z.infer<typeof ProjectSchema>;
export type UserInfo = z.infer<typeof User>;

// Oppdatert type-definisjon basert på Zod-skjemaet
export type CreateProject = z.infer<typeof ProjectCreateSchema>;

