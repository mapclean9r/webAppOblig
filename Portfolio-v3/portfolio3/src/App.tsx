import CreateProject from './components/CreateProject'
import Layout from './components/Layout'
import ProjectLoader from './components/ProjectLoader'

function App() {
  return (
    <>
      <Layout>
        <CreateProject />
        <ProjectLoader/>
      </Layout>
        
    </>
  )
}

export default App
