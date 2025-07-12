import { Route, Routes } from "react-router-dom"
import {LandingPage, CodeEditorPage, NotFound} from "./pages/page.ts"
import { Footer, Navbar } from "./components/page.ts"

function App() {
 return (
  <>
   <div className="bg-[#060111] min-h-screen text-white">
     <Navbar />
        <Routes>
            <Route path = "/" element = {<LandingPage />} />
            <Route path="/z-studio/code-editor" element = {<CodeEditorPage />}/>
            <Route path="*" element={<NotFound />}/>
        </Routes>
    <Footer />
   </div>
  </>
 )

 
}

export default App
