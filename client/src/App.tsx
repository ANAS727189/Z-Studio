import { Route, Routes } from "react-router-dom"
import {LandingPage, CodeEditorPage, NotFound} from "./pages/page.ts"
import Docs from "./pages/Docs.tsx"

function App() {
 return (
  <>
   <div className="bg-[#060111] min-h-screen text-white">
        <Routes>
            <Route path = "/" element = {<LandingPage />} />
             <Route path = "/docs" element = {<Docs />} />
            <Route path="/z-studio/code-editor" element = {<CodeEditorPage />}/>
            <Route path="*" element={<NotFound />}/>
        </Routes>
   </div>
  </>
 )

 
}

export default App
