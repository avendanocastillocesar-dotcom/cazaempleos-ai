import React from 'react';
import {
  Briefcase,
  Sparkles,
  LogIn,
  LogOut,
  Cloud,
  CheckCircle2,
  Layers,
  Search,
  FileCheck2,
  Send,
  Zap,
  ShieldCheck
} from 'lucide-react';
import { User } from 'firebase/auth';

interface HeaderProps {
  currentStep: number;
  user: User | null;
  onSignIn: () => void;
  onSignOut: () => void;
  onOpenGoogleSync: () => void;
  isSyncing?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentStep,
  user,
  onSignIn,
  onSignOut,
  onOpenGoogleSync,
  isSyncing = false,
}) => {
  const steps = [
    { number: 1, label: 'Subir CV', icon: FileCheck2 },
    { number: 2, label: 'Análisis ATS', icon: Layers },
    { number: 3, label: 'Vacantes Reales', icon: Search },
    { number: 4, label: 'Sales Pitch', icon: Send },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-950/85 backdrop-blur-xl border-b border-slate-800/80 transition-all">
      {/* Dynamic Top Announcement Strip */}
      <div className="bg-gradient-to-r from-blue-900/60 via-indigo-900/60 to-purple-900/60 border-b border-blue-500/20 py-1.5 px-4 text-[11px] font-medium text-slate-300 flex items-center justify-center gap-2 overflow-hidden">
        <Sparkles className="w-3.5 h-3.5 text-blue-400 shrink-0 animate-pulse" />
        <span className="truncate">
          Integrado con <strong>Indeed</strong>, <strong>Computrabajo</strong>, <strong>LinkedIn</strong> & <strong>OCC Mundial</strong> • Modelo Gemini 2.5 + Google Sync
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-3">
          <div className="relative group">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 opacity-60 blur-xs group-hover:opacity-100 transition duration-300" />
            <div className="relative w-10 h-10 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center text-white shadow-xl">
              <Briefcase className="w-5 h-5 text-blue-400" />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-lg font-black tracking-tight text-white flex items-center gap-1.5">
                CazaEmpleos<span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">AI</span>
              </h1>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                PRO
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              Matching Inteligente & Cartas de Postulación de Alta Conversión
            </p>
          </div>
        </div>

        {/* Workflow Steps Indicator */}
        <nav aria-label="Progreso" className="hidden lg:flex items-center gap-1.5 bg-slate-900/70 p-1.5 rounded-2xl border border-slate-800/80 shadow-inner">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isActive = currentStep === step.number;
            const isCompleted = currentStep > step.number;

            return (
              <React.Fragment key={step.number}>
                <div
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 ring-1 ring-blue-400/40'
                      : isCompleted
                      ? 'bg-slate-800/90 text-emerald-400'
                      : 'text-slate-500 hover:text-slate-400'
                  }`}
                >
                  <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    isActive
                      ? 'bg-white text-blue-600'
                      : isCompleted
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : 'bg-slate-800 text-slate-500'
                  }`}>
                    {isCompleted ? '✓' : step.number}
                  </span>
                  <span>{step.label}</span>
                </div>
                {idx < steps.length - 1 && (
                  <span className="text-slate-700 text-xs font-mono">/</span>
                )}
              </React.Fragment>
            );
          })}
        </nav>

        {/* Google Sync & Actions */}
        <div className="flex items-center gap-2.5">
          {/* Google Sync Pill */}
          <button
            type="button"
            onClick={onOpenGoogleSync}
            className={`group flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
              user
                ? 'bg-slate-900/90 hover:bg-slate-800/90 text-slate-200 border-slate-800 hover:border-blue-500/40 shadow-sm'
                : 'bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 border-blue-500/30'
            }`}
          >
            <div className="relative">
              <Cloud className={`w-4 h-4 ${user ? 'text-blue-400' : 'text-slate-400'} ${isSyncing ? 'animate-spin' : ''}`} />
              {user && (
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-slate-900 animate-pulse" />
              )}
            </div>
            <div className="flex flex-col text-left">
              <span className="text-[11px] leading-tight font-extrabold flex items-center gap-1">
                Google Sync
                {user && <span className="text-[9px] text-emerald-400 font-normal">● Activo</span>}
              </span>
              <span className="text-[9px] text-slate-400 leading-tight">
                {user ? (user.displayName?.split(' ')[0] || user.email?.split('@')[0]) : 'Conectar cuenta'}
              </span>
            </div>
          </button>

          {/* Direct Sign in / Out Trigger */}
          {user ? (
            <button
              type="button"
              onClick={onSignOut}
              title="Cerrar sesión"
              className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 border border-slate-800 hover:border-rose-500/30 transition cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={onSignIn}
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-md shadow-blue-600/20 transition flex items-center gap-1.5 cursor-pointer"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Acceder</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
