import { ProjectSchema } from "../types";

const ProjectCard = ({projects}:{projects: ProjectSchema[]}) => {
  return(
    <section id="outP">

      {projects.map((project, index) => (
  <article key={index} id="cardPortfolio">
    <h3>{project.title}</h3>
    <img src={project.image} alt="img"/>
    <p>{project.beskrivelse}</p>
    <p>{project.teknologibruk.join(", ")}</p>
  </article>))}
  
  </section>
)
}    

export default ProjectCard