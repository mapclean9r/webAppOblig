import useProject from "../hooks/useProject";
import ProjectCard from "./ProjectCards";

export default function ProjectLoader() {
  const { loadedProjects, deleteProject } = useProject();

  return (
    <ProjectCard
      projects={loadedProjects}
      deleteProject={deleteProject}
      //updateProject={updateProject}
    />
  );
}