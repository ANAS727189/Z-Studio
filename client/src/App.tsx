import { Route, Routes } from "react-router-dom"
import {LandingPage, CodeEditorPage, NotFound} from "./pages/page.ts"

function App() {
 return (
  <>
        <Routes>
            <Route path = "/" element = {<LandingPage />} />
            <Route path="/z-studio/code-editor" element = {<CodeEditorPage />}/>
            <Route path="*" element={<NotFound />}/>
        </Routes>
  </>
 )

 
}

export default App
