import React, { useState } from 'react';
import Sidebar from "../components/docs-layout/Sidebar"
import {
  IntroductionContent,
  InstallationContent,
  QuickStartContent,
  SyntaxContent,
  VariablesContent,
  ControlFlowContent,
  FunctionsContent,
  OperatorsContent,
  ExamplesContent,
  CompilerArchContent,
  EditorArchContent,
  ServerArchContent,
  EditorFeaturesContent,
  MultiLanguageContent,
  ProjectStructureContent,
} from '../components/docs-layout/content/page';

const Docs: React.FC = () => {
  const [activeSection, setActiveSection] = useState('introduction');

  const renderContent = () => {
    switch (activeSection) {
      case 'introduction': return <IntroductionContent />;
      case 'installation': return <InstallationContent />;
      case 'quick-start': return <QuickStartContent />;
      case 'syntax': return <SyntaxContent />;
      case 'variables': return <VariablesContent />;
      case 'control-flow': return <ControlFlowContent />;
      case 'functions': return <FunctionsContent />;
      case 'operators': return <OperatorsContent />;
      case 'examples': return <ExamplesContent />;
      case 'compiler-arch': return <CompilerArchContent />;
      case 'editor-arch': return <EditorArchContent />;
      case 'server-arch': return <ServerArchContent />;
      case 'editor-features': return <EditorFeaturesContent />;
      case 'multi-language': return <MultiLanguageContent />;
      case 'project-structure': return <ProjectStructureContent />;
      default: return <IntroductionContent />;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#0f0f17] text-gray-200">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default Docs;