import { useEffect, useState } from "react"
import { ProjectSchema } from "../types"
import ProjectCard from "./ProjectCard";

export default function ProjectLoader() {

    const [loadedprojects, setLoadedProjects] = useState<ProjectSchema[]>([])

    const loadFromApi = () => {
        fetch("http://localhost:3999")
      .then((response) => response.json())
      .then((data: ProjectSchema[]) => {
        setLoadedProjects(data);
      })
      .catch((error: Error) => {
        console.error("Error henting data:", error);
      });
      }

      useEffect(() => {
        loadFromApi()
      },
    [loadedprojects])


    return(
        <ProjectCard projects={loadedprojects}/>
    )
}