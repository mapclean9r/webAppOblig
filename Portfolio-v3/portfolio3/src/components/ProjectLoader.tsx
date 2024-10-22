import ProjectCard from "./ProjectCards";
import useProject from "../hooks/useProject";

export default function ProjectLoader() {

    return(
        <ProjectCard projects={useProject().loadedProjects}/>
    )
}