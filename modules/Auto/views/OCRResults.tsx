
import React, { useState } from 'react';
import { ChevronLeft, ChevronDown, ChevronRight, FileText, CheckCircle2, AlertTriangle, XCircle, Download, Eye } from 'lucide-react';
import { AutoState } from '../../../types';
import { PrimaryButton } from '../../../components/Shared';

interface OCRWord {
  text: string;
  confidence: number;
  isCorrect?: boolean; // If golden was uploaded
}

interface OCRLine {
  words: OCRWord[];
}

interface OCRDocumentResult {
  fileName: string;
  fileType: string;
  pageCount: number;
  overallAccuracy?: number; // Only if golden was uploaded
  lines: OCRLine[];
}

// Mock OCR results data
const mockOCRResults: OCRDocumentResult[] = [
  {
    fileName: 'invoice_2024_001.pdf',
    fileType: 'PDF',
    pageCount: 1,
    overallAccuracy: 94.2,
    lines: [
      { words: [
        { text: 'INVOICE', confidence: 0.99, isCorrect: true },
        { text: '#2024-001', confidence: 0.97, isCorrect: true },
      ]},
      { words: [
        { text: 'Date:', confidence: 0.98, isCorrect: true },
        { text: 'January', confidence: 0.95, isCorrect: true },
        { text: '15,', confidence: 0.92, isCorrect: true },
        { text: '2024', confidence: 0.99, isCorrect: true },
      ]},
      { words: [
        { text: 'Bill', confidence: 0.96, isCorrect: true },
        { text: 'To:', confidence: 0.94, isCorrect: true },
        { text: 'Acme', confidence: 0.88, isCorrect: true },
        { text: 'Corporation', confidence: 0.72, isCorrect: false },
      ]},
      { words: [
        { text: 'Address:', confidence: 0.91, isCorrect: true },
        { text: '123', confidence: 0.97, isCorrect: true },
        { text: 'Main', confidence: 0.89, isCorrect: true },
        { text: 'Street', confidence: 0.93, isCorrect: true },
      ]},
      { words: [
        { text: 'City:', confidence: 0.95, isCorrect: true },
        { text: 'New', confidence: 0.98, isCorrect: true },
        { text: 'York,', confidence: 0.85, isCorrect: true },
        { text: 'NY', confidence: 0.99, isCorrect: true },
        { text: '10001', confidence: 0.91, isCorrect: true },
      ]},
      { words: [
        { text: 'Item', confidence: 0.97, isCorrect: true },
        { text: 'Description', confidence: 0.94, isCorrect: true },
        { text: 'Qty', confidence: 0.96, isCorrect: true },
        { text: 'Price', confidence: 0.98, isCorrect: true },
        { text: 'Total', confidence: 0.99, isCorrect: true },
      ]},
      { words: [
        { text: 'Widget', confidence: 0.87, isCorrect: true },
        { text: 'Pro', confidence: 0.92, isCorrect: true },
        { text: 'X1', confidence: 0.65, isCorrect: false },
        { text: '10', confidence: 0.99, isCorrect: true },
        { text: '$49.99', confidence: 0.94, isCorrect: true },
        { text: '$499.90', confidence: 0.91, isCorrect: true },
      ]},
      { words: [
        { text: 'Service', confidence: 0.96, isCorrect: true },
        { text: 'Fee', confidence: 0.98, isCorrect: true },
        { text: '1', confidence: 0.99, isCorrect: true },
        { text: '$150.00', confidence: 0.97, isCorrect: true },
        { text: '$150.00', confidence: 0.97, isCorrect: true },
      ]},
      { words: [
        { text: 'Subtotal:', confidence: 0.95, isCorrect: true },
        { text: '$649.90', confidence: 0.88, isCorrect: true },
      ]},
      { words: [
        { text: 'Tax', confidence: 0.97, isCorrect: true },
        { text: '(8%):', confidence: 0.78, isCorrect: false },
        { text: '$51.99', confidence: 0.82, isCorrect: true },
      ]},
      { words: [
        { text: 'TOTAL:', confidence: 0.99, isCorrect: true },
        { text: '$701.89', confidence: 0.96, isCorrect: true },
      ]},
    ]
  },
  {
    fileName: 'receipt_scan_042.jpg',
    fileType: 'JPG',
    pageCount: 1,
    overallAccuracy: 87.5,
    lines: [
      { words: [
        { text: 'GROCERY', confidence: 0.94, isCorrect: true },
        { text: 'MART', confidence: 0.91, isCorrect: true },
      ]},
      { words: [
        { text: 'Store', confidence: 0.89, isCorrect: true },
        { text: '#:', confidence: 0.72, isCorrect: false },
        { text: '4521', confidence: 0.95, isCorrect: true },
      ]},
      { words: [
        { text: 'Date:', confidence: 0.97, isCorrect: true },
        { text: '02/14/2024', confidence: 0.68, isCorrect: false },
      ]},
      { words: [
        { text: 'Milk', confidence: 0.96, isCorrect: true },
        { text: '2%', confidence: 0.74, isCorrect: true },
        { text: '$4.99', confidence: 0.92, isCorrect: true },
      ]},
      { words: [
        { text: 'Bread', confidence: 0.98, isCorrect: true },
        { text: 'Whole', confidence: 0.85, isCorrect: true },
        { text: 'Wheat', confidence: 0.81, isCorrect: true },
        { text: '$3.49', confidence: 0.93, isCorrect: true },
      ]},
      { words: [
        { text: 'Eggs', confidence: 0.99, isCorrect: true },
        { text: 'Large', confidence: 0.87, isCorrect: true },
        { text: 'Doz', confidence: 0.62, isCorrect: false },
        { text: '$5.99', confidence: 0.91, isCorrect: true },
      ]},
      { words: [
        { text: 'Total:', confidence: 0.96, isCorrect: true },
        { text: '$14.47', confidence: 0.89, isCorrect: true },
      ]},
    ]
  },
  {
    fileName: 'contract_draft_v2.pdf',
    fileType: 'PDF',
    pageCount: 3,
    overallAccuracy: 96.8,
    lines: [
      { words: [
        { text: 'SERVICE', confidence: 0.99, isCorrect: true },
        { text: 'AGREEMENT', confidence: 0.98, isCorrect: true },
      ]},
      { words: [
        { text: 'This', confidence: 0.99, isCorrect: true },
        { text: 'Agreement', confidence: 0.97, isCorrect: true },
        { text: 'is', confidence: 0.99, isCorrect: true },
        { text: 'entered', confidence: 0.96, isCorrect: true },
        { text: 'into', confidence: 0.98, isCorrect: true },
        { text: 'as', confidence: 0.99, isCorrect: true },
        { text: 'of', confidence: 0.99, isCorrect: true },
      ]},
      { words: [
        { text: 'the', confidence: 0.99, isCorrect: true },
        { text: 'date', confidence: 0.98, isCorrect: true },
        { text: 'set', confidence: 0.97, isCorrect: true },
        { text: 'forth', confidence: 0.95, isCorrect: true },
        { text: 'below', confidence: 0.96, isCorrect: true },
      ]},
    ]
  }
];

