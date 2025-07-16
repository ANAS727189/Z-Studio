import {
   CompilerArchContent,
    ControlFlowContent,
    EditorArchContent,
    EditorFeaturesContent,
    ExamplesContent,
    FunctionsContent,
    InstallationContent,
    IntroductionContent,
    MultiLanguageContent,
    OperatorsContent,
    ProjectStructureContent,
    QuickStartContent,
    ServerArchContent,
    SyntaxContent,
    VariablesContent
} from "./content/page";


export const Content = () => (
   <>
      <IntroductionContent />
      <QuickStartContent />
      <InstallationContent />
      <EditorArchContent />
      <EditorFeaturesContent />
      <CompilerArchContent />
      <ServerArchContent />
      <ProjectStructureContent />
      <SyntaxContent />
      <VariablesContent />
      <FunctionsContent />
      <ControlFlowContent />
      <OperatorsContent />
      <ExamplesContent />
      <MultiLanguageContent />
  </>
);

