import React from 'react';
import { Briefcase, ShieldCheck, Sparkles, ExternalLink, Globe } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 text-xs py-10 border-t border-slate-800 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
                <Briefcase className="w-4 h-4" />
              </div>
              <span className="text-base font-bold text-white tracking-tight">
                CazaEmpleos <span className="text-blue-400">AI</span>
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-md">
              La plataforma que unifica la búsqueda de empleo en todas las bolsas (Indeed, Computrabajo, LinkedIn, OCC Mundial), analiza tu experiencia laboral, extrae propuestas de alta compatibilidad y genera tanto tu CV adaptado como tu Sales Pitch de postulación orientado a resolver los dolores del empleador.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3">Bolsas Integradas</h4>
            <ul className="space-y-1.5 text-slate-400">
              <li>Computrabajo (México, Colombia, Perú, Argentina)</li>
              <li>Indeed (Búsqueda Global y LATAM)</li>
              <li>LinkedIn Jobs (Red Profesional)</li>
              <li>OCC Mundial & InfoJobs</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3">Ventajas Clave</h4>
            <ul className="space-y-1.5 text-slate-400">
              <li>⚡ 5 o 10 propuestas automáticas por ciclo</li>
              <li>🎯 CV Tailored con palabras clave ATS</li>
              <li>🔥 Sales Pitch de alta conversión comercial</li>
              <li>🔗 Links directos para aplicar en 1 clic</li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500">
          <p>© {new Date().getFullYear()} CazaEmpleos AI. Diseñado para acelerar tu contratación.</p>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Procesamiento confidencial y seguro de tu experiencia laboral</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
