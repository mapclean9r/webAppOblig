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
    
    useEffect(() => {
      loadFromApi();
    }, []);
    
    return loadedProjects;
  } 

export default useProject