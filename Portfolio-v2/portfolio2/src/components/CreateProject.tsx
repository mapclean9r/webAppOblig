
export default function CreateProject() {
    return(
        <section id="createPortfolio">
        <h1>Create portfolio</h1>

        <form action="formP" id="formIN">
          <label htmlFor="projName">Project name:</label><br/>
          <input type="text" id="projName" name="NAME"/><br/>
          
          <label htmlFor="projDesc">Project desciption:</label><br/>
          <input type="text" id="projDesc" name="DESC"/><br/>

          <label htmlFor="projPic">Picture link:</label><br/>
          <input type="text" id="projPic" name="DESC"/>

          <h3>Technology used:</h3>
          <input type="checkbox" id="html" name="sHTML" value="HTML"/>
          <label htmlFor="html">HTML</label><br/>

          <input type="checkbox" id="css" name="sCSS" value="CSS"/>
          <label htmlFor="css">CSS</label><br/>

          <input type="checkbox" id="javascript" name="sJAVASCRIPT" value="JavaScript"/>
          <label htmlFor="javascript">JavaScript</label><br/>

          <input type="checkbox" id="typescript" name="sTYPESCRIPT" value="TypeScript"/>
          <label htmlFor="typescript">TypeScript</label><br/>

          <input type="checkbox" id="react" name="sREACT" value="React"/>
          <label htmlFor="react">React</label><br/><br/>

          <input type="submit" value="Submit"/>
        </form>

      </section>
    )
}