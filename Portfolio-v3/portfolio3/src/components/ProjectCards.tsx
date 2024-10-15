import { format } from "date-fns";
import { Project } from "../types";

const ProjectCard = ({projects}:{projects: Project[]}) => {


  return(
    <section id="outP">

      {projects.map((project, index) => (
  <article key={index} id="cardPortfolio">
    <h3>{project.title}</h3>
    <img src={project.image} alt="img"/>
    <p> {format(project.date, "dd/MM,yyyy")}</p>
    <p>{project.beskrivelse}</p>
    <p>{project.teknologibruk.join(", ")}</p>
  </article>))}
  
  </section>
)
}    

export default ProjectCard