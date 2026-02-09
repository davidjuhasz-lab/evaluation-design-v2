
import React from 'react';
import { Upload, Plus, Sliders, Download, Info, MoreHorizontal, Calendar, FileText, FileImage, Trash2, Tags, FileJson, Link2, ArrowLeftRight, GitCompare, CheckCircle2, X } from 'lucide-react';
import { TestSubType } from '../../../types';
import { docuPipelineFiles, linkedDocumentPairs } from '../data';

interface EditorViewProps {
    selectedSubType: TestSubType;
}

export const EditorView: React.FC<EditorViewProps> = ({ selectedSubType }) => {
     return (
        <div className="flex-1 overflow-y-auto p-8 bg-slate-50">
           <div className="flex items-center justify-between mb-6">
               <div className="flex gap-3">
                    {selectedSubType.startsWith('docu') ? (
                       <button className="bg-[#D2F948] hover:bg-[#c3ea3e] text-slate-900 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 shadow-sm"><Upload size={16} /> Bulk Upload</button>
                    ) : (
                       <button className="bg-[#D2F948] hover:bg-[#c3ea3e] text-slate-900 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 shadow-sm"><Plus size={16} /> Add Row</button>
                    )}
                    <button className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 shadow-sm">
                       <Sliders size={16} /> Configure Metrics
                    </button>
               </div>
               <button className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 shadow-sm"><Download size={16} /> Import</button>
           </div>
           
           {selectedSubType.startsWith('docu') ? (
               <div className="space-y-6">
                    {/* Drag and Drop Zone */}
                    <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 bg-slate-50/50 flex flex-col items-center justify-center hover:bg-white hover:border-sky-400 transition-all cursor-pointer group">
                        <div className="w-16 h-16 bg-sky-50 rounded-full flex items-center justify-center text-sky-500 mb-4 group-hover:scale-110 transition-transform"><Upload size={32} /></div>
                        <h3 className="text-lg font-bold text-slate-900">Drag & Drop Documents</h3>
                        <p className="text-sm text-slate-500 mt-1">Supports PDF, JPG, PNG, DOCX (Max 50MB)</p>
                    </div>
   
                    {/* File List */}
                    <div>
                       <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">Ready to Process ({docuPipelineFiles.length})</h4>
                       <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                           <table className="w-full text-sm text-left">
                               <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
                                   <tr>
                                       <th className="px-6 py-3 w-[40%]">File Name</th>
                                       <th className="px-6 py-3">Config & Ground Truth</th>
                                       <th className="px-6 py-3 w-[15%]">Size</th>
                                       <th className="px-6 py-3 text-right">Actions</th>
                                   </tr>
                               </thead>
                               <tbody className="divide-y divide-slate-100">
                                   {docuPipelineFiles.map((file, idx) => (
                                       <tr key={idx} className="hover:bg-slate-50">
                                           <td className="px-6 py-3">
                                                <div className="flex items-center gap-3">
                                                    {file.type.includes('pdf') ? <FileText size={18} className="text-rose-500" /> : file.type.includes('image') ? <FileImage size={18} className="text-blue-500" /> : <FileText size={18} className="text-blue-600" />}
                                                    <div className="flex flex-col">
                                                         <span className="font-medium text-slate-900">{file.name}</span>
                                                         <span className="text-[10px] text-slate-400 uppercase font-bold">{file.type.split('/')[1].toUpperCase()}</span>
                                                    </div>
                                                </div>
                                           </td>
                                           <td className="px-6 py-3">
                                               <div className="flex items-center gap-2">
                                                   {selectedSubType !== 'docu-bulk' && (
                                                       <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 hover:border-sky-300 hover:text-sky-600 text-slate-600 rounded-lg text-xs font-medium transition-colors shadow-sm">
                                                            <Tags size={14} />
                                                            Set Types
                                                       </button>
                                                   )}
                                                   <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 hover:border-emerald-300 hover:text-emerald-600 text-slate-600 rounded-lg text-xs font-medium transition-colors shadow-sm group relative">
                                                        <FileJson size={14} />
                                                        Upload Golden
                                                        {/* Tooltip hint */}
                                                        <span className="hidden group-hover:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-slate-800 text-white text-[10px] rounded whitespace-nowrap z-10 shadow-lg">Upload ground truth transcript for OCR eval</span>
                                                   </button>
                                               </div>
                                           </td>
                                           <td className="px-6 py-3 font-mono text-xs text-slate-500">{file.size}</td>
                                           <td className="px-6 py-3 text-right">
                                               <button className="text-slate-400 hover:text-rose-600 transition-colors"><Trash2 size={16} /></button>
                                           </td>
                                       </tr>
                                   ))}
                               </tbody>
                           </table>
                       </div>
                    </div>

                    {/* Cross-Check Document Links - Only for full pipeline */}
                    {selectedSubType === 'docu-pipeline' && (
                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wide flex items-center gap-2">
                                    <GitCompare size={14} />
                                    Cross-Check Document Links ({linkedDocumentPairs.length})
                                </h4>
                                <button className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 border border-indigo-200 hover:bg-indigo-100 text-indigo-700 rounded-lg text-xs font-medium transition-colors">
                                    <Link2 size={14} />
                                    Link Documents
                                </button>
                            </div>
                            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                                {linkedDocumentPairs.length > 0 ? (
                                    <div className="divide-y divide-slate-100">
                                        {linkedDocumentPairs.map((link) => (
                                            <div key={link.id} className="px-6 py-4 hover:bg-slate-50 transition-colors">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-4">
                                                        {/* Doc 1 */}
                                                        <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-lg border border-slate-200">
                                                            <FileText size={16} className="text-rose-500" />
                                                            <span className="text-sm font-medium text-slate-700 max-w-[180px] truncate">{link.doc1.name}</span>
                                                        </div>
                                                        
                                                        {/* Link indicator */}
                                                        <div className="flex flex-col items-center">
                                                            <ArrowLeftRight size={18} className="text-indigo-500" />
                                                            <span className={`text-[10px] font-bold uppercase mt-1 px-2 py-0.5 rounded ${
                                                                link.crossCheckType === 'version_compare' ? 'bg-purple-100 text-purple-700' :
                                                                link.crossCheckType === 'reference_verify' ? 'bg-blue-100 text-blue-700' :
                                                                'bg-amber-100 text-amber-700'
                                                            }`}>
                                                                {link.crossCheckType.replace('_', ' ')}
                                                            </span>
                                                        </div>
                                                        
                                                        {/* Doc 2 */}
                                                        <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-lg border border-slate-200">
                                                            <FileText size={16} className="text-rose-500" />
                                                            <span className="text-sm font-medium text-slate-700 max-w-[180px] truncate">{link.doc2.name}</span>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="flex items-center gap-3">
                                                        <span className="text-xs text-slate-500 max-w-[200px] truncate">{link.description}</span>
                                                        <button className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded transition-colors">
                                                            <X size={16} />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="px-6 py-8 text-center">
                                        <Link2 size={32} className="mx-auto text-slate-300 mb-3" />
                                        <p className="text-sm text-slate-500">No documents linked for cross-checking</p>
                                        <p className="text-xs text-slate-400 mt-1">Link documents to compare versions or verify data consistency</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
               </div>
           ) : (
               <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                    <table className="w-full text-sm text-left">
                       <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
                           <tr><th className="px-6 py-3">Question</th><th className="px-6 py-3">Expected Answer</th><th className="px-6 py-3 text-right">Actions</th></tr>
                       </thead>
                       <tbody className="divide-y divide-slate-100">
                           <tr><td className="px-6 py-4">Summarize Q4 revenue.</td><td className="px-6 py-4 text-slate-500">Revenue was $4.2M, beating projections.</td><td className="px-6 py-4 text-right"><MoreHorizontal size={16} className="ml-auto text-slate-400" /></td></tr>
                       </tbody>
                    </table>
               </div>
           )}
        </div>
     );
};
