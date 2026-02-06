
import { ManualRun, AutoRun, RunHistoryEntry } from '../../types';

export const mockManualRuns: ManualRun[] = [
  {
    id: 'manual-001',
    type: 'manual',
    module: 'assistant',
    moduleName: 'Assistant Chat',
    createdAt: '2026-02-05T10:24:00.000Z',
    duration: '12m 34s',
    status: 'completed',
    messages: [
      { 
        id: 1, 
        role: 'user', 
        content: 'I need to summarize the quarterly earnings report uploaded earlier and compare it with Q3 projections.', 
        timestamp: '10:24 AM' 
      },
      { 
        id: 2, 
        role: 'assistant', 
        content: `I've analyzed the <strong>Q4_Earnings.pdf</strong> and compared it against the Q3 projections. Here are the key findings:

<ul class="list-disc pl-5 my-3 space-y-2">
  <li><strong>Revenue</strong>: $4.2M (Actual) vs $4.0M (Projected) — <span class="text-emerald-600 font-medium">Exceeded by 5.0%</span>.</li>
  <li><strong>Operating Expenses</strong>: $1.65M (Actual) vs $1.8M (Projected) — <span class="text-emerald-600 font-medium">Reduced by 8.3%</span> thanks to automation efforts.</li>
  <li><strong>Net Profit Margin</strong>: Currently stands at a healthy 22%.</li>
</ul>

Overall, Q4 performance surpassed expectations with higher revenue and lower costs.`,
        timestamp: '10:24 AM' 
      }
    ],
    terminalData: {
      traceId: 'req_892jks9',
      orchestrationSteps: [
        {
          id: 'step-1',
          agent: '@Orchestrator',
          agentColor: 'purple',
          timestamp: '10:24:02.120',
          action: 'Routing Decision',
          details: 'Dispatching tasks:\n1. Summarization → @DocReader\n2. Comparison → @Analyst'
        },
        {
          id: 'step-2',
          agent: '@DocReader',
          agentColor: 'orange',
          timestamp: '10:24:02.450',
          action: 'Extraction',
          details: 'Extracted key metrics from Q4_Earnings.pdf (Page 3, Table 1).'
        },
        {
          id: 'step-3',
          agent: '@Analyst',
          agentColor: 'blue',
          timestamp: '10:24:03.100',
          action: 'SQL Query Execution',
          details: "SELECT * FROM projections WHERE quarter = 'Q4' AND year = 2023;"
        }
      ],
      metrics: {
        totalCost: '$0.042',
        latency: '2.4s',
        tokens: 1248,
        steps: 3
      },
      retrievalContext: [
        {
          fileName: 'Q4_Earnings.pdf',
          chunkId: 'chunk_02',
          preview: '"...revenue increased by 15% YoY to $4.2M while operating expenses..."'
        }
      ]
    }
  },
  {
    id: 'manual-002',
    type: 'manual',
    module: 'docu',
    moduleName: 'Document Pipeline',
    createdAt: '2026-02-04T14:30:00.000Z',
    duration: '8m 12s',
    status: 'completed',
    messages: [],
    terminalData: {
      traceId: 'req_7xk29pa',
      orchestrationSteps: [
        {
          id: 'step-1',
          agent: '@DocProcessor',
          agentColor: 'amber',
          timestamp: '14:30:01.220',
          action: 'Document Intake',
          details: 'Received Invoice_INV-2023-001.pdf for processing.'
        },
        {
          id: 'step-2',
          agent: '@OCREngine',
          agentColor: 'teal',
          timestamp: '14:30:02.810',
          action: 'Text Extraction',
          details: 'Extracted 245 words with 98.2% confidence.'
        }
      ],
      metrics: {
        totalCost: '$0.018',
        latency: '1.8s',
        tokens: 524,
        steps: 2
      },
      retrievalContext: []
    }
  },
  {
    id: 'manual-003',
    type: 'manual',
    module: 'assistant',
    moduleName: 'Assistant Chat',
    createdAt: '2026-02-03T09:15:00.000Z',
    duration: '5m 45s',
    status: 'completed',
    messages: [
      { 
        id: 1, 
        role: 'user', 
        content: 'What were the main takeaways from the product strategy meeting last week?', 
        timestamp: '9:15 AM' 
      },
      { 
        id: 2, 
        role: 'assistant', 
        content: 'Based on the meeting notes from January 28th, here are the main takeaways:\n\n1. Q1 focus will be on mobile optimization\n2. New feature roadmap approved with 3 priority items\n3. Budget allocated for additional engineering resources',
        timestamp: '9:15 AM' 
      }
    ],
    terminalData: {
      traceId: 'req_4ks82nz',
      orchestrationSteps: [
        {
          id: 'step-1',
          agent: '@Orchestrator',
          agentColor: 'purple',
          timestamp: '09:15:01.050',
          action: 'Query Analysis',
          details: 'Identified intent: Document retrieval + summarization'
        },
        {
          id: 'step-2',
          agent: '@Retriever',
          agentColor: 'green',
          timestamp: '09:15:01.890',
          action: 'Vector Search',
          details: 'Found 3 relevant documents with cosine similarity > 0.85'
        }
      ],
      metrics: {
        totalCost: '$0.031',
        latency: '1.9s',
        tokens: 892,
        steps: 2
      },
      retrievalContext: [
        {
          fileName: 'Meeting_Notes_Jan28.docx',
          chunkId: 'chunk_01',
          preview: '"...product strategy meeting focused on Q1 priorities..."'
        }
      ]
    }
  },
  {
    id: 'manual-004',
    type: 'manual',
    module: 'edu',
    moduleName: 'Educational Agents',
    createdAt: '2026-02-05T11:30:00.000Z',
    duration: '15m 22s',
    status: 'completed',
    messages: [],
    terminalData: {
      traceId: 'req_edu_001',
      orchestrationSteps: [
        {
          id: 'step-1',
          agent: '@SyllabusGen',
          agentColor: 'indigo',
          timestamp: '11:30:01.120',
          action: 'Syllabus Generation',
          details: 'Generated 4-module syllabus for Python Basics based on user profile.'
        },
        {
          id: 'step-2',
          agent: '@Personalizer',
          agentColor: 'pink',
          timestamp: '11:30:05.450',
          action: 'Content Personalization',
          details: 'Adapted Module 01 content using superhero analogy preference.'
        },
        {
          id: 'step-3',
          agent: '@ContentGen',
          agentColor: 'amber',
          timestamp: '11:30:12.890',
          action: 'Flashcard Creation',
          details: 'Generated 3 personalized flashcards with code examples.'
        }
      ],
      metrics: {
        totalCost: '$0.089',
        latency: '14.2s',
        tokens: 3842,
        steps: 3
      },
      retrievalContext: [
        {
          fileName: 'Python_Basics_Curriculum.md',
          chunkId: 'chunk_01',
          preview: '"...Module 1: Introduction to Variables - covering strings, integers..."'
        }
      ]
    },
    syllabusVersions: [
      {
        id: 'py-v3',
        name: 'Python Basics v3 (Current)',
        createdAt: '2026-02-05T11:30:00.000Z',
        modules: [
          { id: '01', title: 'Intro to Variables', topics: 'Strings, Integers, Float', time: '45 mins' },
          { id: '02', title: 'Control Flow', topics: 'If/Else, Loops, Break', time: '60 mins' },
          { id: '03', title: 'Functions', topics: 'Def, Args, Return', time: '50 mins' },
          { id: '04', title: 'Data Structures', topics: 'Lists, Dicts, Sets', time: '75 mins' },
        ],
        markdown: `# Python Programming Syllabus v3\n\n## Module 01: Intro to Variables\n**Topics:** Strings, Integers, Float\n**Duration:** 45 mins\n\n## Module 02: Control Flow\n**Topics:** If/Else, Loops, Break\n**Duration:** 60 mins\n\n## Module 03: Functions\n**Topics:** Def, Args, Return\n**Duration:** 50 mins\n\n## Module 04: Data Structures\n**Topics:** Lists, Dicts, Sets\n**Duration:** 75 mins`,
        review: {
          title: "Syllabus v3 Quality Assessment",
          summary: "Excellent syllabus structure with strong alignment to learning objectives. The 4-module format provides optimal pacing for beginners.",
          metrics: [
            { name: "Groundedness", score: 9, maxScore: 10, description: "Content is well-supported by retrieved educational materials", status: 'pass' as const },
            { name: "Faithfulness", score: 9, maxScore: 10, description: "Syllabus accurately reflects the source curriculum structure", status: 'pass' as const },
            { name: "Relevance", score: 10, maxScore: 10, description: "Topics are highly relevant to beginner Python learning", status: 'pass' as const },
            { name: "Completeness", score: 8, maxScore: 10, description: "Covers essential concepts with good depth", status: 'pass' as const },
            { name: "Coherence", score: 9, maxScore: 10, description: "Logical progression from variables to data structures", status: 'pass' as const },
            { name: "Instruction Adherence", score: 9, maxScore: 10, description: "Follows the provided instruction parameters well", status: 'pass' as const },
          ],
          strengths: [
            "Streamlined 4-module structure improves focus",
            "Time allocations are well-balanced",
            "Clear progression from basics to complex topics",
            "Data structures module provides good culmination"
          ],
          improvements: [
            "Consider adding error handling introduction",
            "Could include brief OOP preview in functions module"
          ],
          retrievedChunksUsed: 10,
          totalChunks: 12
        }
      },
      {
        id: 'py-v2',
        name: 'Python Basics v2',
        createdAt: '2026-02-04T16:00:00.000Z',
        modules: [
          { id: '01', title: 'Variables & Types', topics: 'Strings, Numbers, Booleans', time: '50 mins' },
          { id: '02', title: 'Conditionals', topics: 'If, Elif, Else', time: '45 mins' },
          { id: '03', title: 'Loops', topics: 'For, While, Range', time: '55 mins' },
          { id: '04', title: 'Functions', topics: 'Definition, Parameters', time: '60 mins' },
          { id: '05', title: 'Collections', topics: 'Lists, Tuples, Dictionaries', time: '70 mins' },
        ],
        markdown: `# Python Programming Syllabus v2\n\n## Module 01: Variables & Types\n**Topics:** Strings, Numbers, Booleans\n**Duration:** 50 mins\n\n## Module 02: Conditionals\n**Topics:** If, Elif, Else\n**Duration:** 45 mins\n\n## Module 03: Loops\n**Topics:** For, While, Range\n**Duration:** 55 mins\n\n## Module 04: Functions\n**Topics:** Definition, Parameters\n**Duration:** 60 mins\n\n## Module 05: Collections\n**Topics:** Lists, Tuples, Dictionaries\n**Duration:** 70 mins`,
        review: {
          title: "Syllabus v2 Quality Assessment",
          summary: "Comprehensive 5-module syllabus with good coverage. Some pacing concerns with the extended module count.",
          metrics: [
            { name: "Groundedness", score: 8, maxScore: 10, description: "Most content supported by source materials", status: 'pass' as const },
            { name: "Faithfulness", score: 8, maxScore: 10, description: "Generally follows curriculum structure", status: 'pass' as const },
            { name: "Relevance", score: 9, maxScore: 10, description: "Topics relevant to learning objectives", status: 'pass' as const },
            { name: "Completeness", score: 9, maxScore: 10, description: "Very comprehensive topic coverage", status: 'pass' as const },
            { name: "Coherence", score: 7, maxScore: 10, description: "Some overlap between modules 2-3", status: 'warning' as const },
            { name: "Instruction Adherence", score: 8, maxScore: 10, description: "Follows most instruction parameters", status: 'pass' as const },
          ],
          strengths: [
            "Comprehensive coverage of Python basics",
            "Separate conditionals and loops modules allow deep dives",
            "Good time allocations per topic"
          ],
          improvements: [
            "Consider merging conditionals and loops for better flow",
            "Module 5 duration may be too long for beginners",
            "Add more practical exercises between modules"
          ],
          retrievedChunksUsed: 9,
          totalChunks: 12
        }
      },
      {
        id: 'py-v1',
        name: 'Python Basics v1',
        createdAt: '2026-02-03T10:00:00.000Z',
        modules: [
          { id: '01', title: 'Introduction', topics: 'What is Python, Setup', time: '20 mins' },
          { id: '02', title: 'Basic Syntax', topics: 'Variables, Operators', time: '40 mins' },
          { id: '03', title: 'Flow Control', topics: 'If, While, For', time: '50 mins' },
        ],
        markdown: `# Python Programming Syllabus v1\n\n## Module 01: Introduction\n**Topics:** What is Python, Setup\n**Duration:** 20 mins\n\n## Module 02: Basic Syntax\n**Topics:** Variables, Operators\n**Duration:** 40 mins\n\n## Module 03: Flow Control\n**Topics:** If, While, For\n**Duration:** 50 mins`,
        review: {
          title: "Syllabus v1 Quality Assessment",
          summary: "Initial draft syllabus with basic structure. Missing key topics and needs expansion for comprehensive learning.",
          metrics: [
            { name: "Groundedness", score: 7, maxScore: 10, description: "Limited use of available source materials", status: 'warning' as const },
            { name: "Faithfulness", score: 7, maxScore: 10, description: "Basic alignment with curriculum", status: 'warning' as const },
            { name: "Relevance", score: 8, maxScore: 10, description: "Core topics are relevant", status: 'pass' as const },
            { name: "Completeness", score: 5, maxScore: 10, description: "Missing functions and data structures", status: 'fail' as const },
            { name: "Coherence", score: 8, maxScore: 10, description: "Good logical flow for included content", status: 'pass' as const },
            { name: "Instruction Adherence", score: 6, maxScore: 10, description: "Partially meets instruction requirements", status: 'warning' as const },
          ],
          strengths: [
            "Simple, easy-to-follow structure",
            "Good introduction module",
            "Reasonable time allocations"
          ],
          improvements: [
            "Add functions module - critical for Python learning",
            "Include data structures (lists, dictionaries)",
            "Expand flow control to include more examples",
            "Add practical project or exercises"
          ],
          retrievedChunksUsed: 5,
          totalChunks: 12
        }
      }
    ]
  },
  {
    id: 'manual-005',
    type: 'manual',
    module: 'edu',
    moduleName: 'Educational Agents',
    createdAt: '2026-02-04T09:45:00.000Z',
    duration: '12m 08s',
    status: 'completed',
    messages: [],
    terminalData: {
      traceId: 'req_edu_002',
      orchestrationSteps: [
        {
          id: 'step-1',
          agent: '@SyllabusGen',
          agentColor: 'indigo',
          timestamp: '09:45:00.890',
          action: 'Syllabus Generation',
          details: 'Generated 5-module syllabus for JavaScript Fundamentals.'
        },
        {
          id: 'step-2',
          agent: '@Personalizer',
          agentColor: 'pink',
          timestamp: '09:45:04.220',
          action: 'Content Personalization',
          details: 'Adapted content for visual learner with gaming examples.'
        }
      ],
      metrics: {
        totalCost: '$0.072',
        latency: '11.5s',
        tokens: 2956,
        steps: 2
      },
      retrievalContext: []
    },
    syllabusVersions: [
      {
        id: 'js-v2',
        name: 'JavaScript Fundamentals v2 (Current)',
        createdAt: '2026-02-04T09:45:00.000Z',
        modules: [
          { id: '01', title: 'Variables & Data Types', topics: 'let, const, var, primitives', time: '40 mins' },
          { id: '02', title: 'Operators & Expressions', topics: 'Arithmetic, Comparison, Logical', time: '35 mins' },
          { id: '03', title: 'Control Flow', topics: 'if/else, switch, ternary', time: '45 mins' },
          { id: '04', title: 'Loops', topics: 'for, while, forEach, map', time: '50 mins' },
          { id: '05', title: 'Functions', topics: 'Declaration, Arrow, Callbacks', time: '60 mins' },
        ],
        markdown: `# JavaScript Fundamentals Syllabus v2\n\n## Module 01: Variables & Data Types\n**Topics:** let, const, var, primitives\n**Duration:** 40 mins\n\n## Module 02: Operators & Expressions\n**Topics:** Arithmetic, Comparison, Logical\n**Duration:** 35 mins\n\n## Module 03: Control Flow\n**Topics:** if/else, switch, ternary\n**Duration:** 45 mins\n\n## Module 04: Loops\n**Topics:** for, while, forEach, map\n**Duration:** 50 mins\n\n## Module 05: Functions\n**Topics:** Declaration, Arrow, Callbacks\n**Duration:** 60 mins`,
        review: {
          title: "JavaScript Syllabus v2 Quality Assessment",
          summary: "Well-structured syllabus with modern JavaScript practices. Excellent coverage of ES6+ features and functional programming concepts.",
          metrics: [
            { name: "Groundedness", score: 9, maxScore: 10, description: "Strong alignment with modern JS documentation", status: 'pass' as const },
            { name: "Faithfulness", score: 9, maxScore: 10, description: "Accurately reflects current best practices", status: 'pass' as const },
            { name: "Relevance", score: 10, maxScore: 10, description: "Highly relevant for modern web development", status: 'pass' as const },
            { name: "Completeness", score: 8, maxScore: 10, description: "Good coverage, could add DOM basics", status: 'pass' as const },
            { name: "Coherence", score: 9, maxScore: 10, description: "Logical progression through concepts", status: 'pass' as const },
            { name: "Instruction Adherence", score: 9, maxScore: 10, description: "Follows visual learner preferences well", status: 'pass' as const },
          ],
          strengths: [
            "Includes modern ES6+ syntax (arrow functions, let/const)",
            "Good balance of theory and practical application",
            "forEach and map in loops module shows functional approach",
            "Callbacks preparation for async programming"
          ],
          improvements: [
            "Consider adding basic DOM manipulation",
            "Could include brief intro to browser dev tools"
          ],
          retrievedChunksUsed: 7,
          totalChunks: 8
        }
      },
      {
        id: 'js-v1',
        name: 'JavaScript Fundamentals v1',
        createdAt: '2026-02-03T14:00:00.000Z',
        modules: [
          { id: '01', title: 'Intro to JS', topics: 'History, Setup, Console', time: '30 mins' },
          { id: '02', title: 'Variables', topics: 'var, let, const', time: '35 mins' },
          { id: '03', title: 'Data Types', topics: 'String, Number, Boolean, Array', time: '45 mins' },
          { id: '04', title: 'Functions Basics', topics: 'function keyword, parameters', time: '40 mins' },
        ],
        markdown: `# JavaScript Fundamentals Syllabus v1\n\n## Module 01: Intro to JS\n**Topics:** History, Setup, Console\n**Duration:** 30 mins\n\n## Module 02: Variables\n**Topics:** var, let, const\n**Duration:** 35 mins\n\n## Module 03: Data Types\n**Topics:** String, Number, Boolean, Array\n**Duration:** 45 mins\n\n## Module 04: Functions Basics\n**Topics:** function keyword, parameters\n**Duration:** 40 mins`,
        review: {
          title: "JavaScript Syllabus v1 Quality Assessment",
          summary: "Basic syllabus structure suitable for absolute beginners. Missing control flow and modern JS features.",
          metrics: [
            { name: "Groundedness", score: 7, maxScore: 10, description: "Uses basic source materials", status: 'warning' as const },
            { name: "Faithfulness", score: 7, maxScore: 10, description: "Covers traditional JS basics", status: 'warning' as const },
            { name: "Relevance", score: 7, maxScore: 10, description: "Relevant but dated approach", status: 'warning' as const },
            { name: "Completeness", score: 5, maxScore: 10, description: "Missing loops, conditionals, modern syntax", status: 'fail' as const },
            { name: "Coherence", score: 8, maxScore: 10, description: "Good flow for included content", status: 'pass' as const },
            { name: "Instruction Adherence", score: 6, maxScore: 10, description: "Limited visual learning elements", status: 'warning' as const },
          ],
          strengths: [
            "Good introduction to JavaScript history",
            "Covers variable declaration keywords",
            "Basic data types are well explained"
          ],
          improvements: [
            "Add control flow (if/else, loops) - essential",
            "Include arrow functions and modern syntax",
            "Add operators and expressions module",
            "Include more visual/gaming examples per learner profile"
          ],
          retrievedChunksUsed: 4,
          totalChunks: 8
        }
      }
    ]
  }
];

