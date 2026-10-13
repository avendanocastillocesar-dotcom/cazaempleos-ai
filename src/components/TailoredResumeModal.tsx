import React, { useState } from 'react';
import {
  X,
  Printer,
  Copy,
  Check,
  Download,
  Sparkles,
  Award,
  CheckCircle2,
  Building,
  Briefcase,
  FileText,
  HelpCircle,
  MessageSquare,
  ExternalLink,
  Target
} from 'lucide-react';
import { JobPosting, TailoredResume } from '../types/job';

interface TailoredResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  job: JobPosting | null;
  tailoredCv: TailoredResume | null;
  candidateName: string;
}

export const TailoredResumeModal: React.FC<TailoredResumeModalProps> = ({
  isOpen,
  onClose,
  job,
  tailoredCv,
  candidateName,
}) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'preview' | 'interview' | 'strategy'>('preview');

  if (!isOpen || !job || !tailoredCv) return null;

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(tailoredCv.markdownCV || '');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const blob = new Blob([tailoredCv.markdownCV || ''], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `CV_Tailored_${job.company.replace(/\s+/g, '_')}_${candidateName.replace(/\s+/g, '_')}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 text-slate-100 w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-blue-950/80 via-slate-900 to-indigo-950/80 border-b border-slate-800 flex items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="bg-blue-500/20 text-blue-300 border border-blue-400/30 text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> CV Adaptado a la Oferta
              </span>
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full">
                {tailoredCv.atsMatchPercentage || 96}% Match ATS
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              {job.title} en <span className="text-blue-400">{job.company}</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Reestructurado para superar los filtros ATS y destacar soluciones para {job.platform}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation & Toolbar */}
        <div className="bg-slate-950/70 border-b border-slate-800/80 px-6 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800">
            <button
              type="button"
              onClick={() => setActiveTab('preview')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                activeTab === 'preview'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Vista Previa del CV
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('strategy')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                activeTab === 'strategy'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Estrategia ATS
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('interview')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                activeTab === 'interview'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Puntos para Entrevista
            </button>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyMarkdown}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-bold text-slate-200 transition flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? '¡Copiado!' : 'Copiar CV'}</span>
            </button>

            <button
              type="button"
              onClick={handleDownload}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-bold text-slate-200 transition flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Descargar .md</span>
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white transition flex items-center gap-1.5 cursor-pointer shadow-md shadow-blue-600/30"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimir / PDF</span>
            </button>
          </div>
        </div>

        {/* Modal Body Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {activeTab === 'preview' && (
            <div
              id="printable-cv"
              className="bg-slate-950 p-6 sm:p-8 rounded-2xl border border-slate-800 text-slate-200 font-sans leading-relaxed text-xs sm:text-sm whitespace-pre-wrap select-text"
            >
              {tailoredCv.markdownCV}
            </div>
          )}

          {activeTab === 'strategy' && (
            <div className="space-y-5">
              <div className="p-5 rounded-2xl bg-blue-950/20 border border-blue-800/30 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-blue-400 flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  Estrategia de Optimización de Palabras Clave
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {tailoredCv.strategySummary}
                </p>
              </div>

              <div className="space-y-2">
                <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Habilidades Clave Priorizadas para el Algoritmo ATS:
                </h5>
                <div className="flex flex-wrap gap-2">
                  {(tailoredCv.topMatchingSkills || []).map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-xl bg-slate-800 text-slate-200 text-xs font-medium border border-slate-700"
                    >
                      ✓ {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'interview' && (
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                Argumentos Recomendados para la Entrevista
              </h4>
              <div className="space-y-2.5">
                {(tailoredCv.recommendedInterviewPoints || []).map((point, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 text-xs sm:text-sm text-slate-300 flex items-start gap-3"
                  >
                    <span className="w-5 h-5 rounded-full bg-blue-600/20 text-blue-400 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <p className="leading-relaxed">{point}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
