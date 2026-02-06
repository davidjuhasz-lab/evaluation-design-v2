
import React, { useState } from 'react';
import { 
  Bot, 
  FileText, 
  Settings, 
  MessageSquare, 
  Clock, 
  CheckCircle2,
  XCircle,
  Play,
  Plus,
  BookOpen,
  ScanLine,
  Upload,
  ListFilter,
  RotateCcw,
  Download,
  Check,
  MoreHorizontal,
  ChevronDown,
  AlertCircle,
  FileJson,
  Layers,
  Sliders,
  Gauge,
  Files,
  LogOut,
  ChevronRight,
  Search,
  Filter,
  ArrowUpDown,
  ChevronLeft,
  Globe,
  Shield,
  File,
  Info,
  Scale,
  Calendar,
  User,
  AlertTriangle,
  FileImage,
  Paperclip,
  Trash2,
  Brain,
  Microscope
} from 'lucide-react';
import { AGENTS, AutoState, TestSubType, ManualModule } from '../types';
import { PrimaryButton } from '../components/Shared';

interface ResultRowProps {
  agentType: string;
  subType: TestSubType;
  data: any;
  expanded: boolean;
  onToggle: () => void;
  onManualEval: () => void;
}

const ResultRow: React.FC<ResultRowProps> = ({ agentType, subType, data, expanded, onToggle, onManualEval }) => {
  // For Docu Pipeline: Check if any metric is below threshold (7.0) to flag the whole row
  const isDocuFlagged = subType.startsWith('docu') && data.metrics.some((m: any) => m.value < 7.0);
  const rowBorderClass = isDocuFlagged ? 'border-l-4 border-l-rose-500' : 'border-l-4 border-l-transparent';
  
  return (
    <div className={`border border-slate-200 rounded-xl mb-3 bg-white shadow-sm transition-all hover:shadow-md ${rowBorderClass}`}>
      <div 
        onClick={onToggle} 
        className={`flex items-center justify-between p-4 cursor-pointer hover:bg-slate-50 transition-colors ${expanded ? 'rounded-t-xl' : 'rounded-xl'}`}
      >
        <div className="flex items-center gap-4 flex-1">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isDocuFlagged ? 'bg-rose-100 text-rose-600' : data.status === 'pass' ? 'bg-emerald-100 text-emerald-600' : data.status === 'warning' ? 'bg-amber-100 text-amber-600' : 'bg-rose-100 text-rose-600'}`}>
            {isDocuFlagged ? <AlertCircle size={16} /> : data.status === 'pass' ? <Check size={16} /> : data.status === 'warning' ? <AlertTriangle size={16} /> : <XCircle size={16} />}
          </div>
          <div className="flex-1">
            <div className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                {subType.startsWith('docu') && <FileText size={14} className="text-slate-400"/>}
                {data.title}
            </div>
            <div className="text-xs text-slate-500 mt-0.5 flex items-center gap-2">
               {subType.startsWith('docu') ? (
                  <>
                    <span className="font-mono bg-slate-100 px-1 rounded">{data.fileType}</span>
                    <span className="text-slate-300">|</span>
                    <span>Size: {data.fileSize}</span>
                  </>
               ) : (
                  <>
                    <span>Tokens: <span className="font-mono text-slate-700">{data.tokens || '420'}</span></span>
                    <span className="text-slate-300">|</span>
                    <span>Cost: <span className="font-mono text-slate-700">${data.cost || '0.002'}</span></span>
                    <span className="text-slate-300">|</span>
                    <span>Time: <span className="font-mono text-slate-700">{data.time || '1.2s'}</span></span>
                  </>
               )}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
           {data.metricsSummary && (
               <div className="flex items-center gap-2 mr-4">
                   {data.metricsSummary.map((m: any, i: number) => (
                       <div key={i} className={`text-[10px] font-bold px-2 py-0.5 rounded border ${m.status === 'pass' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : m.status === 'fail' ? 'bg-rose-50 text-rose-700 border-rose-100' : 'bg-slate-50 text-slate-600 border-slate-200'}`}>
                           {m.name}: {m.value}
                       </div>
                   ))}
               </div>
           )}
           {/* Quick Stats for Documents */}
           {subType.startsWith('docu') && (
               <div className="flex items-center gap-1 mr-4">
                   {data.metrics.map((m: any, i: number) => (
                       <div key={i} className={`w-8 h-1 rounded-full ${m.value < 7.0 ? 'bg-rose-500' : 'bg-emerald-500'}`} title={`${m.name}: ${m.value}/10`}></div>
                   ))}
               </div>
           )}

           <div className="px-2 py-1 bg-slate-100 rounded border border-slate-200 flex items-center gap-1.5 text-xs text-slate-500" title="Agent Settings Snapshot">
              <Settings size={12} /> <span>v1.2</span>
           </div>
           <ChevronDown size={18} className={`text-slate-400 transition-transform ${expanded ? 'rotate-180' : ''}`} />
        </div>
      </div>

      {expanded && (
        <div className="border-t border-slate-100 bg-slate-50/50 p-6 space-y-6 rounded-b-xl animate-in slide-in-from-top-2 duration-200">
          
          {/* Manual Debug Button Action Area */}
          <div className="flex justify-end -mt-2 mb-2">
             <button 
                onClick={(e) => { e.stopPropagation(); onManualEval(); }} 
                className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 text-slate-600 hover:text-sky-600 hover:border-sky-300 rounded-lg text-xs font-bold transition-all shadow-sm group"
             >
                 <Microscope size={14} className="group-hover:scale-110 transition-transform" /> Inspect in Manual Debugger
             </button>
          </div>

          {subType === 'assistant-single' && (
            <>
              <div className="grid grid-cols-2 gap-6">
                 <div>
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Expected Answer</h4>
                    <div className="bg-white p-3 rounded-lg border border-slate-200 text-sm text-slate-700">{data.expected}</div>
                 </div>
                 <div>
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Actual Output</h4>
                    <div className="bg-white p-3 rounded-lg border border-slate-200 text-sm text-slate-700">{data.actual}</div>
                 </div>
              </div>
            </>
          )}

          {subType === 'edu-personalization' && (
             <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Description (Persona)</h4>
                        <div className="bg-white p-3 rounded-lg border border-slate-200 text-sm text-slate-700 italic">
                            "{data.inputs.description}"
                        </div>
                    </div>
                    <div>
                        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Instruction</h4>
                        <div className="bg-white p-3 rounded-lg border border-slate-200 text-sm text-slate-900 font-medium">
                            {data.inputs.instruction}
                        </div>
                    </div>
                </div>

                <div>
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Actual Output</h4>
                    <div className="bg-white p-4 rounded-lg border border-slate-200 text-sm text-slate-800 leading-relaxed shadow-sm">
                         <div dangerouslySetInnerHTML={{ __html: data.actual.replace(/\n/g, '<br/>') }} />
                    </div>
                </div>

                <div>
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2 flex items-center gap-2">
                        <Scale size={12} /> Custom LLM Judge Metrics
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {data.metrics.map((m: any, idx: number) => (
                            <div key={idx} className={`bg-white border rounded-lg p-3 shadow-sm ${m.status === 'pass' ? 'border-emerald-100' : m.status === 'fail' ? 'border-rose-100' : 'border-slate-200'}`}>
                                <div className="text-[10px] text-slate-500 uppercase font-bold">{m.name}</div>
                                <div className={`text-xl font-mono font-bold mt-1 ${m.status === 'pass' ? 'text-emerald-600' : m.status === 'fail' ? 'text-rose-600' : 'text-slate-700'}`}>
                                    {m.value}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
             </>
          )}

          {subType === 'edu-syllabus' && (
             <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Topic & Goal</h4>
                        <div className="bg-white p-3 rounded-lg border border-slate-200 text-sm text-slate-900 font-medium">
                            {data.inputs.topic}
                        </div>
                    </div>
                    <div>
                        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Target Audience</h4>
                        <div className="bg-white p-3 rounded-lg border border-slate-200 text-sm text-slate-700 flex items-center gap-2">
                            <User size={14} className="text-slate-400"/> {data.inputs.audience}
                        </div>
                    </div>
                     <div>
                        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Constraint</h4>
                        <div className="bg-white p-3 rounded-lg border border-slate-200 text-sm text-slate-700 flex items-center gap-2">
                            <Calendar size={14} className="text-slate-400"/> {data.inputs.duration}
                        </div>
                    </div>
                </div>

                <div>
                    <div className="flex items-center justify-between mb-2">
                        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wide">Generated Syllabus & Judge Comments</h4>
                        <div className="flex gap-4 text-[10px]">
                            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-400"></span> Verified Grounding</span>
                            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-400"></span> Judge Warning</span>
                        </div>
                    </div>
                    <div className="bg-white p-5 rounded-lg border border-slate-200 text-sm text-slate-800 leading-relaxed shadow-sm font-mono text-[13px] relative z-0">
                         <div dangerouslySetInnerHTML={{ __html: data.actual.replace(/\n/g, '') }} />
                    </div>
                </div>

                <div>
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2 flex items-center gap-2">
                        <Scale size={12} /> Custom LLM Judge Metrics
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {data.metrics.map((m: any, idx: number) => (
                            <div key={idx} className={`bg-white border rounded-lg p-3 shadow-sm ${m.status === 'pass' ? 'border-emerald-100' : m.status === 'fail' ? 'border-rose-100' : 'border-slate-200'}`}>
                                <div className="text-[10px] text-slate-500 uppercase font-bold">{m.name}</div>
                                <div className={`text-xl font-mono font-bold mt-1 ${m.status === 'pass' ? 'text-emerald-600' : m.status === 'fail' ? 'text-rose-600' : 'text-slate-700'}`}>
                                    {m.value}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
             </>
          )}

          {subType.startsWith('docu') && (
            <>
                {/* Confidence Metrics Visualization */}
                <div className="mb-6">
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3 flex items-center gap-2">
                        <Gauge size={14} /> Evaluation Step Confidence
                    </h4>
                    <div className="grid grid-cols-3 gap-4">
                        {data.metrics.map((metric: any, i: number) => {
                            const isLowConfidence = metric.value < 7.0;
                            return (
                                <div key={i} className={`p-4 rounded-lg border ${isLowConfidence ? 'bg-rose-50 border-rose-200' : 'bg-white border-slate-200'}`}>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className={`text-xs font-bold uppercase ${isLowConfidence ? 'text-rose-700' : 'text-slate-500'}`}>{metric.name}</span>
                                        {isLowConfidence && <AlertCircle size={14} className="text-rose-500" />}
                                    </div>
                                    <div className="flex items-baseline gap-1">
                                        <span className={`text-2xl font-bold font-mono ${isLowConfidence ? 'text-rose-600' : 'text-emerald-600'}`}>{metric.value}</span>
                                        <span className="text-xs text-slate-400">/ 10</span>
                                    </div>
                                    <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
                                        <div 
                                            className={`h-full rounded-full ${isLowConfidence ? 'bg-rose-500' : 'bg-emerald-500'}`} 
                                            style={{ width: `${(metric.value / 10) * 100}%` }}
                                        ></div>
                                    </div>
                                    {isLowConfidence && <p className="text-[10px] text-rose-600 mt-2 font-medium">Confidence check failed.</p>}
                                </div>
                            );
                        })}
                    </div>
                </div>
                
                {/* Extracted Data Preview */}
                <div>
                     <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3 flex items-center gap-2">
                        <FileJson size={14} /> Extracted Data
                    </h4>
                    <div className="bg-slate-900 rounded-lg p-4 font-mono text-xs text-emerald-400 overflow-x-auto">
                        <pre>{JSON.stringify(data.extractedData, null, 2)}</pre>
                    </div>
                </div>
            </>
          )}

          {/* Common Retrieved Chunks Section - Hide for docu pipeline as it uses extraction logic */}
          {!subType.startsWith('docu') && (
            <div>
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Retrieved Chunks</h4>
                <div className="space-y-2">
                    {data.chunks?.map((chunk: any, i: number) => (
                    <div key={i} className="flex items-center gap-3 bg-white p-2 rounded border border-slate-200 text-xs text-slate-600 hover:border-blue-300 transition-colors cursor-pointer group">
                        <div className="p-1 bg-blue-50 text-blue-600 rounded">
                            <FileText size={14} />
                        </div>
                        <span className="font-bold text-slate-700">{chunk.source}</span>
                        <span className="text-slate-300">|</span>
                        <span className="italic truncate flex-1 text-slate-500">"{chunk.excerpt}..."</span>
                    </div>
                    ))}
                </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export const AutoTestPanel = ({ onSwitchToManual }: { onSwitchToManual: (module: ManualModule) => void }) => {
  const [viewState, setViewState] = useState<AutoState>('list');
  const [activeTab, setActiveTab] = useState<'sets' | 'history'>('history');
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null);
  const [selectedSubType, setSelectedSubType] = useState<TestSubType>('assistant-single');
  const [activeStep, setActiveStep] = useState(0);
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  // Mock Data for Docu Pipeline
  const docuPipelineFiles = [
    { name: "Employment_Contract_J_Doe_2024.pdf", size: "2.4 MB", type: "application/pdf" },
    { name: "Invoice_INV-2023-001_AcmeCorp.pdf", size: "145 KB", type: "application/pdf" },
    { name: "ID_Card_Scan_Front_DriverLic.jpg", size: "3.2 MB", type: "image/jpeg" },
    { name: "NDA_Confidential_Project_X.docx", size: "540 KB", type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" },
    { name: "Receipt_Coffee_Meeting_02_14.png", size: "1.1 MB", type: "image/png" }
  ];

  const docuPipelineResults = [
    {
        id: 1,
        title: "Employment_Contract_J_Doe_2024.pdf",
        status: "pass",
        fileType: "PDF",
        fileSize: "2.4 MB",
        metrics: [
            { name: "OCR Quality", value: 9.8 },
            { name: "Entity Extraction", value: 9.5 },
            { name: "Classification", value: 9.9 }
        ],
        extractedData: {
            "document_type": "contract",
            "parties": ["John Doe", "Tech Global Inc"],
            "start_date": "2024-03-01",
            "salary": "$120,000"
        }
    },
    {
        id: 2,
        title: "ID_Card_Scan_Front_DriverLic.jpg",
        status: "fail", // Flagged because OCR < 7
        fileType: "JPG",
        fileSize: "3.2 MB",
        metrics: [
            { name: "OCR Quality", value: 4.5 }, // Low confidence
            { name: "Entity Extraction", value: 6.2 }, // Low confidence
            { name: "Classification", value: 8.0 }
        ],
        extractedData: {
            "document_type": "id_card",
            "id_number": "D123**** (illegible)",
            "name": "Jane Sm*th",
            "expiry": null
        }
    },
    {
        id: 3,
        title: "Invoice_INV-2023-001_AcmeCorp.pdf",
        status: "pass",
        fileType: "PDF",
        fileSize: "145 KB",
        metrics: [
            { name: "OCR Quality", value: 9.9 },
            { name: "Entity Extraction", value: 8.8 },
            { name: "Classification", value: 9.2 }
        ],
        extractedData: {
            "document_type": "invoice",
            "invoice_number": "INV-2023-001",
            "total_amount": "$4,500.00",
            "vendor": "Acme Corp"
        }
    },
    {
        id: 4,
        title: "Receipt_Coffee_Meeting_02_14.png",
        status: "fail", // Flagged
        fileType: "PNG",
        fileSize: "1.1 MB",
        metrics: [
            { name: "OCR Quality", value: 6.8 }, // Low confidence
            { name: "Entity Extraction", value: 7.2 },
            { name: "Classification", value: 8.5 }
        ],
        extractedData: {
            "document_type": "receipt",
            "merchant": "Starb**ks",
            "date": "2024-02-14",
            "total": "$12.50"
        }
    }
  ];

  // ... (Mock Data for Edu Personalization Results remains the same)
  const eduPersResults = [
    {
        id: 1,
        status: 'pass',
        title: 'Persona: 12yo Superhero Fan',
        tokens: 342,
        cost: 0.004,
        time: '1.8s',
        inputs: {
            description: "Student is a 12-year-old fan of superhero comics. Prefers punchy, action-oriented explanations.",
            instruction: "Explain the concept of 'Variables' in Python."
        },
        actual: "Think of a variable like a <strong>utility belt pouch</strong>. You can put different gadgets inside! You don't need to tell Batman what pouch holds the Batarang ahead of time; you just put it in.<br/><br/><code class='bg-slate-100 px-1 py-0.5 rounded text-xs'>hero_name = 'Spider-Man'</code><br/><br/>Just like a hero can swap gadgets, you can change what's in the pouch anytime!",
        chunks: [
            { source: 'python_basics_v2.pdf', excerpt: 'Variables are containers for storing data values...' },
            { source: 'persona_db_heroes.json', excerpt: 'Batman: Utility belt, gadgets, preparation...' }
        ],
        metrics: [
             { name: 'Groundedness', value: '0.98', status: 'pass' },
             { name: 'Faithfulness', value: '1.0', status: 'pass' },
             { name: 'Persona Match', value: '0.95', status: 'pass' },
             { name: 'Char Count', value: '245', status: 'info' }
        ],
        metricsSummary: [
             { name: 'Persona', value: '0.95', status: 'pass' },
             { name: 'Ground', value: '0.98', status: 'pass' }
        ]
    },
    {
        id: 2,
        status: 'pass',
        title: 'Persona: Visual Art Learner',
        tokens: 410,
        cost: 0.005,
        time: '2.1s',
        inputs: {
            description: "Student is a visual learner who loves painting and sketching. Uses spatial and color-based analogies.",
            instruction: "Explain 'For Loops'."
        },
        actual: "Imagine you are painting a picket fence. You don't paint the whole fence at once; you paint <strong>one plank at a time</strong>. <br/><br/>A <code>for</code> loop is like that brush stroke. It goes to the first plank, paints it, then moves to the next, repeating the same action until the fence is done.",
        chunks: [
            { source: 'coding_analogies.pdf', excerpt: 'Loops repeat a block of code...' },
            { source: 'art_concepts.txt', excerpt: 'Repetition in art creates rhythm...' }
        ],
        metrics: [
             { name: 'Groundedness', value: '0.99', status: 'pass' },
             { name: 'Faithfulness', value: '0.98', status: 'pass' },
             { name: 'Persona Match', value: '0.92', status: 'pass' },
             { name: 'Char Count', value: '312', status: 'info' }
        ],
        metricsSummary: [
             { name: 'Persona', value: '0.92', status: 'pass' },
             { name: 'Ground', value: '0.99', status: 'pass' }
        ]
    },
     {
        id: 3,
        status: 'fail',
        title: 'Persona: Math/Logic Enjoyer',
        tokens: 280,
        cost: 0.003,
        time: '1.5s',
        inputs: {
            description: "Student loves pure mathematics and logic puzzles. Prefers formal definitions and algebraic notation.",
            instruction: "Explain 'Functions'."
        },
        actual: "A function is a block of code which only runs when it is called. You can pass data, known as parameters, into a function. It returns data as a result.",
        chunks: [
            { source: 'python_docs_official.html', excerpt: 'A function is a block of code...' }
        ],
        metrics: [
             { name: 'Groundedness', value: '1.0', status: 'pass' },
             { name: 'Faithfulness', value: '1.0', status: 'pass' },
             { name: 'Persona Match', value: '0.45', status: 'fail' },
             { name: 'Char Count', value: '110', status: 'info' }
        ],
        metricsSummary: [
             { name: 'Persona', value: '0.45', status: 'fail' },
             { name: 'Ground', value: '1.0', status: 'pass' }
        ]
    }
  ];

  // ... (Mock Data for Edu Syllabus Results remains the same)
  const eduSyllabusResults = [
    {
        id: 1,
        status: 'pass',
        title: 'React Mastery Course',
        tokens: 890,
        cost: 0.012,
        time: '3.4s',
        inputs: {
            topic: "Advanced React Patterns",
            audience: "Senior Engineers",
            duration: "4 Weeks"
        },
        actual: `
<strong>Week 1: Render Behavior & Optimization</strong><br/>
- <span class="relative group cursor-help border-b-2 border-emerald-300 bg-emerald-50 px-0.5">Virtual DOM internals & Reconciliation
   <span class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 p-2 bg-slate-800 text-white text-[11px] font-sans leading-tight rounded-md shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none z-50 text-center">
     <span class="flex items-center justify-center gap-1.5 text-emerald-400 font-bold mb-1 uppercase tracking-wider text-[10px]"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg> Verified Grounding</span>
     Validated against React Documentation (Beta) Section: Reconciliation.
     <span class="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-slate-800"></span>
   </span>
</span><br/>
- useMemo, useCallback, and Referental Equality<br/><br/>

<strong>Week 2: Advanced Hooks & Patterns</strong><br/>
- <span class="relative group cursor-help border-b-2 border-emerald-300 bg-emerald-50 px-0.5">Compound Components Pattern
  <span class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 p-2 bg-slate-800 text-white text-[11px] font-sans leading-tight rounded-md shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none z-50 text-center">
     <span class="flex items-center justify-center gap-1.5 text-emerald-400 font-bold mb-1 uppercase tracking-wider text-[10px]"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg> Verified Grounding</span>
     Matches architectural patterns described in 'Advanced React' blog series.
     <span class="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-slate-800"></span>
   </span>
</span><br/>
- Control Props Pattern<br/><br/>

<strong>Week 3: State Management at Scale</strong><br/>
- Context API performance pitfalls<br/>
- External stores (Zustand/Jotai)<br/><br/>

<strong>Week 4: Performance Tuning</strong><br/>
- Code splitting & Lazy Loading<br/>
- Profiler API usage
        `,
        chunks: [
            { source: 'react_docs_beta.md', excerpt: 'Deep dive into reconciliation...' },
            { source: 'advanced_patterns_blog.md', excerpt: 'Compound components allow flexible UI...' }
        ],
        metrics: [
             { name: 'Curriculum Depth', value: '0.94', status: 'pass' },
             { name: 'Pacing Score', value: '0.91', status: 'pass' },
             { name: 'Audience Fit', value: '0.98', status: 'pass' },
             { name: 'Modules', value: '4', status: 'info' }
        ],
        metricsSummary: [
             { name: 'Depth', value: '0.94', status: 'pass' },
             { name: 'Fit', value: '0.98', status: 'pass' }
        ]
    },
    {
        id: 2,
        status: 'warning',
        title: 'Renaissance Art History',
        tokens: 650,
        cost: 0.008,
        time: '2.8s',
        inputs: {
            topic: "Italian Renaissance Art",
            audience: "High School Students",
            duration: "3 Weeks"
        },
        actual: `
<strong>Week 1: The Early Renaissance</strong><br/>
- Giotto and the break from Byzantine style<br/>
- <span class="relative group cursor-help border-b-2 border-amber-300 bg-amber-50 px-0.5">Brunelleschi's Dome engineering specifics
   <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-slate-900 text-white text-xs font-sans rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none z-50">
        <div class="font-bold text-amber-400 mb-1 flex items-center gap-1.5 uppercase tracking-wide text-[10px]"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg> Judge Warning</div>
        <p class="leading-relaxed text-slate-200">The engineering depth required here exceeds typical High School physics/math prerequisites. Suggest focusing on visual impact instead.</p>
        <div class="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-slate-900"></div>
    </div>
</span><br/><br/>

<strong>Week 2: The High Renaissance</strong><br/>
- Leonardo da Vinci: The Last Supper<br/>
- Michelangelo: The Sistine Chapel<br/><br/>

<strong>Week 3: Mannerism & Transition</strong><br/>
- Shift away from balance/proportion<br/>
- Key figures: Pontormo, Rosso
        `,
        chunks: [
            { source: 'art_history_textbook.pdf', excerpt: 'Brunelleschi designed the dome...' },
            { source: 'hs_curriculum_standards.pdf', excerpt: 'Focus on visual analysis over engineering...' }
        ],
        metrics: [
             { name: 'Curriculum Depth', value: '0.85', status: 'pass' },
             { name: 'Pacing Score', value: '0.88', status: 'pass' },
             { name: 'Audience Fit', value: '0.72', status: 'warning' },
             { name: 'Modules', value: '3', status: 'info' }
        ],
        metricsSummary: [
             { name: 'Fit', value: '0.72', status: 'fail' }
        ]
    },
    {
        id: 3,
        status: 'pass',
        title: 'Intro to Physics',
        tokens: 520,
        cost: 0.006,
        time: '2.2s',
        inputs: {
            topic: "Classical Mechanics",
            audience: "Undergraduates",
            duration: "2 Weeks"
        },
        actual: `
<strong>Week 1: Kinematics</strong><br/>
- <span class="relative group cursor-help border-b-2 border-emerald-300 bg-emerald-50 px-0.5">Newtons Laws of Motion
  <span class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 p-2 bg-slate-800 text-white text-[11px] font-sans leading-tight rounded-md shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none z-50 text-center">
     <span class="flex items-center justify-center gap-1.5 text-emerald-400 font-bold mb-1 uppercase tracking-wider text-[10px]"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg> Verified Grounding</span>
     Confirmed in 'Physics 101 Syllabus' document.
     <span class="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-slate-800"></span>
   </span>
</span><br/>
- Vectors and Projectile Motion<br/><br/>

<strong>Week 2: Dynamics & Energy</strong><br/>
- Work, Energy, and Power<br/>
- <span class="relative group cursor-help border-b-2 border-emerald-300 bg-emerald-50 px-0.5">Conservation of Momentum
  <span class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 p-2 bg-slate-800 text-white text-[11px] font-sans leading-tight rounded-md shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none z-50 text-center">
     <span class="flex items-center justify-center gap-1.5 text-emerald-400 font-bold mb-1 uppercase tracking-wider text-[10px]"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg> Verified Grounding</span>
     Fundamental topic for undergraduate mechanics.
     <span class="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-slate-800"></span>
   </span>
</span>
        `,
        chunks: [
            { source: 'physics_101_syllabus.doc', excerpt: 'Week 1 covers Newton...' }
        ],
        metrics: [
             { name: 'Curriculum Depth', value: '0.92', status: 'pass' },
             { name: 'Pacing Score', value: '0.95', status: 'pass' },
             { name: 'Audience Fit', value: '0.96', status: 'pass' },
             { name: 'Modules', value: '2', status: 'info' }
        ],
        metricsSummary: [
             { name: 'Depth', value: '0.92', status: 'pass' },
             { name: 'Fit', value: '0.96', status: 'pass' }
        ]
    }
  ];

  const getSubTypesForAgent = (agentId: string) => {
    switch (agentId) {
        case 'assistant': return ['assistant-single', 'assistant-multi'];
        case 'edu-pers': return ['edu-personalization'];
        case 'edu-syll': return ['edu-syllabus'];
        case 'doc-pipeline': return ['docu-pipeline', 'docu-crosscheck', 'docu-bulk'];
        default: return [];
    }
  };

  const selectedAgent = AGENTS.find(a => a.id === selectedAgentId) || AGENTS[0];

  const handleCreateClick = () => {
      setViewState('agent-modal');
  };

  const handleRun = () => {
     setViewState('running');
     let step = 0;
     const interval = setInterval(() => {
        step++;
        setActiveStep(step);
        if (step >= 4) {
           clearInterval(interval);
           setViewState('results');
        }
     }, 800);
  };

    const AgentSelectionModal = () => (
    <div className="absolute inset-0 z-50 bg-slate-900/20 backdrop-blur-sm flex items-center justify-center p-4">
       <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl p-8 relative animate-in fade-in zoom-in duration-200">
          <button onClick={() => setViewState('list')} className="absolute right-4 top-4 text-slate-400 hover:text-slate-600"><XCircle size={24} /></button>
          <h2 className="text-2xl font-bold text-slate-900 text-center mb-8">Select Agent to Evaluate</h2>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {AGENTS.map(agent => (
                <div 
                    key={agent.id}
                    onClick={() => {
                        setSelectedAgentId(agent.id);
                        const subtypes = getSubTypesForAgent(agent.id);
                        if (subtypes.length > 1) {
                            setViewState('type-modal');
                        } else {
                            if(agent.id === 'edu-pers') setSelectedSubType('edu-personalization');
                            if(agent.id === 'edu-syll') setSelectedSubType('edu-syllabus');
                            setViewState('editor');
                        }
                    }}
                    className="border-2 border-slate-100 hover:border-sky-400 bg-white hover:bg-sky-50 rounded-xl p-6 cursor-pointer transition-all flex flex-col items-center text-center group"
                >
                    <div className="w-14 h-14 bg-slate-50 group-hover:bg-sky-100 text-slate-400 group-hover:text-sky-600 rounded-2xl flex items-center justify-center mb-4 transition-colors">
                        {agent.type === 'assistant' && <MessageSquare size={28} />}
                        {agent.type === 'edu' && <BookOpen size={28} />}
                        {agent.type === 'docu' && <ScanLine size={28} />}
                    </div>
                    <h3 className="font-bold text-slate-900 mb-1">{agent.name}</h3>
                    <p className="text-xs text-slate-500">
                        {agent.type === 'assistant' && "Chat & Reasoning"}
                        {agent.type === 'edu' && "Content Gen"}
                        {agent.type === 'docu' && "OCR & Extraction"}
                    </p>
                </div>
            ))}
          </div>
       </div>
    </div>
  );

  const TypeSelectionModal = () => {
    // State for Assistant Config Modal
    const [interactionMode, setInteractionMode] = useState<'single' | 'multi'>('multi');
    const [dataSource, setDataSource] = useState<'upload' | 'simulate'>('simulate');
    const [difficulty, setDifficulty] = useState('Medium');

    if (selectedAgentId === 'assistant') {
       return (
           <div className="absolute inset-0 z-50 bg-slate-900/20 backdrop-blur-sm flex items-center justify-center p-4">
               <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-8 relative animate-in fade-in zoom-in duration-200">
                  <button onClick={() => setViewState('list')} className="absolute right-4 top-4 text-slate-400 hover:text-slate-600"><XCircle size={24} /></button>
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Configure Evaluation</h2>
                  
                  {/* Interaction Mode */}
                  <div className="mb-8">
                     <label className="block text-sm font-bold text-slate-700 mb-3 flex items-center justify-between">
                        Interaction Mode 
                        <Info size={14} className="text-slate-400" />
                     </label>
                     <div className="bg-slate-100 p-1 rounded-xl flex">
                        <button onClick={() => setInteractionMode('single')} className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${interactionMode === 'single' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>Single-turn</button>
                        <button onClick={() => setInteractionMode('multi')} className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${interactionMode === 'multi' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>Multi-turn</button>
                     </div>
                  </div>

                  {/* Data Source */}
                  <div className="mb-8">
                     <label className="block text-sm font-bold text-slate-700 mb-3">Conversation Data Source</label>
                     <div className="grid grid-cols-2 gap-4">
                        <div onClick={() => setDataSource('upload')} className={`relative p-5 rounded-xl border-2 cursor-pointer transition-all ${dataSource === 'upload' ? 'border-sky-500 bg-sky-50/50' : 'border-slate-100 hover:border-slate-200'}`}>
                           <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 mb-3">
                              <Upload size={20} />