export const mockAutoRuns: AutoRun[] = [
  {
    id: 'auto-001',
    type: 'auto',
    testSetName: 'General Assistant V2',
    agentId: 'assistant',
    agentName: 'Assistant',
    subType: 'assistant-multi',
    createdAt: '2026-02-05T08:00:00.000Z',
    duration: '3m 42s',
    status: 'completed',
    passRate: 94,
    testCaseCount: 42,
    agentSettings: {
      model: 'gpt-4-turbo',
      temperature: 0.7,
      maxTokens: 4096,
      systemPrompt: 'You are a helpful assistant that provides accurate and concise responses.',
      tools: ['document_search', 'calculator', 'web_search']
    },
    metrics: [
      { name: 'Relevance', value: 9.2, threshold: 7.0, passed: true },
      { name: 'Coherence', value: 8.8, threshold: 7.5, passed: true },
      { name: 'Factuality', value: 9.1, threshold: 8.0, passed: true },
      { name: 'Response Time', value: 1.2, threshold: 2.0, passed: true }
    ],
    results: []
  },
  {
    id: 'auto-002',
    type: 'auto',
    testSetName: 'Invoices OCR Extraction',
    agentId: 'doc-pipeline',
    agentName: 'Document Pipeline',
    subType: 'docu-pipeline',
    createdAt: '2026-02-04T16:00:00.000Z',
    duration: '8m 15s',
    status: 'completed',
    passRate: 88,
    testCaseCount: 128,
    agentSettings: {
      model: 'gpt-4-vision',
      temperature: 0.2,
      maxTokens: 2048,
      systemPrompt: 'Extract structured data from documents with high accuracy.',
      tools: ['ocr_engine', 'entity_extractor', 'classifier']
    },
    metrics: [
      { name: 'OCR Accuracy', value: 9.4, threshold: 8.0, passed: true },
      { name: 'Entity Extraction', value: 8.6, threshold: 8.0, passed: true },
      { name: 'Classification', value: 9.1, threshold: 7.5, passed: true },
      { name: 'Processing Speed', value: 2.8, threshold: 3.0, passed: true }
    ],
    results: [
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
          "parties": "John Doe, Tech Global Inc",
          "start_date": "2024-03-01",
          "salary": "$120,000"
        }
      },
      {
        id: 2,
        title: "ID_Card_Scan_Front_DriverLic.jpg",
        status: "fail",
        fileType: "JPG",
        fileSize: "3.2 MB",
        metrics: [
          { name: "OCR Quality", value: 4.5 },
          { name: "Entity Extraction", value: 6.2 },
          { name: "Classification", value: 8.0 }
        ],
        extractedData: {
          "document_type": "id_card",
          "id_number": "D123**** (illegible)",
          "name": "Jane Sm*th",
          "expiry": null
        }
      }
    ]
  },
  {
    id: 'auto-003',
    type: 'auto',
    testSetName: 'Policy Retrieval (RAG)',
    agentId: 'assistant',
    agentName: 'Assistant',
    subType: 'assistant-single',
    createdAt: '2026-02-02T11:30:00.000Z',
    duration: '5m 28s',
    status: 'completed',
    passRate: 72,
    testCaseCount: 85,
    agentSettings: {
      model: 'gpt-4-turbo',
      temperature: 0.5,
      maxTokens: 4096,
      systemPrompt: 'You are a policy expert assistant that retrieves and explains company policies.',
      tools: ['policy_search', 'document_qa']
    },
    metrics: [
      { name: 'Retrieval Precision', value: 7.8, threshold: 8.0, passed: false },
      { name: 'Answer Accuracy', value: 7.2, threshold: 7.5, passed: false },
      { name: 'Citation Quality', value: 8.1, threshold: 7.0, passed: true },
      { name: 'Response Completeness', value: 6.9, threshold: 7.0, passed: false }
    ],
    results: []
  },
  {
    id: 'auto-004',
    type: 'auto',
    testSetName: 'Safety Guardrails',
    agentId: 'assistant',
    agentName: 'Assistant',
    subType: 'assistant-single',
    createdAt: '2026-01-31T09:00:00.000Z',
    duration: '12m 05s',
    status: 'completed',
    passRate: 99,
    testCaseCount: 210,
    agentSettings: {
      model: 'gpt-4-turbo',
      temperature: 0.3,
      maxTokens: 2048,
      systemPrompt: 'You are a safety-focused assistant that adheres to strict compliance guidelines.',
      tools: ['content_filter', 'safety_classifier']
    },
    metrics: [
      { name: 'Safety Compliance', value: 9.9, threshold: 9.5, passed: true },
      { name: 'Harmful Content Rejection', value: 10.0, threshold: 9.8, passed: true },
      { name: 'False Positive Rate', value: 0.8, threshold: 2.0, passed: true },
      { name: 'Response Appropriateness', value: 9.7, threshold: 9.0, passed: true }
    ],
    results: []
  }
];

// Combine and sort by date (most recent first)
export const mockRunHistory: RunHistoryEntry[] = [
  ...mockManualRuns,
  ...mockAutoRuns
].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

export const formatRelativeTime = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};
