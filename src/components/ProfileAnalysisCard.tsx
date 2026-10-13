import React from 'react';
import {
  UserCheck,
  Award,
  Sparkles,
  Target,
  CheckCircle,
  Briefcase,
  TrendingUp,
  RefreshCw,
  Search,
  CheckCircle2,
  ShieldCheck,
  Star,
  MapPin,
  Clock
} from 'lucide-react';
import { CandidateProfile } from '../types/job';

interface ProfileAnalysisCardProps {
  profile: CandidateProfile;
  onRefreshSearch: () => void;
  isSearching: boolean;
  jobCount: number;
}

export const ProfileAnalysisCard: React.FC<ProfileAnalysisCardProps> = ({
  profile,
  onRefreshSearch,
  isSearching,
  jobCount,
}) => {
  return (
    <div className="bg-slate-900/80 backdrop-blur-xl rounded-3xl border border-slate-800/90 shadow-2xl p-6 sm:p-8 space-y-6">
      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-xl shadow-blue-500/20 font-black text-xl">
            {profile.fullName?.charAt(0) || 'U'}
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h3 className="text-xl font-bold text-white tracking-tight">{profile.fullName}</h3>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                ATS Verificado
              </span>
            </div>
            <p className="text-xs sm:text-sm text-blue-400 font-medium mt-0.5">{profile.headline}</p>
            <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-1">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-slate-500" />
                {profile.yearsOfExperience || 'Varios años de experiencia'}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-slate-500" />
                {profile.location || 'LATAM / Remoto'}
              </span>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={onRefreshSearch}
          disabled={isSearching}
          className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700/80 transition flex items-center gap-2 cursor-pointer disabled:opacity-50 shadow-sm"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-blue-400 ${isSearching ? 'animate-spin' : ''}`} />
          <span>{isSearching ? 'Rastreando...' : `Buscar otra tanda (${jobCount} vacantes)`}</span>
        </button>
      </div>

      {/* Main Grid Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Summary & Target Roles (2 columns) */}
        <div className="lg:col-span-2 space-y-5">
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <UserCheck className="w-4 h-4 text-blue-400" />
              <span>Resumen Ejecutivo Extraído</span>
            </h4>
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              {profile.professionalSummary}
            </div>
          </div>

          {/* Target job roles */}
          <div className="space-y-2">
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Target className="w-4 h-4 text-indigo-400" />
              <span>Roles Óptimos Identificados en el Mercado</span>
            </h5>
            <div className="flex flex-wrap gap-2">
              {(profile.targetJobTitles || []).map((title, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-xl bg-indigo-500/10 text-indigo-300 text-xs font-semibold border border-indigo-500/20"
                >
                  {title}
                </span>
              ))}
            </div>
          </div>

          {/* Unique Selling Points if present */}
          {profile.uniqueSellingPoints && profile.uniqueSellingPoints.length > 0 && (
            <div className="space-y-2">
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Star className="w-4 h-4 text-amber-400" />
                <span>Puntos Fuertes Diferenciadores</span>
              </h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {profile.uniqueSellingPoints.map((point, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-950/40 border border-slate-800/60 text-xs text-slate-300 flex items-start gap-2"
                  >
                    <CheckCircle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Skills & Strengths Sidebar (1 column) */}
        <div className="space-y-5">
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-blue-400" />
              <span>Habilidades Técnicas Clave</span>
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {(profile.topSkills || []).slice(0, 12).map((skill, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg bg-slate-800/80 text-slate-200 text-xs font-medium border border-slate-700/80"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {profile.softSkills && profile.softSkills.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <span>Competencias Blandas</span>
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {profile.softSkills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-300 text-xs font-medium border border-emerald-500/20"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {profile.languages && profile.languages.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Idiomas
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {profile.languages.map((lang, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-400 text-xs"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
