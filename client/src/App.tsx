import { Route, Routes } from "react-router-dom"
import {LandingPage, CodeEditorPage, NotFound} from "./pages/page.ts"

function App() {
 return (
  <>
   <div className="bg-[#060111] min-h-screen text-white">
        <Routes>
            <Route path = "/" element = {<LandingPage />} />
            <Route path="/z-studio/code-editor" element = {<CodeEditorPage />}/>
            <Route path="*" element={<NotFound />}/>
        </Routes>
   </div>
  </>
 )

 
}

export default App
