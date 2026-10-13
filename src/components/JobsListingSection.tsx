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
  TrendingUp,
  Bookmark,
  BookmarkCheck,
  Send,
  Loader2,
  RefreshCw
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
  onSaveJob?: (job: JobPosting) => void;
  savedJobIds?: Set<string>;
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
  onSaveJob,
  savedJobIds = new Set(),
}) => {
  const [activePlatformFilter, setActivePlatformFilter] = useState<string>('all');

  const platforms = Array.from(new Set(jobs.map((j) => j.platform)));

  const filteredJobs = activePlatformFilter === 'all'
    ? jobs
    : jobs.filter((j) => j.platform.toLowerCase().includes(activePlatformFilter.toLowerCase()));

  const getPlatformBadge = (platform: string) => {
    const p = platform.toLowerCase();
    if (p.includes('computrabajo')) {
      return {
        bg: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
        dot: 'bg-orange-500',
        name: 'Computrabajo',
      };
    }
    if (p.includes('indeed')) {
      return {
        bg: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
        dot: 'bg-blue-500',
        name: 'Indeed',
      };
    }
    if (p.includes('linkedin')) {
      return {
        bg: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
        dot: 'bg-sky-400',
        name: 'LinkedIn Jobs',
      };
    }
    if (p.includes('occ')) {
      return {
        bg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
        dot: 'bg-emerald-500',
        name: 'OCC Mundial',
      };
    }
    return {
      bg: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
      dot: 'bg-purple-500',
      name: platform,
    };
  };

  return (
    <div className="space-y-6">
      {/* Control Bar & Filter Header */}
      <div className="bg-slate-900/80 backdrop-blur-xl p-5 rounded-3xl border border-slate-800/90 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="w-6 h-6 rounded-lg bg-blue-600 text-white text-xs font-bold flex items-center justify-center">
              3
            </span>
            <h3 className="text-lg font-bold text-white tracking-tight">
              Vacantes Compatibles ({filteredJobs.length} de {jobs.length})
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Revisadas y cruzadas con los requerimientos de tu CV. Genera propuestas personalizadas en 1 clic.
          </p>
        </div>

        {/* Platform filter pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={() => setActivePlatformFilter('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              activePlatformFilter === 'all'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            Todas ({jobs.length})
          </button>
          {platforms.map((platform) => {
            const badge = getPlatformBadge(platform);
            const count = jobs.filter((j) => j.platform === platform).length;
            const isSelected = activePlatformFilter.toLowerCase() === platform.toLowerCase();

            return (
              <button
                key={platform}
                type="button"
                onClick={() => setActivePlatformFilter(platform)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition border cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-slate-800 text-white border-blue-500'
                    : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${badge.dot}`} />
                <span>{badge.name}</span>
                <span className="text-[10px] text-slate-500">({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Jobs List Grid */}
      <div className="grid grid-cols-1 gap-5">
        {filteredJobs.map((job) => {
          const badge = getPlatformBadge(job.platform);
          const isSelected = selectedJobId === job.id;
          const isSaved = savedJobIds.has(job.id);

          return (
            <div
              key={job.id}
              className={`group bg-slate-900/70 backdrop-blur-xl rounded-3xl border transition-all duration-300 p-6 sm:p-7 shadow-xl hover:shadow-2xl hover:border-blue-500/40 ${
                isSelected
                  ? 'border-blue-500 ring-1 ring-blue-500/50 bg-slate-900/90'
                  : 'border-slate-800/80'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                {/* Left Job Info */}
                <div className="space-y-4 flex-1">
                  {/* Top tags row */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border flex items-center gap-1.5 ${badge.bg}`}>
                      <span className={`w-2 h-2 rounded-full ${badge.dot}`} />
                      {badge.name}
                    </span>

                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-slate-800 text-slate-300 border border-slate-700/80 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      {job.location}
                    </span>

                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-slate-800 text-slate-300 border border-slate-700/80">
                      {job.modality}
                    </span>

                    {job.estimatedSalary && (
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                        <DollarSign className="w-3 h-3" />
                        {job.estimatedSalary}
                      </span>
                    )}

                    {job.postedDate && (
                      <span className="text-[11px] text-slate-500 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {job.postedDate}
                      </span>
                    )}
                  </div>

                  {/* Title & Company */}
                  <div>
                    <h4 className="text-xl font-bold text-white group-hover:text-blue-400 transition tracking-tight">
                      {job.title}
                    </h4>
                    <p className="text-sm font-semibold text-slate-400 mt-0.5 flex items-center gap-1.5">
                      <Building2 className="w-4 h-4 text-slate-500" />
                      {job.company}
                    </p>
                  </div>

                  {/* Snippet */}
                  <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 leading-relaxed">
                    {job.descriptionSnippet}
                  </p>

                  {/* Pain Points Solved & Keywords */}
                  <div className="space-y-2 pt-1">
                    {job.companyPainPoints && job.companyPainPoints.length > 0 && (
                      <div className="space-y-1">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1">
                          <Flame className="w-3 h-3 text-amber-400" />
                          Dolor clave que resuelves en este puesto:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {job.companyPainPoints.map((pain, i) => (
                            <span
                              key={i}
                              className="text-xs px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-300 border border-amber-500/20 font-medium"
                            >
                              {pain}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {job.keyRequirements && job.keyRequirements.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {job.keyRequirements.slice(0, 5).map((req, i) => (
                          <span
                            key={i}
                            className="text-[11px] px-2 py-0.5 rounded-md bg-slate-950 text-slate-400 border border-slate-800"
                          >
                            ✓ {req}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Action Box & Score */}
                <div className="flex flex-col sm:flex-row lg:flex-col items-end justify-between gap-4 lg:w-64 shrink-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-800">
                  {/* Match Score Badge */}
                  <div className="w-full bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800/80 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                        Compatibilidad ATS
                      </span>
                      <span className="text-xs text-slate-400 font-medium line-clamp-1">
                        {job.matchReason || 'Excelente afinidad técnica'}
                      </span>
                    </div>
                    <div className="px-2.5 py-1 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-sm font-black flex items-center gap-1 shrink-0">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{job.matchScore}%</span>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="w-full space-y-2">
                    {/* External Link */}
                    <a
                      href={job.applyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                    >
                      <span>Ir a la Oferta en {badge.name}</span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                    </a>

                    {/* Tailored CV Generator */}
                    <button
                      type="button"
                      onClick={() => onSelectTailoredCv(job)}
                      disabled={isGeneratingCv && isSelected}
                      className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-md shadow-blue-600/20 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {isGeneratingCv && isSelected ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>Adaptando CV...</span>
                        </>
                      ) : (
                        <>
                          <FileText className="w-3.5 h-3.5 text-blue-200" />
                          <span>Generar CV a Medida</span>
                        </>
                      )}
                    </button>

                    {/* Sales Pitch Generator */}
                    <button
                      type="button"
                      onClick={() => onSelectSalesPitch(job)}
                      disabled={isGeneratingPitch && isSelected}
                      className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-indigo-300 hover:text-white bg-indigo-500/10 hover:bg-indigo-600 border border-indigo-500/20 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {isGeneratingPitch && isSelected ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>Redactando Pitch...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5 text-indigo-400" />
                          <span>Crear Sales Pitch</span>
                        </>
                      )}
                    </button>

                    {/* Google Sync Bookmark Button */}
                    {onSaveJob && (
                      <button
                        type="button"
                        onClick={() => onSaveJob(job)}
                        className={`w-full py-1.5 px-3 rounded-lg text-[11px] font-semibold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                          isSaved
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : 'text-slate-400 hover:text-white hover:bg-slate-800'
                        }`}
                      >
                        {isSaved ? (
                          <>
                            <BookmarkCheck className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Guardada en Google Sync</span>
                          </>
                        ) : (
                          <>
                            <Bookmark className="w-3.5 h-3.5" />
                            <span>Guardar vacante</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Load More Button */}
      <div className="text-center pt-4">
        <button
          type="button"
          onClick={onSearchMore}
          disabled={isLoadingMore}
          className="px-6 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-white font-bold text-xs sm:text-sm transition flex items-center justify-center gap-2 mx-auto cursor-pointer disabled:opacity-50 shadow-lg"
        >
          <RefreshCw className={`w-4 h-4 text-blue-400 ${isLoadingMore ? 'animate-spin' : ''}`} />
          <span>{isLoadingMore ? 'Consultando más vacantes...' : 'Cargar más vacantes de empleo'}</span>
        </button>
      </div>
    </div>
  );
};
