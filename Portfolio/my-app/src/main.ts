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
    const imgItem = document.createElement("img");
    h3Item.innerHTML = i.title
    pItem.innerHTML = i.beskrivelse
    p2Item.innerHTML = i.teknologibruk.join(",");
    imgItem.src = i.image
    imgItem.alt = "img"
    listItem.appendChild(h3Item)
    listItem.appendChild(imgItem)
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
        const validatedHabits = ProjectArraySchema.parse(data);

        allProjects.push(...validatedHabits);
        updateHabitsList();
      } catch (error) {
        if (error instanceof z.ZodError) {
          console.error("null data received:", error);
        } else {
          console.error("unknown error:", error);
        }
      }
    })
    .catch((error: Error) => {
      console.error("Error getting:", error);
    });
}

loadFromApi();