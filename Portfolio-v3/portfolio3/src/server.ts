import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { serveStatic } from "@hono/node-server/serve-static";
import { Project } from "./types";
import { getUser } from "./auth";

const app = new Hono();

app.use("/static/*", serveStatic({ root: "./" }));

app.use(
  "/*",
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Sample project data
let projects: Project[] = [
  {
    id: crypto.randomUUID(),
    datePublished: new Date().toISOString(),
    userId: "3",
    title: "Facebook copy",
    beskrivelse: "En kopi av facebook",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMleaymP99uYkw995Q8Vxl16FRedxsXkh-QA&s",
    teknologibruk: ["HTML", "CSS", "JavaScript", "TypeScript", "React"],
    status: "idle",
    publicc: false,
    publishedAt: null,
  },
  {
    id: crypto.randomUUID(),
    datePublished: new Date().toISOString(),
    userId: "2",
    title: "Instagram copy",
    beskrivelse: "En kopi av Instagram",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSK-ml5Hxr8K5z4-xCTz9T7fUhoUoZtfaKcIw&s",
    teknologibruk: ["HTML", "CSS", "JavaScript"],
    status: "idle",
    publicc: true,
    publishedAt: null,
  },
];

app.get("/", async (c) => {
  const user = getUser(c.req.raw);

  if (!user) {
    // User auth
    return new Response("Ingen tilgang", {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const userProjects = projects.filter((proj) => {
    return proj.userId === user.id || user.role === 'admin'
  });

  return c.json({
    projectData: userProjects,
  });
});

app.post("/add", async (c) => {
  const proj = await c.req.json<Project>();

  const create = {
    id: crypto.randomUUID(),
    datePublished: new Date().toISOString(),
    userId: proj.userId,
    title: proj.title,
    beskrivelse: proj.beskrivelse,
    image: proj.image,
    teknologibruk: proj.teknologibruk,
    status: proj.status,
    publicc: proj.publicc,
    publishedAt: proj.publishedAt || null,
  };

  projects.push(create);

  return c.json<Project[]>(projects, { status: 201 });
});

app.delete("/delete", (c) => {
  const id = c.req.param("id")
  projects = projects.filter((proj) => proj.id !== id)
  return c.json(projects)
})


app.patch("/patch", async (c) => {
  const id = c.req.param("id")
  const {name} = await c.req.json()
  projects = projects.map(proj =>
     proj.id === id ? { ...proj, name }: proj);
  return c.json(projects)
})

const port = 3999;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
