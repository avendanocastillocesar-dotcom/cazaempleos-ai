import React, { useState, useRef, useEffect } from 'react';
import {
  Upload,
  FileText,
  Mail,
  User as UserIcon,
  Sparkles,
  MapPin,
  Building,
  CheckCircle2,
  Sliders,
  ArrowRight,
  Loader2,
  FileCheck,
  AlertCircle,
  HelpCircle,
  Briefcase,
  Laptop,
  Globe2,
  Check,
  Code,
  TrendingUp,
  FileSpreadsheet
} from 'lucide-react';
import { User as FirebaseUser } from 'firebase/auth';
import { SAMPLE_PROFILES, SampleProfilePreset } from '../data/sampleProfiles';
import { GoogleLogoSvg } from './GoogleAuthButton';

interface CvUploadSectionProps {
  onAnalyzeAndSearch: (params: {
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
  }) => Promise<void>;
  isLoading: boolean;
  loadingStepText: string;
  user?: FirebaseUser | null;
  onGoogleSignIn?: () => void;
}

export const CvUploadSection: React.FC<CvUploadSectionProps> = ({
  onAnalyzeAndSearch,
  isLoading,
  loadingStepText,
  user,
  onGoogleSignIn,
}) => {
  const [email, setEmail] = useState('avendanocastillocesar@gmail.com');
  const [fullName, setFullName] = useState('César Avendaño');

  useEffect(() => {
    if (user) {
      if (user.email) setEmail(user.email);
      if (user.displayName) setFullName(user.displayName);
    }
  }, [user]);
  const [inputMode, setInputMode] = useState<'upload' | 'text'>('upload');
  const [cvText, setCvText] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileBase64, setFileBase64] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  // Workflow Search Preferences
  const [jobCount, setJobCount] = useState<number>(5);
  const [countryLocation, setCountryLocation] = useState<string>('México (o Remoto LATAM)');
  const [modality, setModality] = useState<string>('Remoto o Híbrido');
  const [customKeywords, setCustomKeywords] = useState<string>('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    processFile(file);
  };

  const processFile = (file: File) => {
    setFileError(null);
    setSelectedFile(file);

    if (file.type.includes('text') || file.name.endsWith('.txt') || file.name.endsWith('.md')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        setCvText(text);
      };
      reader.readAsText(file);
    }

    const b64Reader = new FileReader();
    b64Reader.onload = (event) => {
      const result = event.target?.result as string;
      const base64Data = result.split(',')[1];
      setFileBase64(base64Data);
    };
    b64Reader.onerror = () => {
      setFileError('Error al leer el archivo. Intenta pegando el texto directamente.');
    };
    b64Reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleSelectPreset = (preset: SampleProfilePreset) => {
    setEmail(preset.email);
    setFullName(preset.name);
    setCvText(preset.cvText);
    setSelectedFile(null);
    setFileBase64(null);
    setInputMode('text');
  };

  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    if (!email) {
      setFormError('Por favor ingresa tu correo electrónico para vincular tu postulación.');
      return;
    }
    if (!cvText && !fileBase64) {
      setFormError('Por favor sube tu currículum (PDF/Word/Texto) o selecciona un perfil de prueba.');
      return;
    }

    onAnalyzeAndSearch({
      email,
      fullName,
      cvText,
      cvBase64: fileBase64 || undefined,
      mimeType: selectedFile?.type || (fileBase64 ? 'application/pdf' : undefined),
      fileName: selectedFile?.name,
      jobCount,
      countryLocation,
      modality,
      customKeywords,
    });
  };

  const locationPresets = [
    'México (o Remoto LATAM)',
    'Remoto Global (USD)',
    'Colombia & LATAM',
    'España / Europa',
    'Estados Unidos',
  ];

  const modalityPresets = ['Remoto o Híbrido', '100% Remoto', 'Híbrido', 'Presencial'];

  return (
    <div className="space-y-10">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto pt-4 pb-2 space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold tracking-wide uppercase">
          <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
          Rastreo de Vacantes con Google Search & Gemini 2.5
        </div>

        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
          Consigue empleo con <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
            ventaja algorítmica y postulación a medida
          </span>
        </h2>

        <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Sube tu currículum o selecciona un perfil demo. Nuestro motor rastrea vacantes reales en tiempo real, diagnostica tu compatibilidad ATS y redacta cartas de ventas directas para el reclutador.
        </p>
      </div>

      {/* Main Configuration Card */}
      <div className="bg-slate-900/70 backdrop-blur-xl rounded-3xl border border-slate-800/90 shadow-2xl p-6 sm:p-10 space-y-8">
        {/* Sample Profile Presets Row */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-400" />
              ¿Quieres probar rápido? Usa un perfil preconfigurado:
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {SAMPLE_PROFILES.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => handleSelectPreset(preset)}
                className="group p-4 rounded-2xl bg-slate-950/60 hover:bg-slate-800/60 border border-slate-800 hover:border-blue-500/40 text-left transition duration-200 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-white group-hover:text-blue-400 transition">
                      {preset.name}
                    </span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      {preset.experienceYears}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-2 leading-snug">
                    {preset.headline}
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-500 group-hover:text-blue-300">
                  <span>Cargar datos</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition" />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {formError && (
            <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs sm:text-sm flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
              <span>{formError}</span>
            </div>
          )}

          {/* Google Auth Banner */}
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-inner">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-sm">
                <GoogleLogoSvg className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-white flex items-center gap-2">
                  <span>Google Authentication</span>
                  {user ? (
                    <span className="text-[10px] text-emerald-400 font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30">
                      ● Conectado
                    </span>
                  ) : (
                    <span className="text-[10px] text-blue-400 font-semibold px-2 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20">
                      Sync en la nube
                    </span>
                  )}
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  {user
                    ? `Sesión activa con ${user.displayName || user.email}. Tus postulaciones se sincronizan en Firestore.`
                    : 'Inicia sesión con Google para autocompletar tus datos y guardar tus vacantes favoritas.'}
                </p>
              </div>
            </div>

            {!user && onGoogleSignIn && (
              <button
                type="button"
                onClick={onGoogleSignIn}
                className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs shadow-sm transition flex items-center justify-center gap-2 shrink-0 cursor-pointer"
              >
                <GoogleLogoSvg className="w-3.5 h-3.5" />
                <span>Acceder con Google</span>
              </button>
            )}
          </div>

          {/* User Basic Info Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-blue-400" />
                <span>Correo Electrónico (Para Google Sync)</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ejemplo@gmail.com"
                required
                className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <UserIcon className="w-3.5 h-3.5 text-indigo-400" />
                <span>Nombre Completo</span>
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Tu Nombre"
                className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition"
              />
            </div>
          </div>

          {/* Mode Switcher & CV Input */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-blue-400" />
                <span>Currículum Vitae</span>
              </span>

              {/* Pill tabs */}
              <div className="flex items-center p-1 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                <button
                  type="button"
                  onClick={() => setInputMode('upload')}
                  className={`px-3 py-1 rounded-lg font-bold transition cursor-pointer ${
                    inputMode === 'upload'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Subir Archivo
                </button>
                <button
                  type="button"
                  onClick={() => setInputMode('text')}
                  className={`px-3 py-1 rounded-lg font-bold transition cursor-pointer ${
                    inputMode === 'text'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Pegar Texto
                </button>
              </div>
            </div>

            {inputMode === 'upload' ? (
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={() => fileInputRef.current?.click()}
                className={`relative group border-2 border-dashed rounded-3xl p-8 text-center transition-all cursor-pointer ${
                  selectedFile
                    ? 'border-emerald-500/50 bg-emerald-500/5'
                    : 'border-slate-800 hover:border-blue-500/50 bg-slate-950/50 hover:bg-slate-950/80'
                }`}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx,.txt,.md"
                  className="hidden"
                />

                <div className="flex flex-col items-center justify-center space-y-3">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-105 ${
                    selectedFile
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-blue-600/10 text-blue-400 border border-blue-500/20'
                  }`}>
                    {selectedFile ? <FileCheck className="w-7 h-7" /> : <Upload className="w-7 h-7" />}
                  </div>

                  {selectedFile ? (
                    <div>
                      <p className="text-sm font-bold text-white flex items-center justify-center gap-1.5">
                        <Check className="w-4 h-4 text-emerald-400" />
                        {selectedFile.name}
                      </p>
                      <p className="text-xs text-slate-400 mt-1">
                        {(selectedFile.size / 1024).toFixed(1)} KB • Listo para procesar
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-sm font-bold text-white">
                        Arrastra tu CV aquí o <span className="text-blue-400 underline decoration-blue-500/40">haz clic para examinar</span>
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        Soporta PDF, Word (.docx), Markdown o TXT (hasta 35MB)
                      </p>
                    </div>
                  )}

                  <div className="flex items-center gap-2 pt-1 text-[11px] text-slate-500">
                    <span className="px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800">PDF</span>
                    <span className="px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800">DOCX</span>
                    <span className="px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800">TXT</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-1.5">
                <textarea
                  rows={8}
                  value={cvText}
                  onChange={(e) => setCvText(e.target.value)}
                  placeholder="Pega aquí el contenido de tu currículum (experiencia, habilidades, estudios, idiomas)..."
                  className="w-full px-4 py-3 rounded-2xl bg-slate-950/80 border border-slate-800 text-white placeholder-slate-500 text-xs sm:text-sm font-mono leading-relaxed focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition resize-y"
                />
              </div>
            )}
          </div>

          {/* Search Preferences Section */}
          <div className="p-5 rounded-2xl bg-slate-950/40 border border-slate-800/80 space-y-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <Sliders className="w-4 h-4 text-blue-400" />
                <span>Preferencias de Rastreo de Vacantes</span>
              </span>
              <span className="text-[11px] text-slate-500">Indeed • Computrabajo • LinkedIn • OCC</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Location Select */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-400 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-emerald-400" />
                  <span>Ubicación o País</span>
                </label>
                <select
                  value={countryLocation}
                  onChange={(e) => setCountryLocation(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition cursor-pointer"
                >
                  {locationPresets.map((loc) => (
                    <option key={loc} value={loc} className="bg-slate-900 text-white">
                      {loc}
                    </option>
                  ))}
                </select>
              </div>

              {/* Modality Select */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-400 flex items-center gap-1">
                  <Laptop className="w-3 h-3 text-indigo-400" />
                  <span>Modalidad</span>
                </label>
                <select
                  value={modality}
                  onChange={(e) => setModality(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition cursor-pointer"
                >
                  {modalityPresets.map((mod) => (
                    <option key={mod} value={mod} className="bg-slate-900 text-white">
                      {mod}
                    </option>
                  ))}
                </select>
              </div>

              {/* Vacancy Count */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-400 flex items-center gap-1">
                  <Briefcase className="w-3 h-3 text-blue-400" />
                  <span>Cantidad de Vacantes</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setJobCount(5)}
                    className={`py-2 rounded-xl text-xs font-bold border transition cursor-pointer ${
                      jobCount === 5
                        ? 'bg-blue-600 text-white border-blue-500 shadow-sm'
                        : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                    }`}
                  >
                    5 Vacantes
                  </button>
                  <button
                    type="button"
                    onClick={() => setJobCount(10)}
                    className={`py-2 rounded-xl text-xs font-bold border transition cursor-pointer ${
                      jobCount === 10
                        ? 'bg-blue-600 text-white border-blue-500 shadow-sm'
                        : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                    }`}
                  >
                    10 Vacantes
                  </button>
                </div>
              </div>
            </div>

            {/* Custom Keywords Optional */}
            <div className="space-y-1.5 pt-1">
              <label className="text-[11px] font-bold text-slate-400">
                Palabras clave específicas adicionales (opcional):
              </label>
              <input
                type="text"
                value={customKeywords}
                onChange={(e) => setCustomKeywords(e.target.value)}
                placeholder="Ejemplo: Tech Lead, B2B SaaS, $50,000 MXN+, Inglés C1..."
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:via-indigo-500 hover:to-purple-500 text-white font-extrabold text-sm sm:text-base shadow-xl shadow-blue-600/30 transition transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:transform-none flex items-center justify-center gap-3 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Procesando con Gemini AI...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 text-amber-300" />
                  <span>Analizar CV y Rastrear {jobCount} Vacantes Compatibles</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Loading Overlay / Progress Modal when analyzing */}
      {isLoading && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 max-w-md w-full text-center space-y-6 shadow-2xl animate-fadeIn">
            <div className="relative w-16 h-16 mx-auto">
              <div className="absolute inset-0 rounded-2xl bg-blue-500/20 animate-ping" />
              <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-xl shadow-blue-500/30">
                <Sparkles className="w-8 h-8 animate-spin" />
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-bold text-white">IA Analizando tu Perfil</h3>
              <p className="text-xs text-blue-400 font-medium">{loadingStepText || 'Iniciando conexión...'}</p>
            </div>

            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full w-2/3 animate-pulse rounded-full" />
            </div>

            <p className="text-[11px] text-slate-500">
              Rastreando bolsas activas y calculando tu puntuación de compatibilidad ATS...
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
