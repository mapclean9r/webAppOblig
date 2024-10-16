import { format } from "date-fns";
import { Project } from "../types";

const ProjectCard = ({projects}:{projects: Project[]}) => {

  return(
    <section id="outP">
      {<>
        {console.log("aaass", projects)}
      </>}

      {projects.map((project, index) => (
  <article key={index} id="cardPortfolio">
    <h3>{project.title}</h3>
    <img src={project.image} alt="img"/>
    <p>{project.beskrivelse}</p>
    <p id="arrTech">{project.teknologibruk.join(", ")}</p>
    <p id="date"> {format(project.datePublished, "dd/MM/yyyy")}</p>
  </article>))}
  
  </section>
)
}    

export default ProjectCard