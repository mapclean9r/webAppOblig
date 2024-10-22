import { format } from "date-fns";
import { Project } from "../types";
import useProject from "../hooks/useProject";

const ProjectCard = ({projects}:{projects: Project[]}) => {

  const { deleteProject } = useProject()

  return(
    <section id="outP">
      {<>
        {console.log("aaa", projects)}
      </>}

      {projects.map((project, index) => (
  <article key={index} id="cardPortfolio">
    <h3>{project.title}</h3>
    <img src={project.image} alt="img"/>
    <p>{project.beskrivelse}</p>
    <p id="arrTech">{project.teknologibruk.join(", ")}</p>
    <p id="date"> {project.publishedAt
              ? format(new Date(project.publishedAt), "dd/MM/yyyy")
              : "Date not available"} </p>

    <button type="button" id="delButton" 
    onClick={() => deleteProject(project.id)}
    >Delete</button>

  </article>))}
  
  </section>
)
}    
export default ProjectCard