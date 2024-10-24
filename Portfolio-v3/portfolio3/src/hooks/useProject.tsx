import { endPoint } from "../config";
import { Project } from "../types";
import { useEffect, useState } from "react";

export function useProject() {
  const [loadedProjects, setLoadedProjects] = useState<Project[]>([]);
  const server = endPoint;

  const loadFromApi = async () => {
    try {
      const response = await fetch(server.dbAPI)
      const data = await response.json()
    
      setLoadedProjects(data.data);

    } catch (error) {
      console.error(error);
    }
    
    
  };

  const deleteProject = async (id: string) => {
    try {
      const response = await fetch(`${endPoint.dbAPI}/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log("Project deleted successfully");
        setLoadedProjects((prevProjects) =>
          prevProjects.filter((project) => project.id !== id)
        );

        loadFromApi();
      } else {
        console.error("Failed to delete project");
      }
    } catch (error) {
      console.error("Error while deleting the project:", error);
    }
  };

  const addProject = async (project: any) => {
    try {
      const response = await fetch(`${endPoint.dbAPI}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(project),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log("proj added:", data);
        // window.history er kulturarv mente peter
        window.history.go()
        loadFromApi();
      } else {
        console.error("Feil lagring:", response.statusText);
      }
    } catch (error) {
      console.error("Feil med server, prob type error:", error);
    };
  };

  const updateProject = async (id: string) => {
    const response = await fetch(`${endPoint.dbAPI}/${id}`, {
      method: "PATCH",
    });
    loadFromApi();
    if (response.ok) {
      console.log("Project updated successfully");
    } else {
      console.error("Failed to update project");
    }
  };

  useEffect(() => {
    loadFromApi();
  }, []);

  return {
    loadedProjects,
    deleteProject,
    addProject,
    updateProject,
    loadFromApi,
  };
}

export default useProject;