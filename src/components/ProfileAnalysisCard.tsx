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
  Search
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
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 mb-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 font-bold text-lg">
            {profile.fullName?.charAt(0) || 'U'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-slate-900">{profile.fullName}</h3>
              <span className="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                <CheckCircle className="w-3 h-3" /> CV Analizado
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 font-medium">{profile.headline}</p>
          </div>
        </div>

        <button
          type="button"
          onClick={onRefreshSearch}
          disabled={isSearching}
          className="px-4 py-2 rounded-xl text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 transition flex items-center gap-2 cursor-pointer disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isSearching ? 'animate-spin' : ''}`} />
          <span>Buscar otra tanda de {jobCount} vacantes</span>
        </button>
      </div>

      {/* Grid of details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-5">
        {/* Summary */}
        <div className="md:col-span-2 space-y-3">
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
            <UserCheck className="w-4 h-4 text-blue-600" />
            Resumen de Perfil & Trayectoria ({profile.yearsOfExperience || 'Varios años'})
          </h4>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-100">
            {profile.professionalSummary}
          </p>

          {/* Target job roles */}
          <div>
            <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-indigo-600" />
              Roles Óptimos Identificados en el Mercado
            </h5>
            <div className="flex flex-wrap gap-1.5">
              {(profile.targetJobTitles || []).map((title, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-800 text-xs font-semibold border border-indigo-100"
                >
                  {title}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Skills & Selling Points */}
        <div className="space-y-4">
          <div>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-600" />
              Competencias Clave para Matching
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {(profile.topSkills || []).slice(0, 10).map((skill, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-800 text-xs font-medium border border-slate-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              Puntos Diferenciadores para el Pitch
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-600">
              {(profile.uniqueSellingPoints || []).slice(0, 3).map((usp, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                  <span>{usp}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
