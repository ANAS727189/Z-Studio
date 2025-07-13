import { ContainerScroll } from "../ui/container-scroll-animation"
import { BackgroundCellCore } from "../custom-ui/BackgroundRippleEffect"
import { Meteors } from "../custom-ui/Meteors"

const ShowCase = () => {
  return (
    <div className="relative bg-dot-pattern min-h-screen bg-slate-950 flex items-center justify-center overflow-hidden">
      {/* Create a line */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-slate-800 opacity-20" />
        <div className="absolute top-48 left-0 right-0 bottom-0 bg-dot-pattern z-60 pointer-events-none" />
       <div className="absolute inset-0 z-50 pointer-events-none w-screen">
      <Meteors number={50} />
    </div>
      <BackgroundCellCore />
      <div className="relative z-50 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pointer-events-none select-none">
        <ContainerScroll
          titleComponent={
            <div className="text-center">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-slate-200 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Showcasing the power of
              </h1>
              <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-slate-100 leading-none tracking-tight"style={{ fontFamily: 'Winky Rough, Poppins, sans-serif' }}>
               Z Studio
              </span>
            </div>
          }
        >
          <img
            src="/judge0-compile.png"
            alt="hero"
            height={720}
            width={1400}
            className="mx-auto rounded-2xl object-cover h-full object-left-top"
            draggable={false}
          />
        </ContainerScroll>
      </div>
    </div>
  )
}

export default ShowCase