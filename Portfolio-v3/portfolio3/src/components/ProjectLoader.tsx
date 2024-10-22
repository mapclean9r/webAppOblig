import useProject from "../hooks/useProject";
import ProjectCard from "./ProjectCards";

export default function ProjectLoader() {
  const { loadedProjects, deleteProject, updateProject } = useProject();

  return (
    <ProjectCard
      projects={loadedProjects}
      deleteProject={deleteProject}
      updateProject={updateProject}
    />
  );
}