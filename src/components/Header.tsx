import React from 'react';
import { Briefcase, Sparkles, LogIn, LogOut, Cloud, ShieldCheck } from 'lucide-react';
import { User } from 'firebase/auth';

interface HeaderProps {
  currentStep: number;
  user: User | null;
  onSignIn: () => void;
  onSignOut: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentStep, user, onSignIn, onSignOut }) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-violet-800 text-white py-2 px-4 text-xs font-medium text-center flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse shrink-0" />
        <span>
          Buscador activo conectado a <strong>Indeed</strong>, <strong>Computrabajo</strong>, <strong>LinkedIn</strong> y <strong>OCC Mundial</strong> con IA & Firebase
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
            <Briefcase className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold tracking-tight text-slate-900">
                CazaEmpleos <span className="text-blue-600">AI</span>
              </h1>
              <span className="bg-blue-100 text-blue-800 text-[11px] font-bold px-2 py-0.5 rounded-full border border-blue-200">
                Cloud Sync
              </span>
            </div>
            <p className="text-xs text-slate-500 hidden sm:block">
              Recopilador de vacantes, CV adaptado y Sales Pitch con almacenamiento en Firestore
            </p>
          </div>
        </div>

        {/* Workflow Steps Indicator & Auth */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 sm:gap-2 text-xs overflow-x-auto py-1">
            <div className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-all ${
              currentStep >= 1 ? 'bg-blue-50 text-blue-700 font-semibold border border-blue-200' : 'text-slate-400'
            }`}>
              <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                currentStep >= 1 ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-500'
              }`}>1</span>
              <span className="whitespace-nowrap">CV</span>
            </div>

            <span className="text-slate-300">→</span>

            <div className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-all ${
              currentStep >= 2 ? 'bg-indigo-50 text-indigo-700 font-semibold border border-indigo-200' : 'text-slate-400'
            }`}>
              <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                currentStep >= 2 ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-500'
              }`}>2</span>
              <span className="whitespace-nowrap">Análisis</span>
            </div>

            <span className="text-slate-300">→</span>

            <div className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-all ${
              currentStep >= 3 ? 'bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200' : 'text-slate-400'
            }`}>
              <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                currentStep >= 3 ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-500'
              }`}>3</span>
              <span className="whitespace-nowrap">Vacantes</span>
            </div>

            <span className="text-slate-300">→</span>

            <div className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-all ${
              currentStep >= 4 ? 'bg-purple-50 text-purple-700 font-semibold border border-purple-200' : 'text-slate-400'
            }`}>
              <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                currentStep >= 4 ? 'bg-purple-600 text-white' : 'bg-slate-200 text-slate-500'
              }`}>4</span>
              <span className="whitespace-nowrap">Pitch</span>
            </div>
          </div>

          {/* Firebase Auth Google Sign In Button */}
          <div className="flex items-center pl-2 border-l border-slate-200">
            {user ? (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded-lg text-xs font-semibold">
                  <Cloud className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
                  <span className="max-w-[120px] truncate">{user.displayName || user.email}</span>
                </div>
                <button
                  type="button"
                  onClick={onSignOut}
                  title="Cerrar sesión"
                  className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={onSignIn}
                className="px-3 py-1.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-xs transition flex items-center gap-1.5 cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Iniciar con Google</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
