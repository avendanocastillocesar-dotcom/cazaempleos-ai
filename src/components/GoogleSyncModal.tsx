import React, { useState, useEffect } from 'react';
import {
  Cloud,
  CheckCircle2,
  RefreshCw,
  LogOut,
  LogIn,
  X,
  Database,
  Briefcase,
  FileText,
  Trash2,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Clock,
  Download
} from 'lucide-react';
import { User } from 'firebase/auth';
import { db } from '../firebase';
import { collection, getDocs, doc, getDoc, deleteDoc } from 'firebase/firestore';
import { CandidateProfile, JobPosting } from '../types/job';
import { GoogleLogoSvg } from './GoogleAuthButton';

interface SavedJobItem {
  id: string;
  title: string;
  company: string;
  platform?: string;
  location?: string;
  applyUrl: string;
  matchScore?: number;
  createdAt?: string;
}

interface GoogleSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  onSignIn: () => void;
  onSignOut: () => void;
  currentProfile: CandidateProfile | null;
  onRestoreProfile: (profile: CandidateProfile) => void;
  onManualSync: () => Promise<void>;
  isSyncing: boolean;
  lastSyncTime: Date | null;
}

export const GoogleSyncModal: React.FC<GoogleSyncModalProps> = ({
  isOpen,
  onClose,
  user,
  onSignIn,
  onSignOut,
  currentProfile,
  onRestoreProfile,
  onManualSync,
  isSyncing,
  lastSyncTime,
}) => {
  const [savedJobs, setSavedJobs] = useState<SavedJobItem[]>([]);
  const [cloudProfile, setCloudProfile] = useState<CandidateProfile | null>(null);
  const [loadingData, setLoadingData] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && user) {
      loadUserData();
    }
  }, [isOpen, user]);

  const loadUserData = async () => {
    if (!user) return;
    setLoadingData(true);
    try {
      // 1. Fetch saved profile
      const profileDoc = await getDoc(doc(db, `users/${user.uid}/profiles/current`));
      if (profileDoc.exists()) {
        const data = profileDoc.data();
        setCloudProfile(data as CandidateProfile);
      } else {
        setCloudProfile(null);
      }

      // 2. Fetch saved jobs
      const jobsSnap = await getDocs(collection(db, `users/${user.uid}/savedJobs`));
      const jobsList: SavedJobItem[] = [];
      jobsSnap.forEach((docSnap) => {
        const data = docSnap.data();
        jobsList.push({
          id: docSnap.id,
          title: data.title || 'Vacante',
          company: data.company || 'Empresa',
          platform: data.platform || 'Portal',
          location: data.location || 'Remoto',
          applyUrl: data.applyUrl || '#',
          matchScore: data.matchScore,
          createdAt: data.createdAt,
        });
      });
      setSavedJobs(jobsList);
    } catch (err) {
      console.error('Error fetching Google Sync data:', err);
    } finally {
      setLoadingData(false);
    }
  };

  const handleDeleteJob = async (jobId: string) => {
    if (!user) return;
    setDeleteId(jobId);
    try {
      await deleteDoc(doc(db, `users/${user.uid}/savedJobs/${jobId}`));
      setSavedJobs((prev) => prev.filter((j) => j.id !== jobId));
    } catch (err) {
      console.error('Error deleting job:', err);
    } finally {
      setDeleteId(null);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 text-slate-100 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-blue-950/80 via-slate-900 to-indigo-950/80 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/20 text-white">
              <Cloud className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white tracking-tight">Centro de Google Sync</h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Firebase Cloud
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Sincronización en la nube con tu cuenta de Google y Firestore
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          {/* Auth Status Card */}
          {user ? (
            <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName || 'Google User'}
                    className="w-11 h-11 rounded-full border-2 border-emerald-500 shadow-md"
                  />
                ) : (
                  <div className="w-11 h-11 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white text-base">
                    {user.displayName?.charAt(0) || user.email?.charAt(0) || 'G'}
                  </div>
                )}
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-bold text-white">{user.displayName || 'Usuario de Google'}</p>
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  </div>
                  <p className="text-xs text-slate-400">{user.email}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>Último sync: {lastSyncTime ? lastSyncTime.toLocaleTimeString() : 'Hace un momento'}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onManualSync}
                  disabled={isSyncing}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white transition flex items-center gap-1.5 shadow-md shadow-blue-600/30 cursor-pointer disabled:opacity-50"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                  <span>{isSyncing ? 'Sincronizando...' : 'Sincronizar ahora'}</span>
                </button>
                <button
                  type="button"
                  onClick={onSignOut}
                  title="Cerrar sesión"
                  className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 border border-slate-700/60 transition cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-950/40 to-slate-900 border border-blue-800/30 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center mx-auto">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-white">Activa Google Sync</h4>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Conecta tu cuenta de Google para guardar tus currículums analizados, postulaciones enviadas y vacantes favoritas automáticamente en Firestore.
              </p>
              <button
                type="button"
                onClick={onSignIn}
                className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-xs font-bold text-slate-900 bg-white hover:bg-slate-100 shadow-lg shadow-white/5 transition cursor-pointer"
              >
                <GoogleLogoSvg className="w-4 h-4" />
                <span>Continuar con Google</span>
              </button>
            </div>
          )}

          {/* Cloud Stored Profile */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-400" />
                <span>Perfil ATS en la Nube</span>
              </h4>
              {cloudProfile && (
                <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Sincronizado
                </span>
              )}
            </div>

            {loadingData ? (
              <div className="p-5 rounded-2xl bg-slate-800/30 border border-slate-800 text-center text-xs text-slate-400">
                <RefreshCw className="w-4 h-4 animate-spin mx-auto mb-2 text-blue-400" />
                Cargando datos desde Firestore...
              </div>
            ) : cloudProfile ? (
              <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-800 flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <p className="text-sm font-bold text-white">{cloudProfile.fullName}</p>
                  <p className="text-xs text-blue-300 font-medium">{cloudProfile.headline}</p>
                  <p className="text-xs text-slate-400 line-clamp-2">{cloudProfile.professionalSummary}</p>
                  <div className="flex flex-wrap gap-1.5 pt-1.5">
                    {(cloudProfile.topSkills || []).slice(0, 5).map((skill, i) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    onRestoreProfile(cloudProfile);
                    onClose();
                  }}
                  className="px-3 py-1.5 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/40 text-blue-300 text-xs font-bold flex items-center gap-1.5 shrink-0 transition cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Cargar perfil</span>
                </button>
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-slate-800/20 border border-slate-800/60 text-xs text-slate-400 text-center">
                Aún no tienes un perfil guardado en Google Cloud. Se sincronizará automáticamente al analizar tu CV.
              </div>
            )}
          </div>

          {/* Cloud Stored Jobs */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-emerald-400" />
                <span>Vacantes Guardadas ({savedJobs.length})</span>
              </h4>
              <span className="text-[11px] text-slate-500">Historial en Firestore</span>
            </div>

            {savedJobs.length > 0 ? (
              <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                {savedJobs.map((job) => (
                  <div
                    key={job.id}
                    className="p-3 rounded-xl bg-slate-800/40 hover:bg-slate-800/60 border border-slate-800 flex items-center justify-between gap-3 transition"
                  >
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-white truncate">{job.title}</p>
                      <p className="text-[11px] text-slate-400 truncate">
                        {job.company} • <span className="text-slate-500">{job.location}</span>
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {job.matchScore && (
                        <span className="px-1.5 py-0.5 rounded-md text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          {job.matchScore}%
                        </span>
                      )}
                      <a
                        href={job.applyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 transition"
                        title="Abrir oferta"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                      <button
                        type="button"
                        onClick={() => handleDeleteJob(job.id)}
                        disabled={deleteId === job.id}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition cursor-pointer"
                        title="Eliminar de guardados"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-slate-800/20 border border-slate-800/60 text-xs text-slate-400 text-center">
                No tienes vacantes guardadas en tu cuenta todavía. Haz clic en "Guardar" en cualquier vacante para sincronizarla.
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950/80 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1.5 text-[11px]">
            <Database className="w-3.5 h-3.5 text-blue-400" />
            <span>Base de datos Firestore activa</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-white transition cursor-pointer"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
