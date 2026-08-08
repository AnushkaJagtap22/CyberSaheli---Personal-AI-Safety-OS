import React, { createContext, useContext, useState, useEffect } from 'react';
import type { UserProfile } from '../types';

export interface ExtendedUserProfile extends UserProfile {
  platformRole?: string;
  profileStatus?: string;
  linkedAccounts?: {
    linkedin?: { url: string; connected: boolean; verified: boolean; status: string };
    github?: { url: string; connected: boolean; verified: boolean; status: string };
    instagram?: { url: string; connected: boolean; verified: boolean; status: string };
    google?: { url: string; connected: boolean; verified: boolean; status: string };
    facebook?: { url: string; connected: boolean; verified: boolean; status: string };
    microsoft?: { url: string; connected: boolean; verified: boolean; status: string };
  };
  language?: string;
  theme?: string;
}

interface AuthContextType {
  user: ExtendedUserProfile | null;
  isLoading: boolean;
  loginAsUser: () => void;
  loginAsAdmin: () => void;
  logout: () => void;
  updateUserProfile: (updatedFields: Partial<ExtendedUserProfile>) => void;
  updateUserStats: (scansDelta?: number, threatsDelta?: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const defaultUserProfile: ExtendedUserProfile = {
  id: 'usr_saheli_001',
  name: 'Anushka Jagtap',
  email: 'anushka.jagtap@cybersaheli.org',
  role: 'Student | AI & Cybersecurity Enthusiast',
  platformRole: 'Primary User',
  profileStatus: 'Verified User',
  safetyScore: 92,
  streakDays: 14,
  totalScans: 42,
  threatsPrevented: 9,
  evidenceSavedCount: 3,
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
  linkedAccounts: {
    linkedin: {
      url: 'https://www.linkedin.com/in/anushkajagtap/',
      connected: true,
      verified: true,
      status: 'Public Professional Profile'
    },
    github: {
      url: 'https://github.com/AnushkaJagtap229503353458',
      connected: true,
      verified: true,
      status: 'Public Repository Access'
    },
    instagram: { url: '', connected: false, verified: false, status: 'Not Connected' },
    google: { url: '', connected: false, verified: false, status: 'Not Connected' },
    facebook: { url: '', connected: false, verified: false, status: 'Not Connected' },
    microsoft: { url: '', connected: false, verified: false, status: 'Not Connected' }
  },
  language: 'English',
  theme: 'Midnight Titanium'
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<ExtendedUserProfile | null>(() => {
    const saved = localStorage.getItem('cybersaheli_user_profile');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return defaultUserProfile;
      }
    }
    return defaultUserProfile;
  });

  const isLoading = false;

  useEffect(() => {
    if (user) {
      localStorage.setItem('cybersaheli_user_profile', JSON.stringify(user));
    }
  }, [user]);

  const loginAsUser = () => {
    setUser(defaultUserProfile);
  };

  const loginAsAdmin = () => {
    setUser({
      ...defaultUserProfile,
      id: 'adm_saheli_99',
      name: 'Dr. Cyber Admin',
      role: 'System Administrator',
      platformRole: 'Administrator',
    });
  };

  const logout = () => {
    setUser(null);
  };

  const updateUserProfile = (updatedFields: Partial<ExtendedUserProfile>) => {
    setUser((prev) => {
      if (!prev) return defaultUserProfile;
      const updated = { ...prev, ...updatedFields };
      localStorage.setItem('cybersaheli_user_profile', JSON.stringify(updated));
      return updated;
    });
  };

  const updateUserStats = (scansDelta = 1, threatsDelta = 0) => {
    setUser((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        totalScans: prev.totalScans + scansDelta,
        threatsPrevented: prev.threatsPrevented + threatsDelta,
      };
    });
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, loginAsUser, loginAsAdmin, logout, updateUserProfile, updateUserStats }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
