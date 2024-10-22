import { endPoint } from "../config";
import { Project } from "../types"
import { useEffect, useState } from "react"

export function useProject(){

    const [loadedProjects, setLoadedProjects] = useState<Project[]>([])
    const server = endPoint;

    const loadFromApi = () => {
      fetch(server.dbAPI, {
        credentials: "include",
      })
        .then((response) => response.json())
        .then((data) => {
          setLoadedProjects(data.data);
        })
        .catch((error: Error) => {
          console.error("Error fetching data:", error);
        });
    }; 

    const deleteProject = async (id: string) => {
      const response = await fetch(`${endPoint.dbAPI}/${id}`, {
        method: 'DELETE',
      });
        loadFromApi()
      if (response.ok) {
        console.log('Project deleted successfully');
      } else {
        console.error('Failed to delete project');
      }
    }
    
    useEffect(() => {
      loadFromApi();
    }, []);

    
    return { loadedProjects, deleteProject};
  } 

export default useProject