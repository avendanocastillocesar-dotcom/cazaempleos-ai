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
  MessageSquare
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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white flex items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-blue-500/20 text-blue-300 border border-blue-400/30 text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> CV Adaptado a la Oferta
              </span>
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[11px] font-bold px-2 py-0.5 rounded-full">
                {tailoredCv.atsMatchPercentage || 95}% Match ATS
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-extrabold text-white">
              {job.title} en <span className="text-blue-400">{job.company}</span>
            </h3>
            <p className="text-xs text-slate-300">
              Curado con palabras clave y soluciones específicas para {job.platform}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation & Toolbar */}
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-2.5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setActiveTab('preview')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                activeTab === 'preview'
                  ? 'bg-white text-blue-700 shadow-xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Vista de Currículum ATS
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('interview')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                activeTab === 'interview'
                  ? 'bg-white text-blue-700 shadow-xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Argumentos para Entrevista
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('strategy')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                activeTab === 'strategy'
                  ? 'bg-white text-blue-700 shadow-xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Estrategia de Optimización
            </button>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyMarkdown}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 transition flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? '¡Copiado!' : 'Copiar Texto'}</span>
            </button>
            <button
              type="button"
              onClick={handleDownload}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 transition flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Descargar .MD</span>
            </button>
            <button
              type="button"
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white transition flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimir / Guardar PDF</span>
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 bg-slate-100">
          {activeTab === 'preview' && (
            <div id="printable-cv" className="bg-white rounded-xl shadow-xs border border-slate-200/80 p-8 max-w-3xl mx-auto space-y-6 text-slate-800">
              {/* CV Top Header */}
              <div className="border-b border-slate-200 pb-5">
                <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">
                  {candidateName}
                </h2>
                <p className="text-sm font-bold text-blue-700 mt-1">
                  {tailoredCv.tailoredHeadline}
                </p>
                <div className="flex flex-wrap gap-3 text-xs text-slate-500 mt-2">
                  <span>Alineado a vacante en {job.company}</span>
                  <span>•</span>
                  <span>{job.platform}</span>
                </div>
              </div>

              {/* Professional Profile tailored */}
              <div>
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-2">
                  Perfil Profesional
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {tailoredCv.tailoredSummary}
                </p>
              </div>

              {/* Top Matching Competencies */}
              <div>
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-2">
                  Competencias Clave Requeridas por {job.company}
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {(tailoredCv.topMatchingSkills || []).map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-md bg-blue-50 text-blue-800 text-xs font-semibold border border-blue-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tailored Experience */}
              <div>
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-3">
                  Experiencia Laboral Relevante
                </h4>
                <div className="space-y-4">
                  {(tailoredCv.targetedWorkHistory || []).map((exp, idx) => (
                    <div key={idx} className="space-y-1.5">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs">
                        <span className="font-bold text-slate-900 text-sm">{exp.role}</span>
                        <span className="text-slate-500 font-medium">{exp.company} | {exp.period}</span>
                      </div>
                      <ul className="space-y-1 pl-4 list-disc text-xs sm:text-sm text-slate-700">
                        {(exp.bulletPoints || []).map((bullet, bIdx) => (
                          <li key={bIdx} className="leading-relaxed">
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education & Languages */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-200 text-xs">
                <div>
                  <h4 className="font-extrabold uppercase tracking-wider text-slate-900 mb-1.5">
                    Educación & Formación
                  </h4>
                  {(tailoredCv.education || []).map((edu, idx) => (
                    <div key={idx} className="mb-1 text-slate-700">
                      <span className="font-bold">{edu.degree}</span> — {edu.institution} ({edu.year})
                    </div>
                  ))}
                </div>
                <div>
                  <h4 className="font-extrabold uppercase tracking-wider text-slate-900 mb-1.5">
                    Idiomas
                  </h4>
                  <p className="text-slate-700">{(tailoredCv.languages || []).join(' • ')}</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'interview' && (
            <div className="max-w-3xl mx-auto space-y-4">
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-amber-900 flex items-start gap-2.5">
                <HelpCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <p>
                  Utiliza estos 3 argumentos estratégicos durante tu entrevista técnica o con Recursos Humanos en <strong>{job.company}</strong> para demostrar cómo resuelves sus dolores actuales.
                </p>
              </div>

              <div className="space-y-3">
                {(tailoredCv.recommendedInterviewPoints || []).map((point, idx) => (
                  <div key={idx} className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs flex items-start gap-3">
                    <span className="w-7 h-7 rounded-lg bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <div>
                      <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                        Punto de Convicción {idx + 1}
                      </h5>
                      <p className="text-sm text-slate-800 leading-relaxed font-medium">
                        {point}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'strategy' && (
            <div className="max-w-3xl mx-auto bg-white rounded-xl p-6 border border-slate-200 shadow-xs space-y-4">
              <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Award className="w-5 h-5 text-indigo-600" />
                Diagnóstico Estratégico de la Adaptación
              </h4>
              <p className="text-sm text-slate-700 leading-relaxed bg-indigo-50/50 p-4 rounded-xl border border-indigo-100">
                {tailoredCv.strategySummary}
              </p>

              <div className="border-t border-slate-100 pt-4">
                <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Palabras Clave ATS Inyectadas Orgánicamente:
                </h5>
                <div className="flex flex-wrap gap-2">
                  {(tailoredCv.topMatchingSkills || []).map((k, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-medium flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      {k}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
