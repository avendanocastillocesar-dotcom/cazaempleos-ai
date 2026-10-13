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
  ArrowRight,
  ShieldCheck,
  Star
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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 text-slate-100 w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-indigo-950/80 via-slate-900 to-purple-950/80 border-b border-slate-800 flex items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="bg-amber-500/20 text-amber-300 border border-amber-400/30 text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full flex items-center gap-1.5">
                <Flame className="w-3 h-3 text-amber-400" /> Pitch de Ventas de Alta Conversión
              </span>
              <span className="bg-blue-500/20 text-blue-300 border border-blue-400/30 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full">
                {job.platform}
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              {salesPitch.catchyHeadline}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Enfocado en resolver los problemas de <strong>{job.company}</strong> para el puesto de <strong>{job.title}</strong>
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

        {/* Tab Selector */}
        <div className="bg-slate-950/70 border-b border-slate-800/80 px-6 py-3 flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800">
            <button
              type="button"
              onClick={() => setActiveTab('application')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'application'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Send className="w-3.5 h-3.5" />
              <span>Mensaje de Postulación</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('elevator')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'elevator'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Elevator Pitch</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('matrix')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'matrix'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Target className="w-3.5 h-3.5" />
              <span>Matriz de Solución</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('inmail')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'inmail'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>LinkedIn InMail</span>
            </button>
          </div>
        </div>

        {/* Tab Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* Tab 1: Application message */}
          {activeTab === 'application' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">Carta / Mensaje de Postulación</h4>
                  <p className="text-xs text-slate-400">
                    Ideal para pegar en la casilla de presentación de Indeed, Computrabajo o bolsas de empleo.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(salesPitch.applicationMessage, 'app')}
                  className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white transition flex items-center gap-1.5 cursor-pointer shadow-md shadow-blue-600/30"
                >
                  {copiedKey === 'app' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'app' ? '¡Copiado!' : 'Copiar Mensaje'}</span>
                </button>
              </div>

              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 text-slate-200 text-xs sm:text-sm font-sans leading-relaxed whitespace-pre-wrap select-text">
                {salesPitch.applicationMessage}
              </div>

              {salesPitch.callToAction && (
                <div className="p-4 rounded-2xl bg-blue-950/30 border border-blue-800/40 text-xs text-blue-300 flex items-start gap-2.5">
                  <PhoneCall className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Llamada a la acción recomendada:</span>
                    <p className="mt-0.5 text-slate-300">{salesPitch.callToAction}</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Tab 2: Elevator Pitch */}
          {activeTab === 'elevator' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">Pitch Rápido de 30 Segundos</h4>
                  <p className="text-xs text-slate-400">
                    Tu respuesta contundente para cuando el reclutador te pregunte: "¿Por qué deberíamos contratarte?".
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(salesPitch.elevatorPitch, 'pitch')}
                  className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white transition flex items-center gap-1.5 cursor-pointer shadow-md shadow-blue-600/30"
                >
                  {copiedKey === 'pitch' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'pitch' ? '¡Copiado!' : 'Copiar Pitch'}</span>
                </button>
              </div>

              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 text-slate-200 text-sm sm:text-base font-medium leading-relaxed italic select-text">
                "{salesPitch.elevatorPitch}"
              </div>

              {salesPitch.whyMeOver100Applicants && salesPitch.whyMeOver100Applicants.length > 0 && (
                <div className="space-y-2 pt-2">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Star className="w-4 h-4 text-amber-400" />
                    ¿Por qué elegirme sobre los otros candidatos?
                  </h5>
                  <div className="grid grid-cols-1 gap-2">
                    {salesPitch.whyMeOver100Applicants.map((reason, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300 flex items-start gap-2.5"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{reason}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Tab 3: Matrix */}
          {activeTab === 'matrix' && (
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-bold text-white">Matriz de Solución de Dolores Empresariales</h4>
                <p className="text-xs text-slate-400">
                  Desglose exacto de los retos que enfrenta <strong>{job.company}</strong> y tu propuesta de solución.
                </p>
              </div>

              <div className="space-y-3">
                {(salesPitch.painPointSolutions || []).map((sol, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3"
                  >
                    <div className="flex items-start gap-2.5">
                      <span className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-300 text-xs font-bold flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block">
                          Reto / Dolor de la Empresa
                        </span>
                        <h5 className="text-sm font-bold text-white">{sol.painPoint}</h5>
                      </div>
                    </div>

                    <div className="pl-8 space-y-2">
                      <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
                        <strong className="text-blue-300 block mb-0.5">Cómo lo resuelves:</strong>
                        {sol.howCandidateSolvesIt}
                      </div>

                      <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300">
                        <strong className="block mb-0.5">Impacto esperado:</strong>
                        {sol.expectedImpact}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 4: InMail */}
          {activeTab === 'inmail' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">Mensaje Directo para Reclutador (LinkedIn InMail)</h4>
                  <p className="text-xs text-slate-400">
                    Mensaje corto y contundente para contactar al hiring manager o recruiter por chat.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(salesPitch.inmailMessage || salesPitch.applicationMessage, 'inmail')}
                  className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white transition flex items-center gap-1.5 cursor-pointer shadow-md shadow-blue-600/30"
                >
                  {copiedKey === 'inmail' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'inmail' ? '¡Copiado!' : 'Copiar InMail'}</span>
                </button>
              </div>

              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 text-slate-200 text-xs sm:text-sm font-sans leading-relaxed whitespace-pre-wrap select-text">
                {salesPitch.inmailMessage || salesPitch.applicationMessage}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
