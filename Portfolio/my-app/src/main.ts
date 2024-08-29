import './style.css'
//import jsonD from '../grovDraft.json'
import { ProjectArraySchema, type Project } from './types';
import { z } from "zod";


//let projJson = JSON.stringify(jsonD);
const projectList = document.getElementById("outP") as HTMLUListElement;
let allProjects: Project[] = [];


function updateHabitsList() {
  console.log(allProjects);
  if (!projectList) return;
  projectList.innerHTML = "";

  for (const i of allProjects) {
    const listItem = document.createElement("article");
    listItem.id = ("cardPortfolio")
    
    const h3Item = document.createElement("h3");
    const pItem = document.createElement("p");
    const p2Item = document.createElement("p");
    h3Item.innerHTML = i.title
    pItem.innerHTML = i.beskrivelse
    p2Item.innerHTML = i.teknologibruk.join(",");
    listItem.appendChild(h3Item)
    listItem.appendChild(pItem)
    listItem.appendChild(p2Item)
    
    projectList.appendChild(listItem);
  }
}


function loadFromApi() {
  fetch("http://localhost:3999")
    .then((response) => response.json())
    .then((data: unknown) => {
      try {
        // Forsøker å parse og validere dataene med Zod-skjemaet
        const validatedHabits = ProjectArraySchema.parse(data);

        allProjects.push(...validatedHabits); // Legger til validerte vaner i den interne listen
        updateHabitsList(); // Oppdaterer visningen på nettsiden
      } catch (error) {
        if (error instanceof z.ZodError) {
          console.error("Ugyldig data mottatt fra serveren:", error);
        } else {
          console.error("Uventet feil ved validering av data:", error);
        }
      }
    })
    .catch((error: Error) => {
      console.error("Feil ved henting av data fra serveren:", error);
    });
}

loadFromApi();