import './style.css'
//import jsonD from '../grovDraft.json'
import { ProjectArraySchema, type Project } from './types';
import { z } from "zod";


//let projJson = JSON.stringify(jsonD);
const projectList = document.getElementById("outP") as HTMLUListElement;
let allProjects: Project[] = [];

const form = document.getElementById("formIN") as HTMLFormElement;
const projects: Project[] = [];

form.addEventListener("submit", async (event: SubmitEvent) => {
  event.preventDefault();


  const teknologibruk: string[] = Array.from(form.elements)
  .filter((element) => (element as HTMLInputElement).type === "checkbox" && (element as HTMLInputElement).checked)
  .map((element) => (element as HTMLInputElement).value);
  
  const newProject = {
    id: "3",
    title: (
      (event.target as HTMLFormElement).elements.namedItem("projName") as HTMLInputElement)?.value,
    beskrivelse: (
      (event.target as HTMLFormElement).elements.namedItem("projDesc") as HTMLInputElement)?.value,
    image: (
        (event.target as HTMLFormElement).elements.namedItem("projPic") as HTMLInputElement)?.value,
    teknologibruk,
  }
  projects.push(newProject);
  updateProjectList();

  try {
    const response = await fetch("http://localhost:3999/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProject),
    });

    if (response.status === 201) {
      console.log("Vane lagret på serveren");
    } else {
      console.error("Feil ved lagring av vane på serveren");
    }
  } catch (error) {
    console.error("Feil ved sending av data til serveren:", error);
  }
});



function updateProjectList() {
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
        updateProjectList();
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