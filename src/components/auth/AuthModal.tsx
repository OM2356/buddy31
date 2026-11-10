import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useAccessibility } from '../../context/AccessibilityContext';
import {
  X,
  User,
  Shield,
  Heart,
  Lock,
  Mail,
  CheckCircle2,
  Users,
  Settings,
  LogIn,
  UserPlus,
} from 'lucide-react';
import { UserRole } from '../../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const {
    currentUser,
    userProfile,
    loginWithEmail,
    registerWithEmail,
    loginWithGoogle,
    logout,
    switchDemoRole,
    isDemoUser,
  } = useAuth();
  const { playTapSound } = useAccessibility();

  const [mode, setMode] = useState<'login' | 'register' | 'profile'>('profile');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<UserRole>('elder');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);
    playTapSound();
    try {
      await loginWithEmail(email, password);
      onClose();
    } catch (err: any) {
      setErrorMsg(err.message || 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);
    playTapSound();
    try {
      await registerWithEmail(name, email, password, role);
      onClose();
    } catch (err: any) {
      setErrorMsg(err.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setErrorMsg(null);
    setLoading(true);
    playTapSound();
    try {
      await loginWithGoogle();
      onClose();
    } catch (err: any) {
      setErrorMsg(err.message || 'Google sign-in cancelled or failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border-2 border-slate-200 overflow-hidden animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-600 rounded-xl">
              <User className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-black">Account & Role Center</h3>
              <p className="text-xs text-slate-300">Firebase Authentication & Role Management</p>
            </div>
          </div>
          <button
            onClick={() => {
              playTapSound();
              onClose();
            }}
            className="p-2 text-slate-400 hover:text-white rounded-lg cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Quick 1-Click Role Switcher for instant testing */}
          <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-4 space-y-3">
            <span className="text-xs font-black uppercase tracking-wider text-blue-900 block">
              1-Click Instant Role Switcher (Live Testing):
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => {
                  playTapSound();
                  switchDemoRole('elder');
                }}
                className={`p-3 rounded-xl border-2 text-xs font-black flex flex-col items-center gap-1 transition-all cursor-pointer ${
                  userProfile?.role === 'elder'
                    ? 'bg-blue-600 border-blue-600 text-white shadow-sm'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Heart className="w-4 h-4" />
                <span>Senior Mode</span>
              </button>

              <button
                onClick={() => {
                  playTapSound();
                  switchDemoRole('caregiver');
                }}
                className={`p-3 rounded-xl border-2 text-xs font-black flex flex-col items-center gap-1 transition-all cursor-pointer ${
                  userProfile?.role === 'caregiver'
                    ? 'bg-blue-600 border-blue-600 text-white shadow-sm'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Users className="w-4 h-4" />
                <span>Family Mode</span>
              </button>

              <button
                onClick={() => {
                  playTapSound();
                  switchDemoRole('admin');
                }}
                className={`p-3 rounded-xl border-2 text-xs font-black flex flex-col items-center gap-1 transition-all cursor-pointer ${
                  userProfile?.role === 'admin'
                    ? 'bg-blue-600 border-blue-600 text-white shadow-sm'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Settings className="w-4 h-4" />
                <span>Admin Mode</span>
              </button>
            </div>
          </div>

          {/* Current Profile Card */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-[11px] font-black uppercase tracking-wider text-slate-400">
                Active User Profile:
              </span>
              <h4 className="font-bold text-base text-slate-900">{userProfile?.name}</h4>
              <p className="text-xs text-slate-500">{userProfile?.email}</p>
            </div>

            <div className="text-right">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-lg text-xs font-black uppercase">
                {userProfile?.role}
              </span>
              {isDemoUser && (
                <span className="block text-[10px] text-amber-600 font-bold mt-1">
                  Local Live Demo
                </span>
              )}
            </div>
          </div>

          {/* Tab Selector between Login / Register */}
          <div className="flex border-b border-slate-200">
            <button
              onClick={() => setMode('profile')}
              className={`pb-3 px-4 font-bold text-sm ${
                mode === 'profile' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-slate-500'
              }`}
            >
              Current Status
            </button>
            <button
              onClick={() => setMode('login')}
              className={`pb-3 px-4 font-bold text-sm ${
                mode === 'login' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-slate-500'
              }`}
            >
              Email Login
            </button>
            <button
              onClick={() => setMode('register')}
              className={`pb-3 px-4 font-bold text-sm ${
                mode === 'register' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-slate-500'
              }`}
            >
              Create Account
            </button>
          </div>

          {errorMsg && (
            <div className="p-3 bg-rose-50 border border-rose-300 text-rose-800 rounded-xl text-xs font-bold">
              {errorMsg}
            </div>
          )}

          {mode === 'profile' && (
            <div className="space-y-3">
              <button
                onClick={handleGoogleLogin}
                className="w-full py-3.5 border-2 border-slate-300 hover:bg-slate-50 font-bold text-slate-800 rounded-2xl flex items-center justify-center gap-2 shadow-2xs cursor-pointer transition-colors"
              >
                <img
                  src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                  className="w-5 h-5"
                  alt="Google"
                />
                <span>Sign in with Google</span>
              </button>

              <button
                onClick={() => {
                  playTapSound();
                  logout();
                }}
                className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm rounded-xl cursor-pointer"
              >
                Log Out / Reset to Default
              </button>
            </div>
          )}

          {mode === 'login' && (
            <form onSubmit={handleLogin} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full p-3 border-2 border-slate-200 rounded-xl text-sm font-semibold focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full p-3 border-2 border-slate-200 rounded-xl text-sm font-semibold focus:outline-none focus:border-blue-600"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-black text-base rounded-2xl shadow-md cursor-pointer disabled:bg-slate-400"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>
          )}

          {mode === 'register' && (
            <form onSubmit={handleRegister} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Savitri Devi"
                  className="w-full p-3 border-2 border-slate-200 rounded-xl text-sm font-semibold focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full p-3 border-2 border-slate-200 rounded-xl text-sm font-semibold focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                  Password (min 6 characters)
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full p-3 border-2 border-slate-200 rounded-xl text-sm font-semibold focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                  Select Role
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as UserRole)}
                  className="w-full p-3 border-2 border-slate-200 rounded-xl text-sm font-bold focus:outline-none focus:border-blue-600"
                >
                  <option value="elder">Elderly User (Senior Mode)</option>
                  <option value="caregiver">Family / Caregiver</option>
                  <option value="admin">Administrator</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-black text-base rounded-2xl shadow-md cursor-pointer disabled:bg-slate-400"
              >
                {loading ? 'Creating Account...' : 'Register Account'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
