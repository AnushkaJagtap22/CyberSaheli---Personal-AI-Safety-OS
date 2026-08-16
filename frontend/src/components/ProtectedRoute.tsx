import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { ShieldCheck, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, firebaseUser, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0b] flex flex-col items-center justify-center font-sans text-white space-y-4">
        <div className="p-4 rounded-2xl bg-[#4f8cff]/20 text-[#4f8cff] border border-[#4f8cff]/30 shadow-xl animate-pulse">
          <ShieldCheck className="h-10 w-10 text-[#4f8cff]" />
        </div>
        <div className="flex items-center space-x-2 text-sm text-[#8b909b]">
          <Loader2 className="h-4 w-4 animate-spin text-[#4f8cff]" />
          <span>Checking your session...</span>
        </div>
      </div>
    );
  }

  if (!firebaseUser && !user) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
