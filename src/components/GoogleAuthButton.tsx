import React from 'react';
import { User } from 'firebase/auth';
import { LogOut, Cloud, CheckCircle2, ChevronDown } from 'lucide-react';

interface GoogleAuthButtonProps {
  user: User | null;
  onSignIn: () => void;
  onSignOut: () => void;
  variant?: 'navbar' | 'hero' | 'compact';
  loading?: boolean;
}

export const GoogleLogoSvg = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      fill="#EA4335"
    />
  </svg>
);

export const GoogleAuthButton: React.FC<GoogleAuthButtonProps> = ({
  user,
  onSignIn,
  onSignOut,
  variant = 'navbar',
  loading = false,
}) => {
  if (user) {
    if (variant === 'compact') {
      return (
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
          <GoogleLogoSvg className="w-3.5 h-3.5" />
          <span className="max-w-[100px] truncate text-white font-medium">
            {user.displayName?.split(' ')[0] || user.email?.split('@')[0]}
          </span>
          <button
            type="button"
            onClick={onSignOut}
            title="Cerrar sesión"
            className="text-slate-500 hover:text-rose-400 p-0.5 ml-1 transition cursor-pointer"
          >
            <LogOut className="w-3 h-3" />
          </button>
        </div>
      );
    }

    return (
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xs">
          {user.photoURL ? (
            <img
              src={user.photoURL}
              alt={user.displayName || 'Google User'}
              className="w-6 h-6 rounded-full border border-emerald-500/50"
            />
          ) : (
            <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white text-[11px] font-bold">
              {user.displayName?.charAt(0) || user.email?.charAt(0) || 'G'}
            </div>
          )}
          <div className="flex flex-col text-left">
            <span className="text-xs font-bold text-white leading-tight truncate max-w-[130px]">
              {user.displayName || user.email?.split('@')[0]}
            </span>
            <span className="text-[10px] text-emerald-400 leading-tight flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Google Conectado
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={onSignOut}
          title="Cerrar sesión de Google"
          className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 border border-slate-800 hover:border-rose-500/30 transition cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    );
  }

  // Not signed in
  if (variant === 'hero') {
    return (
      <button
        type="button"
        onClick={onSignIn}
        disabled={loading}
        className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs sm:text-sm shadow-xl shadow-white/5 transition flex items-center justify-center gap-3 border border-slate-200 cursor-pointer disabled:opacity-50"
      >
        <GoogleLogoSvg className="w-4 h-4" />
        <span>Iniciar sesión con Google</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onSignIn}
      disabled={loading}
      className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs shadow-md transition flex items-center gap-2 border border-slate-200 cursor-pointer disabled:opacity-50 group"
    >
      <GoogleLogoSvg className="w-4 h-4 group-hover:scale-105 transition-transform" />
      <span>Google Auth</span>
    </button>
  );
};
