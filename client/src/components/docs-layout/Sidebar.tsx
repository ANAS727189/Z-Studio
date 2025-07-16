import React, { useState } from 'react';
import { ChevronRight, ChevronDown, Code, Settings, Layers, Play} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, setActiveSection }) => {
  const navigate = useNavigate();
  type SectionId = 'getting-started' | 'language' | 'architecture' | 'editor';
  const [expandedSections, setExpandedSections] = useState<Record<SectionId, boolean>>({
    'getting-started': true,
    'language': true,
    'architecture': false,
    'editor': false,
  });

  const toggleSection = (section: SectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const menuItems = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: <Play className="w-4 h-4" />,
      items: [
        { id: 'introduction', title: 'Introduction' },
        { id: 'installation', title: 'Installation' },
        { id: 'quick-start', title: 'Quick Start' },
      ],
    },
    {
      id: 'language',
      title: 'Z-- Language',
      icon: <Code className="w-4 h-4" />,
      items: [
        { id: 'syntax', title: 'Syntax & Basics' },
        { id: 'variables', title: 'Variables & Types' },
        { id: 'control-flow', title: 'Control Flow' },
        { id: 'functions', title: 'Functions' },
        { id: 'operators', title: 'Operators' },
        { id: 'examples', title: 'Code Examples' },
      ],
    },
    {
      id: 'architecture',
      title: 'Architecture',
      icon: <Layers className="w-4 h-4" />,
      items: [
        { id: 'compiler-arch', title: 'Compiler Architecture' },
        { id: 'editor-arch', title: 'Editor Architecture' },
        { id: 'server-arch', title: 'Server Architecture' },
      ],
    },
    {
      id: 'editor',
      title: 'Z Studio Editor',
      icon: <Settings className="w-4 h-4" />,
      items: [
        { id: 'editor-features', title: 'Editor Features' },
        { id: 'multi-language', title: 'Multi-language Support' },
        { id: 'project-structure', title: 'Project Structure' },
      ],
    },
  ];

  return (
    <div className="w-64 bg-[#060111] border-r border-gray-800 min-h-screen overflow-y-auto">
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center space-x-2">
          {/* <Zap className="w-6 h-6 text-purple-400" /> */}
          <h1 
          onClick={() => navigate('/')}
          className="text-xl font-bold text-white cursor-pointer">
            <img src='/z-studio-new-1.jpg' width={140} height={50} />
          </h1>
        </div>
        <p className="text-gray-400 text-sm mt-1">Documentation</p>
      </div>
      
      <nav className="p-4">
        {menuItems.map(section => (
          <div key={section.id} className="mb-4">
            <button
              onClick={() => toggleSection(section.id as SectionId)}
              className="flex items-center justify-between w-full text-left text-gray-300 hover:text-white transition-colors mb-2"
            >
              <div className="flex items-center space-x-2">
                {section.icon}
                <span className="font-medium">{section.title}</span>
              </div>
              {expandedSections[section.id as SectionId] ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>
            
            {expandedSections[section.id as SectionId] && (
              <div className="ml-6 space-y-1">
                {section.items.map(item => (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                      activeSection === item.id
                        ? 'bg-purple-600 text-white'
                        : 'text-gray-400 hover:text-white hover:bg-gray-800'
                    }`}
                  >
                    {item.title}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;