import { InputBox, OutputBox, CodeEditorBox, RunBar } from '../components/page'


const CodeEditorPage = () => {
  return (
    <>
    <RunBar />
   <div className='flex flex-row items-center justify-center w-full h-full p-4'>
     <CodeEditorBox />
   <div className='flex flex-col justify-between items-start gap-4'>
     <InputBox />
    <OutputBox />
   </div>
   </div>
    </>
  )
}

export default CodeEditorPage