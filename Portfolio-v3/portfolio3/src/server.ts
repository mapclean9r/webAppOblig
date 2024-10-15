import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { serveStatic } from "@hono/node-server/serve-static";
import { Project } from "./types";

const app = new Hono();

app.use("/*", cors());

app.use("/static/*", serveStatic({ root: "./" }));




const projects: Project[] = [
    {
        "id": crypto.randomUUID(),
        "date": new Date(),
        "title": "Facebook copy",
        "beskrivelse": "En kopi av facebook",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMleaymP99uYkw995Q8Vxl16FRedxsXkh-QA&s",
        "teknologibruk": ["HTML","CSS","JavaScript","TypeScript","React"]
        },
        {
        "id": crypto.randomUUID(),
        "date": new Date(),
        "title": "Instagram copy",
        "beskrivelse": "En kopi av Instagram",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSK-ml5Hxr8K5z4-xCTz9T7fUhoUoZtfaKcIw&s",
        "teknologibruk": ["HTML","CSS","JavaScript"]
    },
  ];


app.get("/", (c) => {
  return c.json<Project[]>(projects);
});

app.post("/add", async (c) => {
  const proj = await c.req.json() as Project;

  const create = {
    id: crypto.randomUUID(),
    date: new Date(),
    title: proj.title,
    beskrivelse: proj.beskrivelse,
    image: proj.image,
    teknologibruk: proj.teknologibruk
  }
  projects.push(create)
  return c.json<Project[]>(projects, { status: 201 });
});

const port = 3999;

console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});