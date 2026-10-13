import React, { useState, useRef } from 'react';
import {
  Upload,
  FileText,
  Mail,
  User,
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
  Briefcase
} from 'lucide-react';
import { SAMPLE_PROFILES, SampleProfilePreset } from '../data/sampleProfiles';

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
}

export const CvUploadSection: React.FC<CvUploadSectionProps> = ({
  onAnalyzeAndSearch,
  isLoading,
  loadingStepText,
}) => {
  const [email, setEmail] = useState('avendanocastillocesar@gmail.com');
  const [fullName, setFullName] = useState('César Avendaño');
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

    // If text or markdown, read as text directly
    if (file.type.includes('text') || file.name.endsWith('.txt') || file.name.endsWith('.md')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        setCvText(text);
      };
      reader.readAsText(file);
    }

    // Also convert to base64 for PDF / docs processing via Gemini multimodal
    const b64Reader = new FileReader();
    b64Reader.onload = (event) => {
      const result = event.target?.result as string;
      // split off data URL prefix (e.g. data:application/pdf;base64,)
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
      setFormError('Por favor ingresa tu correo electrónico para registrar tu postulación.');
      return;
    }
    if (!cvText && !fileBase64) {
      setFormError('Por favor sube tu currículum (PDF/Word/Texto) o selecciona un perfil de prueba arriba.');
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

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden mb-8">
      {/* Top Banner inside card */}
      <div className="p-6 sm:p-8 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-blue-300" />
            Flujo Automatizado de Reclutamiento & Postulación
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
            Encuentra vacantes en todas las bolsas y aplica con ventaja absoluta
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            La app analiza tu currículum, busca ofertas reales en <strong>Indeed</strong>, <strong>Computrabajo</strong>, <strong>LinkedIn</strong> y <strong>OCC</strong>, te entrega tus 5 o 10 mejores propuestas, redacta un <strong>CV adaptado a cada vacante</strong> y crea un <strong>Sales Pitch comercial</strong> para vender tu perfil al empleador.
          </p>

          {/* Quick presets pills */}
          <div className="mt-5 pt-4 border-t border-slate-800">
            <p className="text-xs text-slate-400 font-medium mb-2 flex items-center gap-1.5">
              <span>⚡ ¿Quieres probar de inmediato? Selecciona un perfil de prueba:</span>
            </p>
            <div className="flex flex-wrap gap-2">
              {SAMPLE_PROFILES.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => handleSelectPreset(preset)}
                  className="px-2.5 py-1 text-xs rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:border-blue-400 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span className="font-medium">{preset.name}</span>
                  <span className="text-slate-400 text-[11px]">({preset.targetRole})</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Form content */}
      <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
        {/* Step 1 User Info */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">1</span>
            <h3 className="text-base font-bold text-slate-900">Datos de registro & Contexto</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Correo Electrónico <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu.correo@ejemplo.com"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-sm text-slate-900 outline-hidden transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Nombre Completo (opcional, se extrae del CV)
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Ej. César Avendaño"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-sm text-slate-900 outline-hidden transition"
                />
              </div>
            </div>
          </div>
        </div>

        {/* CV Input Mode (Upload or Paste) */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
              <span>Currículum Vitae (Contexto de experiencia)</span>
              <span className="text-rose-500">*</span>
            </label>
            <div className="flex bg-slate-100 p-0.5 rounded-lg text-xs">
              <button
                type="button"
                onClick={() => setInputMode('upload')}
                className={`px-3 py-1 rounded-md font-medium transition ${
                  inputMode === 'upload' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Subir Archivo (PDF / Doc)
              </button>
              <button
                type="button"
                onClick={() => setInputMode('text')}
                className={`px-3 py-1 rounded-md font-medium transition ${
                  inputMode === 'text' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Pegar Texto / Markdown
              </button>
            </div>
          </div>

          {inputMode === 'upload' ? (
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-6 sm:p-8 text-center cursor-pointer transition-all ${
                selectedFile
                  ? 'border-emerald-400 bg-emerald-50/50'
                  : 'border-slate-300 hover:border-blue-500 hover:bg-blue-50/30'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.docx,.doc,.txt,.md,image/png,image/jpeg"
                onChange={handleFileChange}
                className="hidden"
              />

              {selectedFile ? (
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-2">
                    <FileCheck className="w-6 h-6" />
                  </div>
                  <p className="text-sm font-bold text-slate-900">{selectedFile.name}</p>
                  <p className="text-xs text-slate-500 mt-1">
                    {(selectedFile.size / 1024).toFixed(1)} KB — Listo para ser analizado por Gemini
                  </p>
                  <span className="mt-3 text-xs font-semibold text-blue-600 hover:underline">
                    Haz clic para cambiar de archivo
                  </span>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
                    <Upload className="w-6 h-6" />
                  </div>
                  <p className="text-sm font-bold text-slate-800">
                    Arrastra y suelta tu CV aquí o <span className="text-blue-600 underline">examina tus archivos</span>
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Formatos soportados: PDF, Word (DOCX), Texto plano (.txt) o Markdown
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div>
              <textarea
                rows={6}
                value={cvText}
                onChange={(e) => setCvText(e.target.value)}
                placeholder="Pega aquí el contenido de tu currículum (experiencia, cargos, empresas, logros, tecnologías, formación y habilidades)..."
                className="w-full p-4 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-xs sm:text-sm font-mono text-slate-800 outline-hidden transition leading-relaxed"
              />
              <p className="text-xs text-slate-400 mt-1">
                Tip: Mientras más detalle incluyas sobre tus logros y tecnologías, más precisas serán las propuestas de empleo y el Sales Pitch.
              </p>
            </div>
          )}

          {fileError && (
            <div className="mt-2 text-xs text-rose-600 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{fileError}</span>
            </div>
          )}
        </div>

        {/* Step 2 Search & Aggregator Settings */}
        <div className="pt-4 border-t border-slate-100">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center">2</span>
            <h3 className="text-base font-bold text-slate-900">Parámetros de Búsqueda en Bolsas de Empleo</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Number of Jobs (5 or 10 as requested) */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center justify-between">
                <span>Propuestas por ciclo</span>
                <span className="text-blue-600 font-bold">{jobCount} ofertas</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setJobCount(5)}
                  className={`py-2 px-3 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                    jobCount === 5
                      ? 'bg-blue-50 border-blue-600 text-blue-700 shadow-xs'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  5 Propuestas (Rápido)
                </button>
                <button
                  type="button"
                  onClick={() => setJobCount(10)}
                  className={`py-2 px-3 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                    jobCount === 10
                      ? 'bg-blue-50 border-blue-600 text-blue-700 shadow-xs'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <Briefcase className="w-3.5 h-3.5" />
                  10 Propuestas (Amplio)
                </button>
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Ubicación / País objetivo
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={countryLocation}
                  onChange={(e) => setCountryLocation(e.target.value)}
                  placeholder="Ej. México, Colombia, España, Remoto..."
                  className="w-full pl-10 pr-3.5 py-2 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-xs sm:text-sm text-slate-900 outline-hidden transition"
                />
              </div>
            </div>

            {/* Modality */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Modalidad Preferida
              </label>
              <select
                value={modality}
                onChange={(e) => setModality(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-xs sm:text-sm text-slate-900 outline-hidden transition bg-white"
              >
                <option value="Remoto o Híbrido">Remoto o Híbrido</option>
                <option value="100% Remoto">100% Remoto</option>
                <option value="Híbrido">Híbrido</option>
                <option value="Presencial">Presencial</option>
                <option value="Cualquiera">Cualquiera</option>
              </select>
            </div>
          </div>

          {/* Optional extra keywords */}
          <div className="mt-3">
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Filtro adicional o tecnologías deseadas (opcional)
            </label>
            <input
              type="text"
              value={customKeywords}
              onChange={(e) => setCustomKeywords(e.target.value)}
              placeholder="Ej. React, TypeScript, B2B SaaS, Gerencia, Salario en USD, etc."
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-xs sm:text-sm text-slate-900 outline-hidden transition"
            />
          </div>
        </div>

        {/* Supported Portals Badges */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/60 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-800">Bolsas rastreadas:</span>
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="bg-orange-100 text-orange-800 font-bold px-2 py-0.5 rounded-md border border-orange-200">
                Computrabajo
              </span>
              <span className="bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded-md border border-blue-200">
                Indeed
              </span>
              <span className="bg-sky-100 text-sky-800 font-bold px-2 py-0.5 rounded-md border border-sky-200">
                LinkedIn Jobs
              </span>
              <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-md border border-emerald-200">
                OCC Mundial
              </span>
              <span className="bg-purple-100 text-purple-800 font-bold px-2 py-0.5 rounded-md border border-purple-200">
                Glassdoor
              </span>
            </div>
          </div>
          <span className="text-[11px] text-slate-500 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Links directos a cada portal
          </span>
        </div>

        {formError && (
          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{formError}</span>
          </div>
        )}

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 px-6 rounded-xl font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-800 shadow-md shadow-blue-500/25 transition-all flex items-center justify-center gap-3 text-base cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin text-white" />
                <span>{loadingStepText || 'Procesando experiencia y buscando en bolsas de empleo...'}</span>
              </>
            ) : (
              <>
                <span>Analizar CV y Cazar {jobCount} Empleos Potenciales</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
