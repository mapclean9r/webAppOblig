import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { serveStatic } from "@hono/node-server/serve-static";
import { ProjectSchema, type Project } from "./types";

const app = new Hono();

app.use("/*", cors());

app.use("/static/*", serveStatic({ root: "./" }));

const projects: Project[] = [
    {
        "id": "1",
        "title": "Facebook copy",
        "beskrivelse": "En kopi av facebook",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMleaymP99uYkw995Q8Vxl16FRedxsXkh-QA&s",
        "teknologibruk": ["HTML","CSS","JavaScript","TypeScript","React"]
        },
        {
        "id": "2",
        "title": "Instagram copy",
        "beskrivelse": "En kopi av Instagram",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSK-ml5Hxr8K5z4-xCTz9T7fUhoUoZtfaKcIw&s",
        "teknologibruk": ["HTML","CSS","JavaScript","TypeScript","React"]
    },
    {
      "id": "1",
      "title": "Facebook copy",
      "beskrivelse": "En kopi av facebook",
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMleaymP99uYkw995Q8Vxl16FRedxsXkh-QA&s  ",
      "teknologibruk": ["HTML","CSS","JavaScript","TypeScript","React"]
      },
      {
        "id": "1",
        "title": "Facebook copy",
        "beskrivelse": "En kopi av facebook",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGMlHvOWVKfzAb8wOGqV6Z6YwaElHNI3Xo3w&s",
        "teknologibruk": ["HTML","CSS","JavaScript","TypeScript","React"]
        },
      {
        "id": "1",
        "title": "Facebook copy",
        "beskrivelse": "En kopi av facebook",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGMlHvOWVKfzAb8wOGqV6Z6YwaElHNI3Xo3w&s",
        "teknologibruk": ["HTML","CSS","JavaScript","TypeScript","React"]
        },
      {
        "id": "1",
        "title": "Facebook copy",
        "beskrivelse": "En kopi av facebook",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGMlHvOWVKfzAb8wOGqV6Z6YwaElHNI3Xo3w&s",
        "teknologibruk": ["HTML","CSS","JavaScript","TypeScript","React"]
        },
      {
        "id": "1",
        "title": "Facebook copy",
        "beskrivelse": "En kopi av facebook",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGMlHvOWVKfzAb8wOGqV6Z6YwaElHNI3Xo3w&s",
        "teknologibruk": ["HTML","CSS","JavaScript","TypeScript","React"]
        }
];

app.post("/add", async (c) => {
  const newProject = await c.req.json();
  const proj = ProjectSchema.parse(newProject);
  if (!proj) return c.json({ error: "Invalid habit" }, { status: 400 });
  console.log(proj);
  projects.push(proj);

  return c.json<Project[]>(projects, { status: 201 });
});

app.get("/", (c) => {
  return c.json<Project[]>(projects);
});

const port = 3999;

console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});