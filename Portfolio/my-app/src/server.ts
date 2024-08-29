import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { serveStatic } from "@hono/node-server/serve-static";
import { ProjectSchema, type Project } from "./types";

const app = new Hono();

app.use("/*", cors());

app.use("/static/*", serveStatic({ root: "./" }));

// Setter typen til habits til å være en array av Habit
const projects: Project[] = [
    {
        "id": "1",
        "title": "Facebook copy",
        "beskrivelse": "En kopi av facebook",
        "teknologibruk": ["HTML","CSS","JavaScript","TypeScript","React"]
        },
        {
        "id": "2",
        "title": "Instagram copy",
        "beskrivelse": "En kopi av Instagram",
        "teknologibruk": ["HTML","CSS","JavaScript","TypeScript","React"]
    }
];

app.post("/add", async (c) => {
  const newProject = await c.req.json();
  // Validerer at dataen vi mottar er en gyldig Habit
  const proj = ProjectSchema.parse(newProject);
  // Sjekker om habit er en gyldig Habit, og returnerer en feilmelding hvis ikke
  if (!proj) return c.json({ error: "Invalid habit" }, { status: 400 });
  console.log(proj);
  projects.push(proj);

  // Returnerer en liste med alle habits. Bruker generisk type for å fortelle at vi returnerer en array av Habit
  return c.json<Project[]>(projects, { status: 201 });
});

app.get("/", (c) => {
  // Returnerer en liste med alle habits. Bruker generisk type for å fortelle at vi returnerer en array av Habit
  return c.json<Project[]>(projects);
});

const port = 3999;

console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});