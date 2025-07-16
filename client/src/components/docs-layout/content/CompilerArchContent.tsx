

export const CompilerArchContent = () => (
  <div className="prose prose-invert max-w-none">
    <h1 className="text-4xl font-bold text-white mb-6">Compiler Architecture</h1>
    <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 mb-6">
      <h3 className="text-xl font-semibold text-white mb-4">Compilation Pipeline</h3>
      <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-4 mb-6">
       <img src="/compiler-architecture.png"/>
      </div>
    </div>
    <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 mb-6">
      <h3 className="text-xl font-semibold text-white mb-4">LLVM IR Generation</h3>
      <p className="text-gray-300 mb-4">
        LLVM can provide the middle layers of a complete compiler system, taking intermediate representation (IR) 
        code from a compiler and emitting an optimized IR. This new IR can then be converted and linked into 
        machine-dependent assembly language code for a target platform.
      </p>
      <div className="bg-black p-4 rounded-lg">
        <p className="text-gray-400 text-sm">LLVM IR → Low Level Virtual Machine Intermediate representation</p>
      </div>
    </div>
  </div>
);