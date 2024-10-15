import { endPoint } from "../config";
import { Project } from "../types"
import { useEffect, useState } from "react"

export function useProject(){

    const [loadedprojects, setLoadedProjects] = useState<Project[]>([])
    const server = endPoint;

    const loadFromApi = () => {
        fetch(server.baseAPI)
      .then((response) => response.json())
      .then((data: Project[]) => {
        setLoadedProjects(data);
      })
      .catch((error: Error) => {
        console.error("Error henting data:", error);
      });
      }

      useEffect(() => {
        loadFromApi()
      },
    [])

    return loadedprojects
    
}

export default useProject