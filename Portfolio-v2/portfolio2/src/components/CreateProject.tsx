import { useState } from "react";
import { ProjectSchema } from "../types";

export default function CreateProject() {

  const [projform, setProjFormData] = useState({
    id: crypto.randomUUID(),
    projName: "",
    projDesc: "",
    projPic: "",
    teknologibruk: [] as string[],
  });


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setProjFormData((prevState) => {
        const updatedTechnologies = checked

          ? [...prevState.teknologibruk, value] : prevState.teknologibruk.filter((tech) => tech !== value);
        return {
          ...prevState,
          teknologibruk: updatedTechnologies,
        };
      });
    } else {
      setProjFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  console.log(projform);

  const newProject: ProjectSchema = 
    {
        id: crypto.randomUUID(),
        title: projform.projName,
        beskrivelse: projform.projDesc,
        image: projform.projPic,
        teknologibruk: projform.teknologibruk
     }
    

  console.log(newProject)

  try {
    const response = await fetch("http://localhost:3999/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProject),
    });

    if (response.ok) {
      const data = await response.json();
      data.push(newProject)
      console.log("proj added:", data);
      
    } else {
      console.error("Feil lagring:", response.statusText);
    }
  } catch (error) {
    console.error("Feil med server, prob type error:", error);
  };
};



    return(
        <section id="createPortfolio">
        <h1>Create portfolio</h1>

        <form action="formP" id="formIN" onSubmit={handleSubmit}>
          <label htmlFor="projName">Project name:</label><br/>
          <input type="text" id="projName" name="projName" value={projform.projName} onChange={handleChange}/><br/>
          
          <label htmlFor="projDesc">Project desciption:</label><br/>
          <input type="text" id="projDesc" name="projDesc" value={projform.projDesc} onChange={handleChange}/><br/>

          <label htmlFor="projPic">Picture link:</label><br/>
          <input type="text" id="projPic" name="projPic" value={projform.projPic} onChange={handleChange}/>


          <h3>Technology used:</h3>
          <input type="checkbox" id="html" name="sHTML" value="HTML" checked={projform.teknologibruk.includes('HTML')} onChange={handleChange}/>
          <label htmlFor="html">HTML</label><br/>

          <input type="checkbox" id="css" name="sCSS" value="CSS" checked={projform.teknologibruk.includes('CSS')} onChange={handleChange}/>
          <label htmlFor="css">CSS</label><br/>

          <input type="checkbox" id="javascript" name="sJAVASCRIPT" value="JavaScript" checked={projform.teknologibruk.includes('JavaScript')} onChange={handleChange}/>
          <label htmlFor="javascript">JavaScript</label><br/>

          <input type="checkbox" id="typescript" name="sTYPESCRIPT" value="TypeScript" checked={projform.teknologibruk.includes('TypeScript')} onChange={handleChange}/>
          <label htmlFor="typescript">TypeScript</label><br/>

          <input type="checkbox" id="react" name="sREACT" value="React" checked={projform.teknologibruk.includes('React')} onChange={handleChange}/>
          <label htmlFor="react">React</label><br/><br/>

          <input type="submit" value="Submit"/>
        </form>

      </section>
    )
}