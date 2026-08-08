import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, UserCheck, ShieldAlert, ArrowRight, Lock, Mail, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Auth: React.FC = () => {
  const navigate = useNavigate();
  const { loginAsUser, loginAsAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [role, setRole] = useState<'user' | 'institution' | 'admin'>('user');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (role === 'admin') {
      loginAsAdmin();
    } else {
      loginAsUser();
    }
    navigate('/app');
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
          {activeTab === 'login' ? 'Welcome Back to Your Safety Shield' : 'Create Your CyberSaheli Account'}
        </h2>
        <p className="text-xs text-[#8b909b]">
          AI Digital Bodyguard for Women • Detect, Protect, Empower
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="titanium-card py-8 px-6 shadow-2xl rounded-3xl border border-[rgba(255,255,255,0.08)] sm:px-10 space-y-6">
          
          {/* Quick Demo Login Switchers */}
          <div className="p-4 rounded-2xl bg-[#111214] border border-[rgba(255,255,255,0.08)] space-y-2">
            <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#22d3ee] text-center">
              Instant Hackathon Demo Logins
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

          {/* Login / Register Tab Switcher */}
          <div className="flex border-b border-[rgba(255,255,255,0.08)]">
            <button
              className={`flex-1 pb-3 text-xs font-mono font-bold border-b-2 transition-colors ${
                activeTab === 'login'
                  ? 'border-[#4f8cff] text-[#4f8cff]'
                  : 'border-transparent text-[#8b909b] hover:text-[#ffffff]'
              }`}
              onClick={() => setActiveTab('login')}
            >
              Sign In
            </button>
            <button
              className={`flex-1 pb-3 text-xs font-mono font-bold border-b-2 transition-colors ${
                activeTab === 'register'
                  ? 'border-[#4f8cff] text-[#4f8cff]'
                  : 'border-transparent text-[#8b909b] hover:text-[#ffffff]'
              }`}
              onClick={() => setActiveTab('register')}
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
                    placeholder="Anushka Sharma"
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
                  placeholder="anushka.safety@cybersaheli.org"
                  className="w-full input-titanium text-xs pl-10 placeholder-[#8b909b]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#c6c8d1] mb-1">Password</label>
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

            <button
              type="submit"
              className="w-full btn-primary text-xs flex items-center justify-center gap-2 mt-4 py-3.5"
            >
              {activeTab === 'login' ? 'Sign In to Dashboard' : 'Create Free Account'}
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
