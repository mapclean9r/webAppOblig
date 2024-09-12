import CreateProject from './components/CreateProject'
import Layout from './components/Layout'
import ProjectCard from './components/ProjectCard'
import { ProjectSchema } from './types';

const projects: ProjectSchema[] = [
  {
      "id": crypto.randomUUID(),
      "title": "Facebook copy",
      "beskrivelse": "En kopi av facebook",
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMleaymP99uYkw995Q8Vxl16FRedxsXkh-QA&s",
      "teknologibruk": ["HTML","CSS","JavaScript","TypeScript","React"]
      },
      {
      "id": crypto.randomUUID(),
      "title": "Instagram copy",
      "beskrivelse": "En kopi av Instagram",
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSK-ml5Hxr8K5z4-xCTz9T7fUhoUoZtfaKcIw&s",
      "teknologibruk": ["HTML","CSS","JavaScript","TypeScript","React"]
  },
];

function App() {
  return (
    <>
      <Layout>
        <CreateProject />
        <ProjectCard projects={projects}/>
      </Layout>
        
    </>
  )
}

export default App
