import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, UserCheck, ShieldAlert, ArrowRight, Lock, Mail, User, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { 
  auth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  updateProfile, 
  sendPasswordResetEmail 
} from '../services/firebase';

export const Auth: React.FC = () => {
  const navigate = useNavigate();
  const { loginAsUser, loginAsAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState<'login' | 'register' | 'forgot'>('login');
  const [role, setRole] = useState<'user' | 'institution' | 'admin'>('user');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    try {
      if (activeTab === 'login') {
        await signInWithEmailAndPassword(auth, email, password);
        navigate('/app');
      } else if (activeTab === 'register') {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        if (name.trim()) {
          await updateProfile(userCredential.user, { displayName: name });
        }
        navigate('/app');
      } else if (activeTab === 'forgot') {
        await sendPasswordResetEmail(auth, email);
        setMessage("Password reset instructions have been sent to your email address.");
      }
    } catch (err: any) {
      console.error("Firebase auth error:", err);
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        setError('Invalid email address or password.');
      } else if (err.code === 'auth/email-already-in-use') {
        setError('An account with this email address already exists.');
      } else if (err.code === 'auth/weak-password') {
        setError('Password should be at least 6 characters.');
      } else {
        // Fallback for offline or unconfigured Firebase project
        if (role === 'admin') loginAsAdmin();
        else loginAsUser();
        navigate('/app');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDemoUser = () => {
    loginAsUser();
    navigate('/app');
  };

  const handleDemoAdmin = () => {
    loginAsAdmin();
    navigate('/app');
  };

  return (
    <div className="min-h-screen bg-[#0a0a0b] flex flex-col justify-center py-12 px-6 lg:px-8 relative overflow-hidden font-sans text-[#ffffff] selection:bg-[#4f8cff] selection:text-white">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#4f8cff]/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 text-center space-y-2">
        <div className="flex justify-center items-center space-x-3 mb-4 cursor-pointer" onClick={() => navigate('/')}>
          <div className="p-3 rounded-2xl bg-[#4f8cff] text-white shadow-xl shadow-[#4f8cff]/30">
            <ShieldCheck className="h-8 w-8 text-white" />
          </div>
          <span className="text-3xl font-extrabold tracking-tight text-white">
            Cyber<span className="gradient-text-blue">Saheli</span>
          </span>
        </div>
        <h2 className="text-2xl font-bold text-white tracking-tight">
          {activeTab === 'login' ? 'Welcome Back to Your Safety Shield' : activeTab === 'register' ? 'Create Your CyberSaheli Account' : 'Reset Your Password'}
        </h2>
        <p className="text-xs text-[#8b909b]">
          AI Digital Bodyguard for Women • Detect, Protect, Empower
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="titanium-card py-8 px-6 shadow-2xl rounded-3xl border border-[rgba(255,255,255,0.08)] sm:px-10 space-y-6">
          
          {/* Quick Demo Switchers */}
          <div className="p-4 rounded-2xl bg-[#111214] border border-[rgba(255,255,255,0.08)] space-y-2">
            <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#22d3ee] text-center">
              Instant Demo Access
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={handleDemoUser}
                className="py-2.5 px-3 rounded-xl bg-[#4f8cff] hover:bg-[#3b76e5] text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-md transition-all duration-200"
              >
                <UserCheck className="h-4 w-4" />
                Demo User
              </button>
              <button
                type="button"
                onClick={handleDemoAdmin}
                className="py-2.5 px-3 rounded-xl bg-[#8b5cf6] hover:bg-[#7c3aed] text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-md transition-all duration-200"
              >
                <ShieldAlert className="h-4 w-4" />
                Cyber Cell Admin
              </button>
            </div>
          </div>

          {/* Error & Success Messages */}
          {error && (
            <div className="p-3 rounded-xl bg-[#ef4444]/15 border border-[#ef4444]/30 text-[#ef4444] text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {message && (
            <div className="p-3 rounded-xl bg-[#22c55e]/15 border border-[#22c55e]/30 text-[#22c55e] text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
              <span>{message}</span>
            </div>
          )}

          {/* Login / Register Tab Switcher */}
          <div className="flex border-b border-[rgba(255,255,255,0.08)] font-mono text-xs">
            <button
              className={`flex-1 pb-3 font-bold border-b-2 transition-colors ${
                activeTab === 'login'
                  ? 'border-[#4f8cff] text-[#4f8cff]'
                  : 'border-transparent text-[#8b909b] hover:text-[#ffffff]'
              }`}
              onClick={() => { setActiveTab('login'); setError(null); setMessage(null); }}
            >
              Sign In
            </button>
            <button
              className={`flex-1 pb-3 font-bold border-b-2 transition-colors ${
                activeTab === 'register'
                  ? 'border-[#4f8cff] text-[#4f8cff]'
                  : 'border-transparent text-[#8b909b] hover:text-[#ffffff]'
              }`}
              onClick={() => { setActiveTab('register'); setError(null); setMessage(null); }}
            >
              Create Account
            </button>
          </div>

          {/* Role Selector */}
          <div className="space-y-2">
            <label className="block text-[10px] font-mono font-bold text-[#8b909b] uppercase tracking-wider">
              Account Role
            </label>
            <div className="grid grid-cols-3 gap-2 text-xs font-medium">
              <button
                type="button"
                onClick={() => setRole('user')}
                className={`py-2 rounded-xl border transition-all duration-200 ${
                  role === 'user'
                    ? 'bg-[#4f8cff]/20 border-[#4f8cff] text-[#4f8cff] font-bold'
                    : 'bg-[#111214] border-[rgba(255,255,255,0.08)] text-[#8b909b] hover:text-[#ffffff]'
                }`}
              >
                Individual
              </button>
              <button
                type="button"
                onClick={() => setRole('institution')}
                className={`py-2 rounded-xl border transition-all duration-200 ${
                  role === 'institution'
                    ? 'bg-[#4f8cff]/20 border-[#4f8cff] text-[#4f8cff] font-bold'
                    : 'bg-[#111214] border-[rgba(255,255,255,0.08)] text-[#8b909b] hover:text-[#ffffff]'
                }`}
              >
                College/NGO
              </button>
              <button
                type="button"
                onClick={() => setRole('admin')}
                className={`py-2 rounded-xl border transition-all duration-200 ${
                  role === 'admin'
                    ? 'bg-[#4f8cff]/20 border-[#4f8cff] text-[#4f8cff] font-bold'
                    : 'bg-[#111214] border-[rgba(255,255,255,0.08)] text-[#8b909b] hover:text-[#ffffff]'
                }`}
              >
                Cyber Cell
              </button>
            </div>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {activeTab === 'register' && (
              <div>
                <label className="block text-xs font-medium text-[#c6c8d1] mb-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3.5 h-4 w-4 text-[#4f8cff]" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="CyberSaheli User"
                    className="w-full input-titanium text-xs pl-10 placeholder-[#8b909b]"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-[#c6c8d1] mb-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-[#4f8cff]" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="user@cybersaheli.org"
                  className="w-full input-titanium text-xs pl-10 placeholder-[#8b909b]"
                />
              </div>
            </div>

            {activeTab !== 'forgot' && (
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-medium text-[#c6c8d1]">Password</label>
                  {activeTab === 'login' && (
                    <button
                      type="button"
                      onClick={() => setActiveTab('forgot')}
                      className="text-[11px] text-[#4f8cff] hover:underline font-mono"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-[#4f8cff]" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full input-titanium text-xs pl-10 placeholder-[#8b909b]"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary text-xs flex items-center justify-center gap-2 mt-4 py-3.5 disabled:opacity-50"
            >
              {loading ? 'Processing...' : activeTab === 'login' ? 'Sign In to Dashboard' : activeTab === 'register' ? 'Create Free Account' : 'Send Reset Link'}
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
