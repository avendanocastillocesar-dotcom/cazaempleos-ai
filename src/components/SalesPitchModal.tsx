import React, { useState } from 'react';
import {
  X,
  Copy,
  Check,
  Zap,
  Target,
  Sparkles,
  TrendingUp,
  MessageSquare,
  Send,
  Building,
  CheckCircle2,
  PhoneCall,
  Flame,
  ArrowRight
} from 'lucide-react';
import { JobPosting, SalesPitch } from '../types/job';

interface SalesPitchModalProps {
  isOpen: boolean;
  onClose: () => void;
  job: JobPosting | null;
  salesPitch: SalesPitch | null;
  candidateName: string;
}

export const SalesPitchModal: React.FC<SalesPitchModalProps> = ({
  isOpen,
  onClose,
  job,
  salesPitch,
  candidateName,
}) => {
  const [activeTab, setActiveTab] = useState<'application' | 'elevator' | 'matrix' | 'inmail'>('application');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen || !job || !salesPitch) return null;

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-950 text-white flex items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="bg-amber-400/20 text-amber-300 border border-amber-300/30 text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-amber-400" /> Pitch de Ventas de Alta Conversión
              </span>
              <span className="bg-blue-400/20 text-blue-200 border border-blue-300/30 text-[11px] font-bold px-2 py-0.5 rounded-full">
                {job.platform}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              {salesPitch.catchyHeadline}
            </h3>
            <p className="text-xs text-blue-200 mt-1">
              Enfocado en resolver los problemas de <strong>{job.company}</strong> para el puesto de <strong>{job.title}</strong>
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-2.5 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setActiveTab('application')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'application'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Send className="w-3.5 h-3.5" />
              <span>Mensaje para Indeed / Computrabajo</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('elevator')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'elevator'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-200'
              }`}
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Elevator Pitch 60s</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('matrix')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'matrix'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Target className="w-3.5 h-3.5" />
              <span>Matriz Dolor vs Solución</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('inmail')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'inmail'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-200'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>LinkedIn InMail Directo</span>
            </button>
          </div>

          <span className="text-[11px] font-semibold text-slate-500 hidden md:block">
            🎯 Orientado a ROI y solución de problemas
          </span>
        </div>

        {/* Tab Contents */}
        <div className="p-6 overflow-y-auto flex-1 bg-slate-50/70 space-y-6">
          {/* TAB 1: Mensaje de Postulación para la Casilla de Indeed/Computrabajo */}
          {activeTab === 'application' && (
            <div className="space-y-4 max-w-3xl mx-auto">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start justify-between gap-3">
                <div>
                  <h4 className="text-xs font-bold text-blue-900 uppercase tracking-wider mb-1">
                    Copia y pega este texto en la casilla de postulación
                  </h4>
                  <p className="text-xs text-blue-700">
                    Diseñado con psicología de ventas: Gancho magnético + Diagnóstico del problema + Tu solución comprobada + Llamado a la acción para agendar entrevista.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(salesPitch.applicationMessage, 'appMessage')}
                  className="px-3.5 py-2 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white transition flex items-center gap-1.5 shadow-xs cursor-pointer shrink-0"
                >
                  {copiedKey === 'appMessage' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedKey === 'appMessage' ? '¡Copiado!' : 'Copiar Mensaje'}</span>
                </button>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs whitespace-pre-wrap text-xs sm:text-sm text-slate-800 leading-relaxed font-sans">
                {salesPitch.applicationMessage}
              </div>

              {/* Differentiators */}
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
                <h5 className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                  ¿Por qué tú frente a otros 100 candidatos postulantes?
                </h5>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                  {(salesPitch.whyMeOver100Applicants || []).map((reason, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* TAB 2: Elevator Pitch 60 Segundos */}
          {activeTab === 'elevator' && (
            <div className="space-y-4 max-w-3xl mx-auto">
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start justify-between gap-3">
                <div>
                  <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider mb-1">
                    Pitch Verbal para Llamada o Primeros 60 Segundos
                  </h4>
                  <p className="text-xs text-amber-800">
                    La respuesta perfecta y vendedora cuando el entrevistador diga: <em>"Háblame de ti y por qué quieres trabajar con nosotros"</em>.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(salesPitch.elevatorPitch, 'elevator')}
                  className="px-3.5 py-2 rounded-lg text-xs font-bold bg-amber-600 hover:bg-amber-700 text-white transition flex items-center gap-1.5 shadow-xs cursor-pointer shrink-0"
                >
                  {copiedKey === 'elevator' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedKey === 'elevator' ? '¡Copiado!' : 'Copiar Pitch'}</span>
                </button>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs text-sm text-slate-800 leading-relaxed font-medium italic border-l-4 border-l-amber-500">
                "{salesPitch.elevatorPitch}"
              </div>

              <div className="bg-slate-100 p-4 rounded-xl border border-slate-200 text-xs text-slate-600">
                <span className="font-bold text-slate-900">Consejo de persuasión:</span> Enfatiza el tono con seguridad y pausa tras plantear cómo has resuelto en el pasado el mismo reto que hoy tiene {job.company}.
              </div>
            </div>
          )}

          {/* TAB 3: Matriz Dolor vs Solución */}
          {activeTab === 'matrix' && (
            <div className="space-y-4 max-w-3xl mx-auto">
              <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4">
                <h4 className="text-xs font-bold text-indigo-900 uppercase tracking-wider mb-1">
                  Mapeo de Dolor del Empleador vs Tu Solución Concreta
                </h4>
                <p className="text-xs text-indigo-700">
                  En lugar de listar funciones, este desglose demuestra punto por punto cómo cada requerimiento clave de la vacante es resuelto por tu experiencia.
                </p>
              </div>

              <div className="space-y-3">
                {(salesPitch.painPointSolutions || []).map((item, idx) => (
                  <div key={idx} className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs space-y-3">
                    <div className="flex items-start gap-2">
                      <span className="px-2 py-0.5 rounded-md bg-rose-100 text-rose-800 text-[11px] font-bold shrink-0">
                        Dolor {idx + 1}
                      </span>
                      <p className="text-xs sm:text-sm font-bold text-slate-900">
                        {item.painPoint}
                      </p>
                    </div>

                    <div className="pl-4 border-l-2 border-emerald-400 space-y-1">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Cómo lo resuelves tú:</span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                        {item.howCandidateSolvesIt}
                      </p>
                    </div>

                    {item.expectedImpact && (
                      <div className="bg-slate-50 px-3 py-1.5 rounded-lg text-xs text-slate-600 flex items-center gap-1.5">
                        <span className="font-semibold text-slate-800">Impacto esperado:</span>
                        <span>{item.expectedImpact}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: LinkedIn InMail Directo */}
          {activeTab === 'inmail' && (
            <div className="space-y-4 max-w-3xl mx-auto">
              <div className="bg-sky-50 border border-sky-200 rounded-xl p-4 flex items-start justify-between gap-3">
                <div>
                  <h4 className="text-xs font-bold text-sky-900 uppercase tracking-wider mb-1">
                    Mensaje Corto para Reclutador o Líder en LinkedIn
                  </h4>
                  <p className="text-xs text-sky-800">
                    Formato conciso (menos de 150 palabras) ideal para contactar al Hiring Manager directamente y saltarse la cola de postulantes.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(salesPitch.inmailMessage, 'inmail')}
                  className="px-3.5 py-2 rounded-lg text-xs font-bold bg-sky-600 hover:bg-sky-700 text-white transition flex items-center gap-1.5 shadow-xs cursor-pointer shrink-0"
                >
                  {copiedKey === 'inmail' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedKey === 'inmail' ? '¡Copiado!' : 'Copiar InMail'}</span>
                </button>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs whitespace-pre-wrap text-xs sm:text-sm text-slate-800 leading-relaxed font-sans">
                {salesPitch.inmailMessage}
              </div>

              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-xs text-emerald-900">
                <span className="font-bold">Cierre de Ventas incluido: </span>
                <span>{salesPitch.callToAction}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
