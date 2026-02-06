
import React, { useState } from 'react';
import { 
  Check, 
  Play, 
  Clock, 
  ChevronRight, 
  ChevronDown,
  ChevronLeft,
  FileText, 
  Timer, 
  Download, 
  RefreshCw, 
  Sparkles,
  MoreHorizontal,
  Bot,
  Eye,
  X,
  GitBranch,
  Columns,
  History
} from 'lucide-react';
import { PrimaryButton } from '../../components/Shared';
import { ManualRunHeader } from './RunHeader';
import { ManualRun, SyllabusVersion, LLMReview } from '../../types';

// LLM Review Modal Component (uses LLMReview from types.ts)
const ReviewModal = ({ 
  isOpen, 
  onClose, 
  title,
  review
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  title: string;
  review: LLMReview;
}) => {
  if (!isOpen) return null;

  const getStatusColor = (status: 'pass' | 'warning' | 'fail') => {
    switch (status) {
      case 'pass': return { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', bar: 'bg-emerald-500' };
      case 'warning': return { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', bar: 'bg-amber-500' };
      case 'fail': return { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', bar: 'bg-red-500' };
    }
  };

  const overallScore = review.metrics.reduce((acc, m) => acc + m.score, 0) / review.metrics.reduce((acc, m) => acc + m.maxScore, 0) * 100;
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[85vh] overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-gradient-to-r from-indigo-50 to-purple-50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <Sparkles size={18} className="text-indigo-600" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900">{title}</h3>
              <p className="text-xs text-slate-500">Automated LLM Quality Assessment</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/50 rounded-lg transition-colors">
            <X size={18} className="text-slate-500" />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[calc(85vh-80px)] space-y-6">
          {/* Overall Score */}
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-5 text-white">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-indigo-100 mb-1">Overall Quality Score</div>
                <div className="text-4xl font-bold">{overallScore.toFixed(0)}%</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-indigo-100">Retrieved Chunks Used</div>
                <div className="text-2xl font-bold">{review.retrievedChunksUsed}/{review.totalChunks}</div>
              </div>
            </div>
            <p className="mt-3 text-sm text-indigo-100">{review.summary}</p>
          </div>

          {/* Metrics Grid */}
          <div>
            <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wide mb-3">Evaluation Metrics</h4>
            <div className="grid grid-cols-2 gap-3">
              {review.metrics.map((metric, idx) => {
                const colors = getStatusColor(metric.status);
                const percentage = (metric.score / metric.maxScore) * 100;
                return (
                  <div key={idx} className={`${colors.bg} border ${colors.border} rounded-xl p-4`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-sm font-bold ${colors.text}`}>{metric.name}</span>
                      <span className={`text-lg font-bold ${colors.text}`}>{metric.score}/{metric.maxScore}</span>
                    </div>
                    <div className="w-full bg-white/50 rounded-full h-2 mb-2">
                      <div className={`${colors.bar} h-2 rounded-full transition-all`} style={{ width: `${percentage}%` }}></div>
                    </div>
                    <p className="text-xs text-slate-600">{metric.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Strengths & Improvements */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
              <h4 className="text-sm font-bold text-emerald-700 uppercase tracking-wide mb-3 flex items-center gap-2">
                <Check size={16} /> Strengths
              </h4>
              <ul className="space-y-2">
                {review.strengths.map((s, idx) => (
                  <li key={idx} className="text-sm text-emerald-800 flex items-start gap-2">
                    <span className="text-emerald-500 mt-0.5">•</span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <h4 className="text-sm font-bold text-amber-700 uppercase tracking-wide mb-3 flex items-center gap-2">
                <RefreshCw size={16} /> Suggested Improvements
              </h4>
              <ul className="space-y-2">
                {review.improvements.map((i, idx) => (
                  <li key={idx} className="text-sm text-amber-800 flex items-start gap-2">
                    <span className="text-amber-500 mt-0.5">•</span>
                    {i}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Markdown Modal Component
const MarkdownModal = ({ 
  isOpen, 
  onClose, 
  title, 
  children
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  title: string; 
  children: React.ReactNode;
}) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FileText size={16} className="text-blue-600" />
            </div>
            <h3 className="font-bold text-slate-900">{title}</h3>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
            <X size={18} className="text-slate-500" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto max-h-[calc(80vh-80px)]">
          {children}
        </div>
      </div>
    </div>
  );
};

// Split Screen Compare Modal Component
const SplitCompareModal = ({ 
  isOpen, 
  onClose,
  leftVersion,
  rightVersion,
  allVersions,
  onChangeLeft,
  onChangeRight
}: { 
  isOpen: boolean; 
  onClose: () => void;
  leftVersion: SyllabusVersion;
  rightVersion: SyllabusVersion;
  allVersions: SyllabusVersion[];
  onChangeLeft: (id: string) => void;
  onChangeRight: (id: string) => void;
}) => {
  const [showLeftDropdown, setShowLeftDropdown] = useState(false);
  const [showRightDropdown, setShowRightDropdown] = useState(false);

  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-slate-900/80 flex items-center justify-center z-50">
      <div className="bg-white w-full h-full flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Columns size={18} className="text-blue-600" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900">Compare Syllabus Versions</h3>
              <p className="text-xs text-slate-500">Side-by-side markdown comparison</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
            <X size={20} className="text-slate-500" />
          </button>
        </div>
        
        {/* Split Content */}
        <div className="flex-1 flex min-h-0">
          {/* Left Panel */}
          <div className="flex-1 flex flex-col border-r border-slate-200">
            {/* Left Header with Version Selector */}
            <div className="px-4 py-3 bg-blue-50 border-b border-blue-100 flex items-center justify-between">
              <div className="relative">
                <button 
                  onClick={() => setShowLeftDropdown(!showLeftDropdown)}
                  className="flex items-center gap-2 px-3 py-1.5 bg-white border border-blue-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-blue-50 transition-colors"
                >
                  <GitBranch size={14} className="text-blue-500" />
                  <span>{leftVersion.name}</span>
                  <ChevronDown size={14} className={`text-slate-400 transition-transform ${showLeftDropdown ? 'rotate-180' : ''}`} />
                </button>
                
                {showLeftDropdown && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setShowLeftDropdown(false)} />
                    <div className="absolute left-0 top-full mt-1 w-64 bg-white border border-slate-200 rounded-lg shadow-xl z-20 overflow-hidden">
                      {allVersions.map((version) => (
                        <button
                          key={version.id}
                          onClick={() => {
                            onChangeLeft(version.id);
                            setShowLeftDropdown(false);
                          }}
                          className={`w-full px-3 py-2 text-left text-sm hover:bg-slate-50 flex items-center justify-between ${
                            leftVersion.id === version.id ? 'bg-blue-50' : ''
                          }`}
                        >
                          <span className="font-medium text-slate-700">{version.name}</span>
                          {leftVersion.id === version.id && <Check size={14} className="text-blue-600" />}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
              <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded">ACTIVE</span>
            </div>
            
            {/* Left Markdown Content */}
            <div className="flex-1 overflow-y-auto p-6 bg-slate-50">
              <pre className="bg-white border border-slate-200 rounded-xl p-6 text-sm font-mono whitespace-pre-wrap text-slate-700 leading-relaxed shadow-sm">
                {leftVersion.markdown}
              </pre>
            </div>
          </div>
          
          {/* Right Panel */}
          <div className="flex-1 flex flex-col">
            {/* Right Header with Version Selector */}
            <div className="px-4 py-3 bg-slate-100 border-b border-slate-200 flex items-center justify-between">
              <div className="relative">
                <button 
                  onClick={() => setShowRightDropdown(!showRightDropdown)}
                  className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <GitBranch size={14} className="text-slate-400" />
                  <span>{rightVersion.name}</span>
                  <ChevronDown size={14} className={`text-slate-400 transition-transform ${showRightDropdown ? 'rotate-180' : ''}`} />
                </button>
                
                {showRightDropdown && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setShowRightDropdown(false)} />
                    <div className="absolute left-0 top-full mt-1 w-64 bg-white border border-slate-200 rounded-lg shadow-xl z-20 overflow-hidden">
                      {allVersions.map((version) => (
                        <button
                          key={version.id}
                          onClick={() => {
                            onChangeRight(version.id);
                            setShowRightDropdown(false);
                          }}
                          className={`w-full px-3 py-2 text-left text-sm hover:bg-slate-50 flex items-center justify-between ${
                            rightVersion.id === version.id ? 'bg-slate-100' : ''
                          }`}
                        >
                          <span className="font-medium text-slate-700">{version.name}</span>
                          {rightVersion.id === version.id && <Check size={14} className="text-slate-600" />}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
              <span className="px-2 py-1 bg-slate-200 text-slate-600 text-xs font-bold rounded">COMPARE</span>
            </div>
            
            {/* Right Markdown Content */}
            <div className="flex-1 overflow-y-auto p-6 bg-white">
              <pre className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-sm font-mono whitespace-pre-wrap text-slate-700 leading-relaxed">
                {rightVersion.markdown}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Default syllabus versions for new runs (fallback)
const defaultSyllabusVersions: SyllabusVersion[] = [
  {
    id: 'default-v1',
    name: 'New Syllabus (Draft)',
    createdAt: new Date().toISOString(),
    modules: [
      { id: '01', title: 'Getting Started', topics: 'Introduction, Setup', time: '30 mins' },
      { id: '02', title: 'Core Concepts', topics: 'Fundamentals', time: '45 mins' },
    ],
    markdown: `# New Syllabus (Draft)\n\n## Module 01: Getting Started\n**Topics:** Introduction, Setup\n**Duration:** 30 mins\n\n## Module 02: Core Concepts\n**Topics:** Fundamentals\n**Duration:** 45 mins`
  }
];

// Fallback LLM Review for Syllabus (when no version-specific review exists)
const defaultSyllabusReview: LLMReview = {
  title: "Syllabus Quality Assessment",
  summary: "No automated review available for this syllabus version.",
  metrics: [
    { name: "Groundedness", score: 0, maxScore: 10, description: "Review not yet generated", status: 'warning' },
    { name: "Faithfulness", score: 0, maxScore: 10, description: "Review not yet generated", status: 'warning' },
    { name: "Relevance", score: 0, maxScore: 10, description: "Review not yet generated", status: 'warning' },
    { name: "Completeness", score: 0, maxScore: 10, description: "Review not yet generated", status: 'warning' },
    { name: "Coherence", score: 0, maxScore: 10, description: "Review not yet generated", status: 'warning' },
    { name: "Instruction Adherence", score: 0, maxScore: 10, description: "Review not yet generated", status: 'warning' },
  ],
  strengths: ["Review pending"],
  improvements: ["Generate review to see suggestions"],
  retrievedChunksUsed: 0,
  totalChunks: 0
};

// Mock LLM Review for Personalization
const personalizationReview: LLMReview = {
  title: "Personalization Quality Assessment",
  summary: "The personalized content effectively adapts the syllabus material using the superhero analogy preference. Strong engagement potential with minor factual precision improvements needed.",
  metrics: [
    { name: "Groundedness", score: 8, maxScore: 10, description: "Analogies are grounded in accurate technical concepts", status: 'pass' },
    { name: "Faithfulness", score: 9, maxScore: 10, description: "Maintains fidelity to the original syllabus content", status: 'pass' },
    { name: "Relevance", score: 10, maxScore: 10, description: "Personalization matches learner profile perfectly", status: 'pass' },
    { name: "Engagement", score: 9, maxScore: 10, description: "High engagement potential with creative analogies", status: 'pass' },
    { name: "Accuracy", score: 7, maxScore: 10, description: "Some technical simplifications may need clarification", status: 'warning' },
    { name: "Consistency", score: 8, maxScore: 10, description: "Consistent use of superhero theme throughout", status: 'pass' },
  ],
  strengths: [
    "Creative use of superhero analogies resonates with learner interests",
    "Code examples are practical and well-explained",
    "Maintains technical accuracy while being accessible",
    "Good use of visual metaphors for abstract concepts"
  ],
  improvements: [
    "Add more complex examples for advanced learners",
    "Include edge cases in variable naming rules",
    "Consider adding interactive quiz elements"
  ],
  retrievedChunksUsed: 6,
  totalChunks: 8
};

// Sample flashcard data for personalized content
const personalizedFlashcards = [
  {
    title: "Super-Powered Boxes!",
    content: `Think of a variable like a **utility belt pouch**. You can put different gadgets inside!

You don't need to tell Batman what pouch holds the Batarang ahead of time; you just put it in.

\`\`\`python
hero_name = "Spider-Man"
power_level = 9000
print(hero_name)
\`\`\`

Just like a hero can swap gadgets, you can change what's in the pouch anytime!`
  },
  {
    title: "String Powers",
    content: `Strings are like **hero catchphrases** - they're text that heroes use!

Every hero needs their signature line:

\`\`\`python
catchphrase = "With great power comes great responsibility"
hero_name = "Spider-Man"
print(f"{hero_name} says: {catchphrase}")
\`\`\`

You can combine them, split them, or transform them!`
  },
  {
    title: "Number Superpowers",
    content: `Numbers in Python are like **power levels** - they help measure strength!

\`\`\`python
base_power = 100
multiplier = 9
final_power = base_power * multiplier
print(f"Power level: {final_power}!")
\`\`\`

You can add, subtract, multiply - just like combining hero abilities!`
  }
];

interface ManualEduProps {
  onBack: () => void;
  run?: ManualRun;
  isInspecting?: boolean;
  availableRuns?: ManualRun[];
  onSelectRun?: (run: ManualRun) => void;
  onNewRun?: () => void;
}

export const ManualEdu: React.FC<ManualEduProps> = ({ 
  onBack, 
  run,
  isInspecting = false,
  availableRuns = [],
  onSelectRun,
  onNewRun
}) => {
  const terminalData = run?.terminalData;
  
  // Get syllabus versions from run or use defaults
  const syllabusVersions = run?.syllabusVersions || defaultSyllabusVersions;
  
  // Modal states
  const [showSyllabusMarkdown, setShowSyllabusMarkdown] = useState(false);
  const [showOriginalLessonMarkdown, setShowOriginalLessonMarkdown] = useState(false);
  const [showPersonalizedMarkdown, setShowPersonalizedMarkdown] = useState(false);
  const [currentFlashcard, setCurrentFlashcard] = useState(0);
  const [showSyllabusReview, setShowSyllabusReview] = useState(false);
  const [showPersonalizationReview, setShowPersonalizationReview] = useState(false);
  
  // Syllabus version states - initialize with first version from current run
  const [selectedSyllabusId, setSelectedSyllabusId] = useState<string>(syllabusVersions[0]?.id || '');
  const [showVersionDropdown, setShowVersionDropdown] = useState(false);
  const [splitScreenMode, setSplitScreenMode] = useState(false);
  const [compareVersionId, setCompareVersionId] = useState<string | null>(null);
  const [showCompareDropdown, setShowCompareDropdown] = useState(false);
  
  // Reset selected syllabus when run changes
  React.useEffect(() => {
    if (syllabusVersions.length > 0) {
      setSelectedSyllabusId(syllabusVersions[0].id);
      setCompareVersionId(null);
      setSplitScreenMode(false);
    }
  }, [run?.id]);
  
  // Get current and compare syllabus
  const currentSyllabus = syllabusVersions.find(v => v.id === selectedSyllabusId) || syllabusVersions[0];
  const compareSyllabus = compareVersionId ? syllabusVersions.find(v => v.id === compareVersionId) : null;
  
  // Format relative time
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  // Syllabus markdown content (from selected version)
  const syllabusMarkdown = currentSyllabus.markdown;

  // Original lesson markdown content
  const originalLessonMarkdown = `# Variables in Python

A variable is a container for storing data values. Unlike other programming languages, Python has no command for declaring a variable.

A variable is created the moment you first assign a value to it.

\`\`\`python
x = 5
y = "John"
print(x)
print(y)
\`\`\`

Variables do not need to be declared with any particular type. They can even change type after they have been set.

## Key Points:
- Variables are case-sensitive
- Must start with a letter or underscore
- Cannot start with a number
- Can only contain alpha-numeric characters and underscores
`;

  return (
    <div className="flex flex-col h-full bg-slate-50">
        {/* Run Header - always show */}
        <ManualRunHeader
          currentRun={run || null}
          availableRuns={availableRuns}
          onSelectRun={onSelectRun || (() => {})}
          onBack={onBack}
          onNewRun={onNewRun}
          isNewRun={!isInspecting && !run}
        />

        {/* Top Scrollable Section: Settings & Cards */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
            
            {/* Step 1: Syllabus Creation */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex-shrink-0">
                <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">1</div>
                        <h2 className="text-lg font-bold text-slate-900">Syllabus Creation</h2>
                    </div>
                    <div className="flex items-center gap-3">
                        {/* Version Selector */}
                        <div className="relative">
                            <button 
                                onClick={() => setShowVersionDropdown(!showVersionDropdown)}
                                className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                            >
                                <GitBranch size={14} className="text-slate-400" />
                                <span className="max-w-[150px] truncate">{currentSyllabus.name}</span>
                                <ChevronDown size={14} className={`text-slate-400 transition-transform ${showVersionDropdown ? 'rotate-180' : ''}`} />
                            </button>
                            
                            {showVersionDropdown && (
                                <>
                                    <div className="fixed inset-0 z-10" onClick={() => setShowVersionDropdown(false)} />
                                    <div className="absolute right-0 top-full mt-2 w-72 bg-white border border-slate-200 rounded-xl shadow-xl z-20 overflow-hidden">
                                        <div className="px-4 py-3 border-b border-slate-100 bg-slate-50">
                                            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wide flex items-center gap-2">
                                                <History size={12} /> Syllabus Versions
                                            </h4>
                                        </div>
                                        <div className="max-h-64 overflow-y-auto">
                                            {syllabusVersions.map((version) => (
                                                <button
                                                    key={version.id}
                                                    onClick={() => {
                                                        setSelectedSyllabusId(version.id);
                                                        setShowVersionDropdown(false);
                                                        // Reset compare if same version selected
                                                        if (compareVersionId === version.id) {
                                                            setCompareVersionId(null);
                                                            setSplitScreenMode(false);
                                                        }
                                                    }}
                                                    className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-slate-50 transition-colors text-left ${
                                                        selectedSyllabusId === version.id ? 'bg-blue-50' : ''
                                                    }`}
                                                >
                                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                                                        selectedSyllabusId === version.id 
                                                            ? 'bg-blue-100 text-blue-600' 
                                                            : 'bg-slate-100 text-slate-500'
                                                    }`}>
                                                        <GitBranch size={14} />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-sm font-medium text-slate-900 truncate">{version.name}</span>
                                                            {selectedSyllabusId === version.id && (
                                                                <Check size={12} className="text-blue-600 flex-shrink-0" />
                                                            )}
                                                        </div>
                                                        <div className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                                                            <span>{formatTime(version.createdAt)}</span>
                                                            <span>•</span>
                                                            <span>{version.modules.length} modules</span>
                                                        </div>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                        
                        {/* Compare Button - Opens Full Screen Modal */}
                        <button 
                            onClick={() => {
                                // Default to comparing with next older version
                                const currentIndex = syllabusVersions.findIndex(v => v.id === selectedSyllabusId);
                                if (currentIndex < syllabusVersions.length - 1) {
                                    setCompareVersionId(syllabusVersions[currentIndex + 1].id);
                                } else if (syllabusVersions.length > 1) {
                                    setCompareVersionId(syllabusVersions[0].id === selectedSyllabusId ? syllabusVersions[1].id : syllabusVersions[0].id);
                                }
                                setSplitScreenMode(true);
                            }}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors bg-slate-100 text-slate-600 hover:bg-slate-200"
                        >
                            <Columns size={14} />
                            Compare
                        </button>

                        {/* LLM Review Button */}
                        <button 
                            onClick={() => setShowSyllabusReview(true)}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
                        >
                            <Sparkles size={14} />
                            LLM Review
                        </button>
                        
                        <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">Completed</span>
                    </div>
                </div>
                
                <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left Form */}
                    <div className="lg:col-span-4 space-y-5">
                        <div className="flex-1 flex flex-col min-h-0">
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Prompt</label>
                            <textarea 
                                className="w-full h-40 bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block p-3 font-medium resize-none"
                                placeholder="Describe the syllabus you want to generate..."
                                defaultValue="Create a Python programming syllabus for beginners. Include 15 exercises focused on data structures and control flow."
                            ></textarea>
                        </div>

                        <button className="w-full bg-[#d2f448] hover:bg-[#c3ea3e] text-slate-900 font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm hover:shadow">
                            <Play size={16} fill="currentColor" /> Run Syllabus Agent
                        </button>
                    </div>

                    {/* Right Table - Always Single View */}
                    <div className="lg:col-span-8">
                        <div className="flex items-center justify-between mb-3">
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide">Generated Modules</label>
                            <button 
                              onClick={() => setShowSyllabusMarkdown(true)}
                              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                            >
                              <Eye size={14} />
                              Markdown View
                            </button>
                        </div>
                        <div className="border border-slate-200 rounded-xl overflow-hidden">
                            <div className="grid grid-cols-[auto_2fr_3fr_1fr] gap-4 bg-slate-50 px-4 py-3 border-b border-slate-200 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                                <div className="w-4"></div>
                                <div>Module</div>
                                <div>Topics</div>
                                <div className="text-right">Est. Duration</div>
                            </div>
                            <div className="bg-white divide-y divide-slate-100">
                                {currentSyllabus.modules.map((row, idx) => (
                                    <div key={row.id} className={`grid grid-cols-[auto_2fr_3fr_1fr] gap-4 px-4 py-3 items-center hover:bg-slate-50 transition-colors cursor-pointer ${idx === 0 ? 'bg-sky-50/50' : ''}`}>
                                        <div className="w-4 flex items-center justify-center">
                                            {idx === 0 ? (
                                                <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center text-white"><Check size={10} strokeWidth={4} /></div>
                                            ) : (
                                                <div className="w-4 h-4 rounded-full border border-slate-300"></div>
                                            )}
                                        </div>
                                        <div className={`text-sm font-medium ${idx === 0 ? 'text-slate-900' : 'text-slate-600'}`}>{row.id}. {row.title}</div>
                                        <div className="text-sm text-slate-500">{row.topics}</div>
                                        <div className="text-sm text-slate-500 text-right font-mono">{row.time}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        {/* Sync indicator */}
                        <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
                            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                            <span>Personalization is synced with <strong className="text-slate-700">{currentSyllabus.name}</strong></span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Step 2: Personalization */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex-shrink-0">
                 <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">2</div>
                        <h2 className="text-lg font-bold text-slate-900">Personalization</h2>
                    </div>
                    <div className="flex items-center gap-3">
                        {/* LLM Review Button */}
                        <button 
                            onClick={() => setShowPersonalizationReview(true)}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
                        >
                            <Sparkles size={14} />
                            LLM Review
                        </button>
                    </div>
                </div>

                <div className="p-6 bg-white">
                    <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
                        {/* Left Controls */}
                        <div className="xl:col-span-4 space-y-6">
                             <div>
                                 <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Target Lesson</label>
                                 <div className="relative">
                                    <div className="w-full bg-white border border-slate-200 text-slate-900 text-sm rounded-lg px-4 py-3 font-medium flex items-center justify-between shadow-sm cursor-pointer hover:border-slate-300">
                                        <span>01. Intro to Variables</span>
                                        <ChevronDown size={16} className="text-slate-400" />
                                    </div>
                                 </div>
                             </div>

                             <div>
                                 <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">User Preferences (Persona)</label>
                                 <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm text-slate-700 leading-relaxed shadow-inner">
                                    Student is a 12-year-old fan of superhero comics. They struggle with abstract concepts but excel when analogies involve heroes and villains. Prefers short, punchy explanations.
                                 </div>
                             </div>

                             <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm hover:shadow-md">
                                <Sparkles size={16} fill="currentColor" className="text-blue-200" /> Generate Personalized Content
                             </button>
                        </div>

                        {/* Right Content Panels */}
                        <div className="xl:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Original */}
                            <div className="flex flex-col gap-3">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wide">Original Lesson</h3>
                                    <button 
                                      onClick={() => setShowOriginalLessonMarkdown(true)}
                                      className="flex items-center gap-1 px-2 py-1 text-[10px] font-medium text-slate-500 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors"
                                    >
                                      <Eye size={12} />
                                      Markdown
                                    </button>
                                </div>
                                <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm h-full max-h-[400px] overflow-y-auto">
                                    <h4 className="text-base font-bold text-slate-900 mb-4">Variables in Python</h4>
                                    <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
                                        <p>A variable is a container for storing data values. Unlike other programming languages, Python has no command for declaring a variable. Variables are fundamental to programming as they allow us to store, modify, and retrieve data throughout our programs.</p>
                                        <p>A variable is created the moment you first assign a value to it. Python uses dynamic typing, which means you don't need to specify the type of data a variable will hold.</p>
                                        <div className="bg-slate-50 border border-slate-100 rounded-lg p-3 font-mono text-xs text-slate-800">
                                            <div className="text-purple-600">x <span className="text-slate-400">=</span> <span className="text-orange-500">5</span></div>
                                            <div className="text-purple-600">y <span className="text-slate-400">=</span> <span className="text-green-600">"John"</span></div>
                                            <div className="text-blue-600">print<span className="text-slate-500">(</span>x<span className="text-slate-500">)</span></div>
                                            <div className="text-blue-600">print<span className="text-slate-500">(</span>y<span className="text-slate-500">)</span></div>
                                        </div>
                                        <p>Variables do not need to be declared with any particular type. You can even change the type of a variable after it has been set.</p>
                                        
                                        <h5 className="text-sm font-semibold text-slate-800 pt-2">Variable Naming Rules</h5>
                                        <ul className="list-disc list-inside space-y-1 text-slate-600">
                                            <li>A variable name must start with a letter or underscore character</li>
                                            <li>A variable name cannot start with a number</li>
                                            <li>A variable name can only contain alphanumeric characters and underscores (A-z, 0-9, and _)</li>
                                            <li>Variable names are case-sensitive (age, Age and AGE are three different variables)</li>
                                        </ul>
                                        
                                        <h5 className="text-sm font-semibold text-slate-800 pt-2">Multi-Word Variable Names</h5>
                                        <p>Variable names with more than one word can be difficult to read. There are several techniques to make them more readable:</p>
                                        
                                        <div className="bg-slate-50 border border-slate-100 rounded-lg p-3 font-mono text-xs text-slate-800">
                                            <div className="text-slate-500"># Camel Case</div>
                                            <div className="text-purple-600">myVariableName <span className="text-slate-400">=</span> <span className="text-green-600">"John"</span></div>
                                            <div className="text-slate-500 mt-2"># Pascal Case</div>
                                            <div className="text-purple-600">MyVariableName <span className="text-slate-400">=</span> <span className="text-green-600">"John"</span></div>
                                            <div className="text-slate-500 mt-2"># Snake Case</div>
                                            <div className="text-purple-600">my_variable_name <span className="text-slate-400">=</span> <span className="text-green-600">"John"</span></div>
                                        </div>
                                        
                                        <h5 className="text-sm font-semibold text-slate-800 pt-2">Assigning Multiple Values</h5>
                                        <p>Python allows you to assign values to multiple variables in one line:</p>
                                        <div className="bg-slate-50 border border-slate-100 rounded-lg p-3 font-mono text-xs text-slate-800">
                                            <div className="text-purple-600">x<span className="text-slate-400">,</span> y<span className="text-slate-400">,</span> z <span className="text-slate-400">=</span> <span className="text-green-600">"Orange"</span><span className="text-slate-400">,</span> <span className="text-green-600">"Banana"</span><span className="text-slate-400">,</span> <span className="text-green-600">"Cherry"</span></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Personalized */}
                            <div className="flex flex-col gap-3">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-xs font-bold text-blue-600 uppercase tracking-wide">Personalized Output</h3>
                                    <button 
                                      onClick={() => setShowPersonalizedMarkdown(true)}
                                      className="flex items-center gap-1 px-2 py-1 text-[10px] font-medium text-blue-600 bg-blue-100 hover:bg-blue-200 rounded-md transition-colors"
                                    >
                                      <Eye size={12} />
                                      Markdown
                                    </button>
                                </div>
                                <div className="bg-blue-50/30 border border-blue-100 rounded-xl p-5 shadow-sm h-full ring-1 ring-blue-100/50 flex flex-col">
                                    <h4 className="text-base font-bold text-blue-600 mb-4">{personalizedFlashcards[currentFlashcard].title}</h4>
                                    <div className="space-y-4 text-sm text-slate-600 leading-relaxed flex-1">
                                        {currentFlashcard === 0 && (
                                          <>
                                            <p>Think of a variable like a <span className="font-bold text-blue-600">utility belt pouch</span>. You can put different gadgets inside!</p>
                                            <p>You don't need to tell Batman what pouch holds the Batarang ahead of time; you just put it in.</p>
                                            <div className="bg-white border border-blue-100 rounded-lg p-3 font-mono text-xs text-slate-800 shadow-sm">
                                                <div className="text-slate-800">hero_name <span className="text-blue-300">=</span> <span className="text-green-600">"Spider-Man"</span></div>
                                                <div className="text-slate-800">power_level <span className="text-blue-300">=</span> <span className="text-orange-500">9000</span></div>
                                                <div className="text-purple-600">print<span className="text-slate-400">(</span>hero_name<span className="text-slate-400">)</span></div>
                                            </div>
                                            <p>Just like a hero can swap gadgets, you can change what's in the pouch anytime!</p>
                                          </>
                                        )}
                                        {currentFlashcard === 1 && (
                                          <>
                                            <p>Strings are like <span className="font-bold text-blue-600">hero catchphrases</span> - they're text that heroes use!</p>
                                            <p>Every hero needs their signature line:</p>
                                            <div className="bg-white border border-blue-100 rounded-lg p-3 font-mono text-xs text-slate-800 shadow-sm">
                                                <div className="text-slate-800">catchphrase <span className="text-blue-300">=</span> <span className="text-green-600">"With great power..."</span></div>
                                                <div className="text-slate-800">hero_name <span className="text-blue-300">=</span> <span className="text-green-600">"Spider-Man"</span></div>
                                                <div className="text-purple-600">print<span className="text-slate-400">(</span>f"{'{'}hero_name{'}'} says: {'{'}catchphrase{'}'}"<span className="text-slate-400">)</span></div>
                                            </div>
                                            <p>You can combine them, split them, or transform them!</p>
                                          </>
                                        )}
                                        {currentFlashcard === 2 && (
                                          <>
                                            <p>Numbers in Python are like <span className="font-bold text-blue-600">power levels</span> - they help measure strength!</p>
                                            <div className="bg-white border border-blue-100 rounded-lg p-3 font-mono text-xs text-slate-800 shadow-sm">
                                                <div className="text-slate-800">base_power <span className="text-blue-300">=</span> <span className="text-orange-500">100</span></div>
                                                <div className="text-slate-800">multiplier <span className="text-blue-300">=</span> <span className="text-orange-500">9</span></div>
                                                <div className="text-slate-800">final_power <span className="text-blue-300">=</span> base_power * multiplier</div>
                                                <div className="text-purple-600">print<span className="text-slate-400">(</span>f"Power level: {'{'}final_power{'}'}!"<span className="text-slate-400">)</span></div>
                                            </div>
                                            <p>You can add, subtract, multiply - just like combining hero abilities!</p>
                                          </>
                                        )}
                                    </div>
                                    {/* Navigation Arrows */}
                                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-blue-100">
                                        <button 
                                          onClick={() => setCurrentFlashcard(prev => Math.max(0, prev - 1))}
                                          disabled={currentFlashcard === 0}
                                          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                                        >
                                          <ChevronLeft size={14} /> Previous
                                        </button>
                                        <span className="text-xs font-medium text-slate-500">
                                          {currentFlashcard + 1} / {personalizedFlashcards.length}
                                        </span>
                                        <button 
                                          onClick={() => setCurrentFlashcard(prev => Math.min(personalizedFlashcards.length - 1, prev + 1))}
                                          disabled={currentFlashcard === personalizedFlashcards.length - 1}
                                          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                                        >
                                          Next <ChevronRight size={14} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Bottom Fixed Section: Logs */}
        <div className="h-[40%] bg-white border-t border-slate-200 flex flex-col shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-10">
                {/* Log Section Header */}
                <div className="bg-slate-50 border-b border-slate-200 px-4 py-2 flex items-center justify-between flex-shrink-0 h-10">
                     <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 px-2 py-1 bg-slate-200 rounded text-[10px] font-bold text-slate-600 uppercase tracking-wide">
                             <Bot size={12} /> Education Orchestrator Log
                        </div>
                        <span className="text-xs text-slate-500">Session ID: <span className="text-slate-900 font-mono">edu_v2_99a</span></span>
                     </div>
                     <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                           <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                           Processing
                        </div>
                        <button className="text-xs text-slate-400 hover:text-slate-600">Clear</button>
                        <button className="text-xs text-slate-400 hover:text-slate-600 flex items-center gap-1">Download Logs</button>
                     </div>
                </div>

                {/* Log Content */}
                <div className="flex-1 overflow-hidden flex min-h-0">
                     {/* Left: Orchestration */}
                     <div className="flex-1 border-r border-slate-100 p-6 overflow-y-auto bg-white">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 sticky top-0 bg-white pb-2 z-10 flex justify-between items-center">
                            Orchestration & Tool Calls
                            <span className="bg-slate-100 px-1.5 py-0.5 rounded text-[10px] text-slate-500 font-normal normal-case">Real-time</span>
                        </h3>
                        
                        <div className="relative pl-2 space-y-8">
                             <div className="absolute left-[7px] top-2 bottom-0 w-px bg-slate-200"></div>

                             {terminalData?.orchestrationSteps.map((step) => {
                                const colorMap: Record<string, { bg: string; text: string; border: string; dot: string }> = {
                                  purple: { bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-100', dot: 'bg-purple-500' },
                                  orange: { bg: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-100', dot: 'bg-orange-500' },
                                  blue: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-100', dot: 'bg-blue-500' },
                                  green: { bg: 'bg-green-50', text: 'text-green-600', border: 'border-green-100', dot: 'bg-green-500' },
                                  amber: { bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-100', dot: 'bg-amber-500' },
                                  teal: { bg: 'bg-teal-50', text: 'text-teal-600', border: 'border-teal-100', dot: 'bg-teal-500' },
                                  indigo: { bg: 'bg-indigo-50', text: 'text-indigo-600', border: 'border-indigo-100', dot: 'bg-indigo-500' },
                                  pink: { bg: 'bg-pink-50', text: 'text-pink-600', border: 'border-pink-100', dot: 'bg-pink-500' },
                                };
                                const colors = colorMap[step.agentColor] || colorMap.purple;
                                
                                return (
                                  <div key={step.id} className="relative pl-8 group">
                                    <div className={`absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full ${colors.dot} ring-4 ring-white z-10`}></div>
                                    <div className="flex items-baseline gap-2 mb-2">
                                       <span className={`text-sm font-bold ${colors.text}`}>{step.agent}</span>
                                       <span className="text-xs font-mono text-slate-400">{step.timestamp}</span>
                                    </div>
                                    <div className={`${colors.bg} rounded-lg p-3 border ${colors.border} text-sm`}>
                                       <div className={`font-bold ${colors.text} mb-1 flex items-center gap-2 text-xs uppercase tracking-wide`}>
                                          <ChevronRight size={14} strokeWidth={3} /> {step.action}
                                       </div>
                                       <div className="text-slate-700 font-mono text-xs leading-relaxed whitespace-pre-wrap">
                                          {step.details}
                                       </div>
                                    </div>
                                  </div>
                                );
                             })}

                             {!terminalData?.orchestrationSteps.length && (
                               <div className="text-center text-slate-400 text-sm py-8">
                                 No orchestration steps recorded
                               </div>
                             )}

                        </div>
                     </div>

                     {/* Right: Metrics */}
                     <div className="w-[350px] bg-slate-50 p-6 overflow-y-auto flex flex-col gap-6 flex-shrink-0 border-l border-slate-100">
                         <div className="flex gap-4">
                            <div className="flex-1 bg-white border border-slate-200 rounded-xl p-4 shadow-sm relative overflow-hidden">
                                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">E2E Latency</div>
                                <div className="text-2xl font-bold text-slate-900 font-mono">{terminalData?.metrics.latency || '--'}</div>
                                <div className="text-[10px] text-slate-400 font-medium mt-1">{terminalData?.metrics.steps || 0} steps</div>
                                <Timer className="absolute right-2 top-2 text-slate-100" size={40} />
                            </div>
                            <div className="flex-1 bg-white border border-slate-200 rounded-xl p-4 shadow-sm relative overflow-hidden">
                                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Total Cost</div>
                                <div className="text-2xl font-bold text-slate-900 font-mono">{terminalData?.metrics.totalCost || '--'}</div>
                                <div className="text-[10px] text-slate-400 font-medium mt-1">{terminalData?.metrics.tokens?.toLocaleString() || 0} tokens</div>
                                <div className="absolute right-2 top-2 text-slate-100 font-serif italic text-4xl">$</div>
                            </div>
                         </div>

                         <div>
                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Recent Context Chunks</h3>
                            <div className="space-y-3">
                                {terminalData?.retrievalContext.map((chunk, idx) => (
                                  <div key={idx} className="bg-white border border-slate-200 rounded-lg p-3 shadow-sm hover:border-slate-300 transition-colors cursor-pointer group">
                                      <div className="flex items-center justify-between mb-2">
                                          <div className="flex items-center gap-2 min-w-0">
                                              <div className="p-1 bg-blue-50 text-blue-600 rounded">
                                                  <FileText size={12} />
                                              </div>
                                              <span className="text-xs font-bold text-slate-700 truncate">{chunk.fileName}</span>
                                          </div>
                                          <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded font-mono">{chunk.chunkId}</span>
                                      </div>
                                      {chunk.preview && (
                                        <p className="text-[10px] text-slate-500 italic leading-relaxed border-l-2 border-slate-200 pl-2 group-hover:border-blue-300 transition-colors">
                                            {chunk.preview}
                                        </p>
                                      )}
                                  </div>
                                ))}

                                {(!terminalData?.retrievalContext || terminalData.retrievalContext.length === 0) && (
                                  <div className="text-center text-slate-400 text-sm py-4">
                                    No context chunks
                                  </div>
                                )}
                            </div>
                         </div>
                     </div>
                </div>
        </div>

        {/* Syllabus Markdown Modal */}
        <MarkdownModal
          isOpen={showSyllabusMarkdown}
          onClose={() => setShowSyllabusMarkdown(false)}
          title="Syllabus - Markdown View"
        >
          <div className="prose prose-sm max-w-none">
            <pre className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-sm font-mono whitespace-pre-wrap text-slate-700 overflow-x-auto">
              {syllabusMarkdown}
            </pre>
          </div>
        </MarkdownModal>

        {/* Original Lesson Markdown Modal */}
        <MarkdownModal
          isOpen={showOriginalLessonMarkdown}
          onClose={() => setShowOriginalLessonMarkdown(false)}
          title="Original Lesson - Markdown View"
        >
          <div className="prose prose-sm max-w-none">
            <pre className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-sm font-mono whitespace-pre-wrap text-slate-700 overflow-x-auto">
              {originalLessonMarkdown}
            </pre>
          </div>
        </MarkdownModal>

        {/* Personalized Lesson Markdown Modal - All Cards Combined */}
        <MarkdownModal
          isOpen={showPersonalizedMarkdown}
          onClose={() => setShowPersonalizedMarkdown(false)}
          title="Personalized Learning Cards - Markdown View"
        >
          <div className="prose prose-sm max-w-none space-y-6">
            {personalizedFlashcards.map((card, index) => (
              <div key={index} className="pb-6 border-b border-slate-200 last:border-b-0 last:pb-0">
                <div className="mb-3">
                  <span className="text-xs text-slate-400 font-medium">Card {index + 1} of {personalizedFlashcards.length}</span>
                  <h3 className="text-lg font-bold text-blue-600 mt-1">{card.title}</h3>
                </div>
                <pre className="bg-blue-50/50 border border-blue-100 rounded-lg p-4 text-sm font-mono whitespace-pre-wrap text-slate-700 overflow-x-auto">
                  {card.content}
                </pre>
              </div>
            ))}
          </div>
        </MarkdownModal>

        {/* Split Compare Modal - Full Screen */}
        <SplitCompareModal
          isOpen={splitScreenMode}
          onClose={() => {
            setSplitScreenMode(false);
            setCompareVersionId(null);
          }}
          leftVersion={currentSyllabus}
          rightVersion={compareSyllabus || syllabusVersions[1]}
          allVersions={syllabusVersions}
          onChangeLeft={(id) => setSelectedSyllabusId(id)}
          onChangeRight={(id) => setCompareVersionId(id)}
        />

        {/* Syllabus LLM Review Modal - tied to selected version */}
        <ReviewModal
          isOpen={showSyllabusReview}
          onClose={() => setShowSyllabusReview(false)}
          title={`${currentSyllabus.name} - Review`}
          review={currentSyllabus.review || defaultSyllabusReview}
        />

        {/* Personalization LLM Review Modal */}
        <ReviewModal
          isOpen={showPersonalizationReview}
          onClose={() => setShowPersonalizationReview(false)}
          title="Personalization Review"
          review={personalizationReview}
        />
    </div>
  );
};
