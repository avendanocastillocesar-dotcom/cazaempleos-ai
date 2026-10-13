import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { CvUploadSection } from './components/CvUploadSection';
import { ProfileAnalysisCard } from './components/ProfileAnalysisCard';
import { JobsListingSection } from './components/JobsListingSection';
import { TailoredResumeModal } from './components/TailoredResumeModal';
import { SalesPitchModal } from './components/SalesPitchModal';
import { GoogleSyncModal } from './components/GoogleSyncModal';
import { Footer } from './components/Footer';
import { CandidateProfile, JobPosting, TailoredResume, SalesPitch } from './types/job';
import { AlertCircle, RotateCcw, Sparkles, Cloud, CheckCircle2, ShieldCheck, Database } from 'lucide-react';
import { auth, googleProvider, db, handleFirestoreError, OperationType, loginWithGoogle, logoutUser } from './firebase';
import { signInWithPopup, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { doc, setDoc, collection, addDoc, serverTimestamp, getDoc, getDocs } from 'firebase/firestore';

export default function App() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<CandidateProfile | null>(null);
  const [jobs, setJobs] = useState<JobPosting[]>([]);

  // Search parameters for re-search
  const [searchParams, setSearchParams] = useState<{
    jobCount: number;
    countryLocation: string;
    modality: string;
    customKeywords: string;
  }>({
    jobCount: 5,
    countryLocation: 'México (o Remoto LATAM)',
    modality: 'Remoto o Híbrido',
    customKeywords: '',
  });

  // Modals & generated items
  const [selectedJobForCv, setSelectedJobForCv] = useState<JobPosting | null>(null);
  const [tailoredCv, setTailoredCv] = useState<TailoredResume | null>(null);
  const [isCvModalOpen, setIsCvModalOpen] = useState<boolean>(false);

  const [selectedJobForPitch, setSelectedJobForPitch] = useState<JobPosting | null>(null);
  const [salesPitch, setSalesPitch] = useState<SalesPitch | null>(null);
  const [isPitchModalOpen, setIsPitchModalOpen] = useState<boolean>(false);

  // Google Sync state
  const [isGoogleSyncModalOpen, setIsGoogleSyncModalOpen] = useState<boolean>(false);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [lastSyncTime, setLastSyncTime] = useState<Date | null>(null);
  const [savedJobIds, setSavedJobIds] = useState<Set<string>>(new Set());

  // Loading flags
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingStepText, setLoadingStepText] = useState<string>('');
  const [isGeneratingCv, setIsGeneratingCv] = useState<boolean>(false);
  const [isGeneratingPitch, setIsGeneratingPitch] = useState<boolean>(false);
  const [isSearchingMore, setIsSearchingMore] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Listen to Firebase Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        setLastSyncTime(new Date());
        // Sync user document to Firestore
        try {
          const userRef = doc(db, 'users', firebaseUser.uid);
          await setDoc(
            userRef,
            {
              uid: firebaseUser.uid,
              email: firebaseUser.email || '',
              displayName: firebaseUser.displayName || '',
              updatedAt: serverTimestamp(),
            },
            { merge: true }
          );

          // Load user's saved job IDs for bookmarks indicator
          const jobsSnap = await getDocs(collection(db, `users/${firebaseUser.uid}/savedJobs`));
          const ids = new Set<string>();
          jobsSnap.forEach((d) => {
            const data = d.data();
            if (data.jobId) ids.add(data.jobId);
          });
          setSavedJobIds(ids);
        } catch (err) {
          console.error('Error syncing user to Firestore:', err);
        }
      }
    });
    return () => unsubscribe();
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      await loginWithGoogle();
    } catch (err: any) {
      console.error('Sign in error:', err);
      setErrorMessage(err.message || 'No se pudo iniciar sesión con Google.');
    }
  };

  const handleSignOut = async () => {
    try {
      await logoutUser();
      setSavedJobIds(new Set());
    } catch (err) {
      console.error('Sign out error:', err);
    }
  };

  // Save profile to Firestore
  const saveProfileToFirestore = async (candidateProfile: CandidateProfile) => {
    if (!auth.currentUser) return;
    const path = `users/${auth.currentUser.uid}/profiles`;
    try {
      const profileRef = doc(db, path, 'current');
      await setDoc(profileRef, {
        userId: auth.currentUser.uid,
        fullName: candidateProfile.fullName,
        email: candidateProfile.email,
        headline: candidateProfile.headline,
        yearsOfExperience: candidateProfile.yearsOfExperience,
        location: candidateProfile.location,
        professionalSummary: candidateProfile.professionalSummary,
        topSkills: candidateProfile.topSkills || [],
        targetJobTitles: candidateProfile.targetJobTitles || [],
        updatedAt: new Date().toISOString(),
      });
      setLastSyncTime(new Date());
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, path);
    }
  };

  // Save/bookmark job to Firestore
  const handleBookmarkJob = async (job: JobPosting) => {
    if (!auth.currentUser) {
      setIsGoogleSyncModalOpen(true);
      return;
    }
    const path = `users/${auth.currentUser.uid}/savedJobs`;
    try {
      const jobsCol = collection(db, path);
      await addDoc(jobsCol, {
        userId: auth.currentUser.uid,
        jobId: job.id,
        title: job.title,
        company: job.company,
        platform: job.platform,
        location: job.location,
        applyUrl: job.applyUrl,
        matchScore: job.matchScore,
        createdAt: new Date().toISOString(),
      });
      setSavedJobIds((prev) => new Set([...prev, job.id]));
      setLastSyncTime(new Date());
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, path);
    }
  };

  // Manual Google Sync Trigger
  const handleManualSync = async () => {
    if (!auth.currentUser) {
      handleGoogleSignIn();
      return;
    }
    setIsSyncing(true);
    try {
      if (profile) {
        await saveProfileToFirestore(profile);
      }
      setLastSyncTime(new Date());
    } catch (err) {
      console.error('Manual sync error:', err);
    } finally {
      setIsSyncing(false);
    }
  };

  // Restore Cloud Profile
  const handleRestoreProfile = (cloudProfile: CandidateProfile) => {
    setProfile(cloudProfile);
    setCurrentStep(2);
  };

  // Main workflow trigger: analyzes CV and directly searches jobs across portals
  const handleAnalyzeAndSearch = async (params: {
    email: string;
    fullName: string;
    cvText: string;
    cvBase64?: string;
    mimeType?: string;
    fileName?: string;
    jobCount: number;
    countryLocation: string;
    modality: string;
    customKeywords: string;
  }) => {
    setIsLoading(true);
    setErrorMessage(null);
    setSearchParams({
      jobCount: params.jobCount,
      countryLocation: params.countryLocation,
      modality: params.modality,
      customKeywords: params.customKeywords,
    });

    try {
      // Step 1: Analyze CV with Gemini
      setLoadingStepText('Paso 1 de 2: Extrayendo experiencia, fortalezas y titular ATS...');
      const cvRes = await fetch('/api/analyze-cv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: params.email || auth.currentUser?.email || '',
          cvText: params.cvText,
          cvBase64: params.cvBase64,
          mimeType: params.mimeType,
          fileName: params.fileName,
        }),
      });

      if (!cvRes.ok) {
        const errorData = await cvRes.json().catch(() => ({}));
        throw new Error(errorData.error || 'Error al analizar el currículum con Gemini');
      }

      const cvData = await cvRes.json();
      const parsedProfile: CandidateProfile = cvData.profile;
      if (params.fullName && !parsedProfile.fullName) {
        parsedProfile.fullName = params.fullName;
      }
      setProfile(parsedProfile);
      setCurrentStep(2);

      // Save profile to Firestore
      await saveProfileToFirestore(parsedProfile);

      // Step 2: Search jobs across portals with Google Search grounding
      setLoadingStepText(
        `Paso 2 de 2: Rastreando ${params.jobCount} ofertas activas en Indeed, Computrabajo, LinkedIn y OCC...`
      );

      const jobsRes = await fetch('/api/search-jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          profile: parsedProfile,
          countryLocation: params.countryLocation,
          modality: params.modality,
          jobCount: params.jobCount,
          customKeywords: params.customKeywords,
        }),
      });

      if (!jobsRes.ok) {
        const jobsError = await jobsRes.json().catch(() => ({}));
        throw new Error(jobsError.error || 'Error al recopilar vacantes');
      }

      const jobsData = await jobsRes.json();
      setJobs(jobsData.jobs || []);
      setCurrentStep(3);
    } catch (err: any) {
      console.error('Workflow error:', err);
      setErrorMessage(err.message || 'Ocurrió un error inesperado durante el proceso.');
    } finally {
      setIsLoading(false);
      setLoadingStepText('');
    }
  };

  // Re-search additional or fresh job proposals
  const handleSearchMore = async () => {
    if (!profile) return;
    setIsSearchingMore(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/search-jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          profile,
          countryLocation: searchParams.countryLocation,
          modality: searchParams.modality,
          jobCount: searchParams.jobCount,
          customKeywords: searchParams.customKeywords,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Error al obtener más vacantes');
      }

      const data = await res.json();
      const newJobs: JobPosting[] = data.jobs || [];

      // Avoid duplicates
      const existingIds = new Set(jobs.map((j) => j.id));
      const filteredNew = newJobs.filter((j) => !existingIds.has(j.id));
      setJobs((prev) => (filteredNew.length > 0 ? [...prev, ...filteredNew] : newJobs));
    } catch (err: any) {
      setErrorMessage(err.message || 'No se pudieron cargar más vacantes.');
    } finally {
      setIsSearchingMore(false);
    }
  };

  // Generate Tailored CV for selected job
  const handleSelectTailoredCv = async (job: JobPosting) => {
    if (!profile) return;
    setSelectedJobForCv(job);
    setIsGeneratingCv(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/generate-tailored-cv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profile, job }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Error al generar el currículum adaptado');
      }

      const data = await res.json();
      setTailoredCv(data.tailoredCv);
      setIsCvModalOpen(true);
      setCurrentStep(4);
    } catch (err: any) {
      setErrorMessage(err.message || 'No se pudo generar el CV adaptado.');
    } finally {
      setIsGeneratingCv(false);
    }
  };

  // Generate Sales Pitch for selected job
  const handleSelectSalesPitch = async (job: JobPosting) => {
    if (!profile) return;
    setSelectedJobForPitch(job);
    setIsGeneratingPitch(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/generate-sales-pitch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profile, job }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Error al generar el sales pitch');
      }

      const data = await res.json();
      setSalesPitch(data.salesPitch);
      setIsPitchModalOpen(true);
      setCurrentStep(4);
    } catch (err: any) {
      setErrorMessage(err.message || 'No se pudo generar el pitch de ventas.');
    } finally {
      setIsGeneratingPitch(false);
    }
  };

  // Reset to search again with a new CV
  const handleReset = () => {
    setProfile(null);
    setJobs([]);
    setSelectedJobForCv(null);
    setTailoredCv(null);
    setSelectedJobForPitch(null);
    setSalesPitch(null);
    setCurrentStep(1);
    setErrorMessage(null);
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 flex flex-col selection:bg-blue-600 selection:text-white relative overflow-x-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-blue-600/10 blur-[130px] pointer-events-none" />
      <div className="absolute top-48 right-10 w-96 h-96 bg-purple-600/5 blur-[130px] pointer-events-none" />

      <Header
        currentStep={currentStep}
        user={user}
        onSignIn={handleGoogleSignIn}
        onSignOut={handleSignOut}
        onOpenGoogleSync={() => setIsGoogleSyncModalOpen(true)}
        isSyncing={isSyncing}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full relative z-10 space-y-8">
        {/* Error notification banner if any */}
        {errorMessage && (
          <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs sm:text-sm flex items-start justify-between gap-3 shadow-lg animate-fadeIn">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Aviso del sistema:</p>
                <p className="mt-0.5">{errorMessage}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setErrorMessage(null)}
              className="text-xs font-bold text-rose-400 hover:text-white hover:underline cursor-pointer shrink-0"
            >
              Cerrar
            </button>
          </div>
        )}

        {/* If no profile yet, show upload section */}
        {!profile ? (
          <CvUploadSection
            onAnalyzeAndSearch={handleAnalyzeAndSearch}
            isLoading={isLoading}
            loadingStepText={loadingStepText}
            user={user}
            onGoogleSignIn={handleGoogleSignIn}
          />
        ) : (
          <div className="space-y-6 animate-fadeIn">
            {/* Top Bar with Reset option & Google Sync Status */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2">
              <button
                type="button"
                onClick={() => setIsGoogleSyncModalOpen(true)}
                className="flex items-center gap-2 p-2 rounded-xl bg-slate-900/80 hover:bg-slate-850 border border-slate-800 text-left transition cursor-pointer"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs text-slate-300 flex items-center gap-1.5 font-medium">
                  <Cloud className="w-3.5 h-3.5 text-blue-400" />
                  <span>Google Sync: Sincronizado para <strong className="text-white">{profile.email || user?.email || 'tu sesión'}</strong></span>
                </span>
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 transition flex items-center gap-2 cursor-pointer shadow-sm self-start sm:self-auto"
              >
                <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
                <span>Cargar otro currículum</span>
              </button>
            </div>

            {/* Profile Analysis Card */}
            <ProfileAnalysisCard
              profile={profile}
              onRefreshSearch={handleSearchMore}
              isSearching={isSearchingMore}
              jobCount={searchParams.jobCount}
            />

            {/* Jobs Listing Section */}
            {jobs.length > 0 ? (
              <JobsListingSection
                jobs={jobs}
                onSelectTailoredCv={handleSelectTailoredCv}
                onSelectSalesPitch={handleSelectSalesPitch}
                selectedJobId={selectedJobForCv?.id || selectedJobForPitch?.id}
                isGeneratingCv={isGeneratingCv}
                isGeneratingPitch={isGeneratingPitch}
                onSearchMore={handleSearchMore}
                isLoadingMore={isSearchingMore}
                onSaveJob={handleBookmarkJob}
                savedJobIds={savedJobIds}
              />
            ) : (
              <div className="bg-slate-900/80 backdrop-blur-xl rounded-3xl border border-slate-800 p-12 text-center space-y-3">
                <Sparkles className="w-8 h-8 text-blue-400 mx-auto animate-spin" />
                <h4 className="text-base font-bold text-white">
                  Rastreando vacantes en bolsas de empleo...
                </h4>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  Consultando ofertas activas en Computrabajo, Indeed, LinkedIn y OCC compatibles con tu perfil.
                </p>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Tailored CV Modal */}
      <TailoredResumeModal
        isOpen={isCvModalOpen}
        onClose={() => setIsCvModalOpen(false)}
        job={selectedJobForCv}
        tailoredCv={tailoredCv}
        candidateName={profile?.fullName || 'Candidato'}
      />

      {/* Sales Pitch Modal */}
      <SalesPitchModal
        isOpen={isPitchModalOpen}
        onClose={() => setIsPitchModalOpen(false)}
        job={selectedJobForPitch}
        salesPitch={salesPitch}
        candidateName={profile?.fullName || 'Candidato'}
      />

      {/* Google Sync Hub Modal */}
      <GoogleSyncModal
        isOpen={isGoogleSyncModalOpen}
        onClose={() => setIsGoogleSyncModalOpen(false)}
        user={user}
        onSignIn={handleGoogleSignIn}
        onSignOut={handleSignOut}
        currentProfile={profile}
        onRestoreProfile={handleRestoreProfile}
        onManualSync={handleManualSync}
        isSyncing={isSyncing}
        lastSyncTime={lastSyncTime}
      />

      <Footer />
    </div>
  );
}
