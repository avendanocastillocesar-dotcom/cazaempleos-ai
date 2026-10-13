import React, { useState } from 'react';
import {
  ExternalLink,
  Sparkles,
  FileText,
  Target,
  Building2,
  MapPin,
  DollarSign,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  Flame,
  ArrowUpRight,
  Filter,
  Check,
  Zap,
  TrendingUp
} from 'lucide-react';
import { JobPosting } from '../types/job';

interface JobsListingSectionProps {
  jobs: JobPosting[];
  onSelectTailoredCv: (job: JobPosting) => void;
  onSelectSalesPitch: (job: JobPosting) => void;
  selectedJobId?: string;
  isGeneratingCv: boolean;
  isGeneratingPitch: boolean;
  onSearchMore: () => void;
  isLoadingMore: boolean;
}

export const JobsListingSection: React.FC<JobsListingSectionProps> = ({
  jobs,
  onSelectTailoredCv,
  onSelectSalesPitch,
  selectedJobId,
  isGeneratingCv,
  isGeneratingPitch,
  onSearchMore,
  isLoadingMore,
}) => {
  const [activePlatformFilter, setActivePlatformFilter] = useState<string>('all');

  const platforms = Array.from(new Set(jobs.map((j) => j.platform)));

  const filteredJobs = activePlatformFilter === 'all'
    ? jobs
    : jobs.filter((j) => j.platform.toLowerCase().includes(activePlatformFilter.toLowerCase()));

  const getPlatformBadgeStyle = (platform: string) => {
    const p = platform.toLowerCase();
    if (p.includes('computrabajo')) {
      return {
        bg: 'bg-orange-50 text-orange-700 border-orange-200',
        dot: 'bg-orange-500',
        name: 'Computrabajo',
      };
    }
    if (p.includes('indeed')) {
      return {
        bg: 'bg-blue-50 text-blue-700 border-blue-200',
        dot: 'bg-blue-600',
        name: 'Indeed',
      };
    }
    if (p.includes('linkedin')) {
      return {
        bg: 'bg-sky-50 text-sky-700 border-sky-200',
        dot: 'bg-sky-600',
        name: 'LinkedIn Jobs',
      };
    }
    if (p.includes('occ')) {
      return {
        bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        dot: 'bg-emerald-600',
        name: 'OCC Mundial',
      };
    }
    return {
      bg: 'bg-purple-50 text-purple-700 border-purple-200',
      dot: 'bg-purple-600',
      name: platform,
    };
  };

  return (
    <div className="space-y-6">
      {/* Section Header & Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center">3</span>
            <h3 className="text-lg font-bold text-slate-900">
              Vacantes Potenciales Recopiladas ({filteredJobs.length} encontradas)
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Haz clic en <strong>"Ir a la oferta"</strong> para abrir el portal directamente, o genera tu <strong>CV adaptado</strong> y <strong>Sales Pitch</strong>.
          </p>
        </div>

        {/* Platform Filter Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <button
            type="button"
            onClick={() => setActivePlatformFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
              activePlatformFilter === 'all'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Todas ({jobs.length})
          </button>
          {platforms.map((plat) => (
            <button
              key={plat}
              type="button"
              onClick={() => setActivePlatformFilter(plat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                activePlatformFilter === plat
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {plat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Job Cards */}
      <div className="grid grid-cols-1 gap-5">
        {filteredJobs.map((job, index) => {
          const badge = getPlatformBadgeStyle(job.platform);
          const isSelected = selectedJobId === job.id;

          return (
            <div
              key={job.id}
              className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden shadow-xs hover:shadow-md ${
                isSelected
                  ? 'border-blue-500 ring-2 ring-blue-100'
                  : 'border-slate-200/90 hover:border-slate-300'
              }`}
            >
              <div className="p-5 sm:p-6">
                {/* Top Bar: Platform Badge, Match Score & Link */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${badge.bg}`}>
                      <span className={`w-2 h-2 rounded-full ${badge.dot}`} />
                      {badge.name}
                    </span>

                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                      <Flame className="w-3.5 h-3.5 text-emerald-600" />
                      {job.matchScore}% Match
                    </span>

                    {job.modality && (
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
                        {job.modality}
                      </span>
                    )}
                  </div>

                  {/* Clickable Direct Link to Job Board */}
                  <a
                    href={job.applyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg border border-blue-200/80 transition group"
                  >
                    <span>Ver oferta en {badge.name}</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
                  </a>
                </div>

                {/* Job Title and Company */}
                <div className="mb-3">
                  <h4 className="text-lg sm:text-xl font-extrabold text-slate-900 group-hover:text-blue-600 transition">
                    {job.title}
                  </h4>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-600 mt-1">
                    <span className="font-bold text-slate-800 flex items-center gap-1">
                      <Building2 className="w-3.5 h-3.5 text-slate-400" />
                      {job.company}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {job.location}
                    </span>
                    {job.estimatedSalary && (
                      <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                        <DollarSign className="w-3.5 h-3.5" />
                        {job.estimatedSalary}
                      </span>
                    )}
                    {job.postedDate && (
                      <span className="flex items-center gap-1 text-slate-400">
                        <Calendar className="w-3.5 h-3.5" />
                        {job.postedDate}
                      </span>
                    )}
                  </div>
                </div>

                {/* Description snippet */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  {job.descriptionSnippet}
                </p>

                {/* Two Column details: Requisitos Clave & Retos/Problemas de la empresa */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50/80 p-4 rounded-xl border border-slate-100 mb-5">
                  {/* Key Requirements */}
                  <div>
                    <h5 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                      Requisitos Clave del Empleador
                    </h5>
                    <ul className="space-y-1.5">
                      {(job.keyRequirements || []).map((req, rIdx) => (
                        <li key={rIdx} className="text-xs text-slate-700 flex items-start gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Company Pain Points (Retos que resolver) */}
                  <div>
                    <h5 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Target className="w-3.5 h-3.5 text-amber-600" />
                      Problemas Clave que Buscan Resolver
                    </h5>
                    <ul className="space-y-1.5">
                      {(job.companyPainPoints || []).map((pain, pIdx) => (
                        <li key={pIdx} className="text-xs text-slate-700 flex items-start gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                          <span className="font-medium text-slate-800">{pain}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Match reason statement */}
                <div className="bg-emerald-50/60 border border-emerald-200/60 rounded-xl p-3 mb-5 flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <p className="text-xs text-emerald-900 leading-relaxed">
                    <span className="font-bold">Por qué eres ideal: </span>
                    {job.matchReason}
                  </p>
                </div>

                {/* Workflow Actions: Tailored CV & Sales Pitch */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-3 border-t border-slate-100">
                  <span className="text-xs text-slate-400 font-medium">
                    Paso siguiente para esta vacante:
                  </span>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                    {/* Button 1: Tailored CV */}
                    <button
                      type="button"
                      onClick={() => onSelectTailoredCv(job)}
                      disabled={isGeneratingCv && isSelected}
                      className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-800 bg-white hover:bg-slate-50 border border-slate-300 hover:border-blue-400 transition shadow-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      <FileText className="w-4 h-4 text-blue-600" />
                      <span>{isGeneratingCv && isSelected ? 'Adaptando CV...' : 'Generar Tailored CV'}</span>
                    </button>

                    {/* Button 2: Sales Pitch (Focus on selling the solution) */}
                    <button
                      type="button"
                      onClick={() => onSelectSalesPitch(job)}
                      disabled={isGeneratingPitch && isSelected}
                      className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition shadow-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      <Zap className="w-4 h-4 text-amber-300" />
                      <span>{isGeneratingPitch && isSelected ? 'Creando Pitch...' : 'Crear Sales Pitch'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Load More Offers Button */}
      <div className="pt-2 text-center">
        <button
          type="button"
          onClick={onSearchMore}
          disabled={isLoadingMore}
          className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold transition shadow-sm inline-flex items-center gap-2 cursor-pointer disabled:opacity-60"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>{isLoadingMore ? 'Consultando más ofertas en la web...' : 'Cazar otra tanda de vacantes'}</span>
        </button>
      </div>
    </div>
  );
};
