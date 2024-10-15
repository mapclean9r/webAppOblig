import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { serveStatic } from "@hono/node-server/serve-static";
import { type ProjectSchema } from "./types";

const app = new Hono();

app.use("/*", cors());

app.use("/static/*", serveStatic({ root: "./" }));

const projects: ProjectSchema[] = [
    {
        "id": crypto.randomUUID(),
        "title": "Facebook copy",
        "beskrivelse": "En kopi av facebook",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMleaymP99uYkw995Q8Vxl16FRedxsXkh-QA&s",
        "teknologibruk": ["HTML","CSS","JavaScript","TypeScript","React"]
        },
        {
        "id": crypto.randomUUID(),
        "title": "Instagram copy",
        "beskrivelse": "En kopi av Instagram",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSK-ml5Hxr8K5z4-xCTz9T7fUhoUoZtfaKcIw&s",
        "teknologibruk": ["HTML","CSS","JavaScript"]
    },
  ];


app.get("/", (c) => {
  return c.json<ProjectSchema[]>(projects);
});

app.post("/add", async (c) => {
  const proj = await c.req.json();
  projects.push(proj)
  return c.json<ProjectSchema[]>(projects, { status: 201 });
});

const port = 3999;

console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});