interface OCRResultsViewProps {
  setViewState: (view: AutoState) => void;
  hasGoldens?: boolean;
  onBackToHistory?: () => void;
}

const getConfidenceColor = (confidence: number) => {
  if (confidence >= 0.9) return 'bg-emerald-100 text-emerald-800 border-emerald-200';
  if (confidence >= 0.75) return 'bg-amber-100 text-amber-800 border-amber-200';
  return 'bg-red-100 text-red-800 border-red-200';
};

const getConfidenceHoverColor = (confidence: number) => {
  if (confidence >= 0.9) return 'hover:bg-emerald-200';
  if (confidence >= 0.75) return 'hover:bg-amber-200';
  return 'hover:bg-red-200';
};

const getAccuracyColor = (accuracy: number) => {
  if (accuracy >= 90) return 'text-emerald-600 bg-emerald-50 border-emerald-200';
  if (accuracy >= 75) return 'text-amber-600 bg-amber-50 border-amber-200';
  return 'text-red-600 bg-red-50 border-red-200';
};

const getAccuracyIcon = (accuracy: number) => {
  if (accuracy >= 90) return CheckCircle2;
  if (accuracy >= 75) return AlertTriangle;
  return XCircle;
};

export const OCRResultsView: React.FC<OCRResultsViewProps> = ({ setViewState, hasGoldens = true, onBackToHistory }) => {
  const [expandedDoc, setExpandedDoc] = useState<number>(0);
  
  // Calculate overall accuracy across all documents
  const overallAccuracy = hasGoldens 
    ? mockOCRResults.reduce((acc, doc) => acc + (doc.overallAccuracy || 0), 0) / mockOCRResults.length
    : null;
  
  const AccuracyIcon = overallAccuracy ? getAccuracyIcon(overallAccuracy) : CheckCircle2;

  return (
    <div className="flex flex-col h-full bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between flex-shrink-0 shadow-sm z-10">
        <div className="flex items-center gap-4">
          <button onClick={() => setViewState('editor')} className="w-8 h-8 flex items-center justify-center hover:bg-slate-100 rounded-full transition-colors">
            <ChevronLeft size={20} className="text-slate-500" />
          </button>
          <div>
            <h2 className="text-lg font-bold text-slate-900">OCR Evaluation Results</h2>
            <div className="text-xs text-slate-500 flex items-center gap-2">
              <span>{mockOCRResults.length} documents processed</span>
              <span className="text-slate-300">|</span>
              <span>Completed just now</span>
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-lg text-sm font-medium transition-colors border border-slate-200 flex items-center gap-2">
            <Download size={16} /> Export Report
          </button>
          <PrimaryButton onClick={() => onBackToHistory ? onBackToHistory() : setViewState('list')}>Back to Dashboard</PrimaryButton>
        </div>
      </div>

      {/* Overall Accuracy Banner */}
      {hasGoldens && overallAccuracy !== null && (
        <div className={`mx-8 mt-6 p-6 rounded-2xl border-2 ${getAccuracyColor(overallAccuracy)} flex items-center justify-between`}>
          <div className="flex items-center gap-4">
            <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${overallAccuracy >= 90 ? 'bg-emerald-100' : overallAccuracy >= 75 ? 'bg-amber-100' : 'bg-red-100'}`}>
              <AccuracyIcon size={32} className={overallAccuracy >= 90 ? 'text-emerald-600' : overallAccuracy >= 75 ? 'text-amber-600' : 'text-red-600'} />
            </div>
            <div>
              <div className="text-sm font-medium text-slate-500">Overall OCR Accuracy (vs Golden)</div>
              <div className={`text-4xl font-bold ${overallAccuracy >= 90 ? 'text-emerald-600' : overallAccuracy >= 75 ? 'text-amber-600' : 'text-red-600'}`}>
                {overallAccuracy.toFixed(1)}%
              </div>
            </div>
          </div>
          <div className="flex gap-6 text-sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-900">{mockOCRResults.length}</div>
              <div className="text-slate-500">Documents</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600">{mockOCRResults.filter(d => (d.overallAccuracy || 0) >= 90).length}</div>
              <div className="text-slate-500">High Confidence</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-600">{mockOCRResults.filter(d => (d.overallAccuracy || 0) >= 75 && (d.overallAccuracy || 0) < 90).length}</div>
              <div className="text-slate-500">Medium</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{mockOCRResults.filter(d => (d.overallAccuracy || 0) < 75).length}</div>
              <div className="text-slate-500">Low</div>
            </div>
          </div>
        </div>
      )}

      {/* Document Results */}
      <div className="flex-1 overflow-y-auto p-8 pt-4">
        <div className="space-y-4">
          {mockOCRResults.map((doc, idx) => (
            <div key={idx} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
              {/* Document Header */}
              <button 
                onClick={() => setExpandedDoc(expandedDoc === idx ? -1 : idx)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${doc.fileType === 'PDF' ? 'bg-rose-50 text-rose-500' : 'bg-blue-50 text-blue-500'}`}>
                    <FileText size={20} />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-slate-900">{doc.fileName}</h3>
                    <div className="text-xs text-slate-500 flex items-center gap-2">
                      <span className="uppercase font-medium">{doc.fileType}</span>
                      <span>•</span>
                      <span>{doc.pageCount} page{doc.pageCount > 1 ? 's' : ''}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  {hasGoldens && doc.overallAccuracy !== undefined && (
                    <div className={`px-4 py-2 rounded-lg font-bold text-lg ${getAccuracyColor(doc.overallAccuracy)}`}>
                      {doc.overallAccuracy.toFixed(1)}%
                    </div>
                  )}
                  {expandedDoc === idx ? <ChevronDown size={20} className="text-slate-400" /> : <ChevronRight size={20} className="text-slate-400" />}
                </div>
              </button>

              {/* Expanded Content - PDF + OCR Side by Side */}
              {expandedDoc === idx && (
                <div className="border-t border-slate-200">
                  <div className="grid grid-cols-2 divide-x divide-slate-200">
                    {/* Left: PDF Preview */}
                    <div className="p-6 bg-slate-50">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-sm font-bold text-slate-700">Original Document</h4>
                        <button className="text-xs text-slate-500 hover:text-slate-700 flex items-center gap-1">
                          <Eye size={14} /> Full View
                        </button>
                      </div>
                      <div className="bg-white border border-slate-200 rounded-lg aspect-[8.5/11] flex items-center justify-center shadow-inner">
                        {/* Simulated PDF preview */}
                        <div className="w-full h-full p-8 text-xs text-slate-400 font-mono leading-relaxed overflow-hidden">
                          <div className="text-center text-slate-600 font-bold text-lg mb-4">
                            {doc.fileName.includes('invoice') ? 'INVOICE #2024-001' : doc.fileName.includes('receipt') ? 'GROCERY MART' : 'SERVICE AGREEMENT'}
                          </div>
                          <div className="space-y-1 text-slate-500">
                            {doc.lines.slice(0, 8).map((line, lineIdx) => (
                              <div key={lineIdx} className="text-[10px]">
                                {line.words.map(w => w.text).join(' ')}
                              </div>
                            ))}
                            {doc.lines.length > 8 && (
                              <div className="text-center text-slate-400 mt-4">...</div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right: OCR Results with Confidence Highlighting */}
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-sm font-bold text-slate-700">OCR Extracted Text</h4>
                        <div className="flex items-center gap-3 text-xs">
                          <span className="flex items-center gap-1">
                            <span className="w-3 h-3 rounded bg-emerald-100 border border-emerald-200"></span>
                            High (≥90%)
                          </span>
                          <span className="flex items-center gap-1">
                            <span className="w-3 h-3 rounded bg-amber-100 border border-amber-200"></span>
                            Medium (75-90%)
                          </span>
                          <span className="flex items-center gap-1">
                            <span className="w-3 h-3 rounded bg-red-100 border border-red-200"></span>
                            Low (&lt;75%)
                          </span>
                        </div>
                      </div>
                      <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 min-h-[400px] max-h-[500px] overflow-y-auto">
                        <div className="space-y-2 font-mono text-sm leading-relaxed">
                          {doc.lines.map((line, lineIdx) => (
                            <div key={lineIdx} className="flex flex-wrap gap-1">
                              {line.words.map((word, wordIdx) => (
                                <span 
                                  key={wordIdx}
                                  className={`relative px-1.5 py-0.5 rounded border cursor-default transition-colors group ${getConfidenceColor(word.confidence)} ${getConfidenceHoverColor(word.confidence)}`}
                                >
                                  {word.text}
                                  {/* Tooltip with exact confidence */}
                                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-slate-800 text-white text-[10px] rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-20 pointer-events-none shadow-lg">
                                    Confidence: {(word.confidence * 100).toFixed(1)}%
                                    {hasGoldens && word.isCorrect !== undefined && (
                                      <span className={`ml-2 ${word.isCorrect ? 'text-emerald-400' : 'text-red-400'}`}>
                                        {word.isCorrect ? '✓ Correct' : '✗ Mismatch'}
                                      </span>
                                    )}
                                  </span>
                                </span>
                              ))}
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Word Stats */}
                      <div className="mt-4 grid grid-cols-3 gap-3">
                        <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-3 text-center">
                          <div className="text-lg font-bold text-emerald-600">
                            {doc.lines.flatMap(l => l.words).filter(w => w.confidence >= 0.9).length}
                          </div>
                          <div className="text-xs text-emerald-700">High Confidence</div>
                        </div>
                        <div className="bg-amber-50 border border-amber-100 rounded-lg p-3 text-center">
                          <div className="text-lg font-bold text-amber-600">
                            {doc.lines.flatMap(l => l.words).filter(w => w.confidence >= 0.75 && w.confidence < 0.9).length}
                          </div>
                          <div className="text-xs text-amber-700">Medium Confidence</div>
                        </div>
                        <div className="bg-red-50 border border-red-100 rounded-lg p-3 text-center">
                          <div className="text-lg font-bold text-red-600">
                            {doc.lines.flatMap(l => l.words).filter(w => w.confidence < 0.75).length}
                          </div>
                          <div className="text-xs text-red-700">Low Confidence</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
