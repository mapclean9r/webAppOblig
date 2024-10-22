import { format } from "date-fns";
import { Project } from "../types";

const ProjectCard = ({
  projects,
  deleteProject,
  updateProject,
}: {
  projects: Project[];
  deleteProject: (id: string) => void;
  updateProject: (id: string) => void;
}) => {
  return (
    <section id="outP">
      {projects.map((project, index) => (
        <article key={index} id="cardPortfolio">
          <h3>{project.title}</h3>
          <img src={project.image} alt="img" />
          <p>{project.beskrivelse}</p>
          <p id="arrTech">{project.teknologibruk.join(", ")}</p>
          <p id="date">
            {project.publishedAt
              ? format(new Date(project.publishedAt), "dd/MM/yyyy")
              : "Date not available"}
          </p>

          <button
            type="button"
            id="delButton"
            onClick={() => deleteProject(project.id)}
          >
            Delete
          </button>

          <button
            type="button"
            id="updButton"
            onClick={() => updateProject(project.id)}
          >
            Edit
          </button>
        </article>
      ))}
    </section>
  );
};

export default ProjectCard;