import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  auth, 
  onAuthStateChanged, 
  signOut as firebaseSignOut, 
  updateProfile as firebaseUpdateProfile,
  type FirebaseUser 
} from '../services/firebase';
import type { UserProfile } from '../types';

export interface ExtendedUserProfile extends UserProfile {
  uid?: string;
  platformRole?: string;
  profileStatus?: string;
  initials?: string;
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
  firebaseUser: FirebaseUser | null;
  isLoading: boolean;
  loginAsUser: () => void;
  loginAsAdmin: () => void;
  logout: () => Promise<void>;
  updateUserProfile: (updatedFields: Partial<ExtendedUserProfile>) => Promise<void>;
  updateUserStats: (scansDelta?: number, threatsDelta?: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function getInitials(name?: string, email?: string): string {
  if (name && name.trim().length > 0) {
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  }
  if (email && email.trim().length > 0) {
    return email.slice(0, 2).toUpperCase();
  }
  return 'U';
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<ExtendedUserProfile | null>(() => {
    const saved = localStorage.getItem('cybersaheli_user_profile');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.name && !parsed.name.toLowerCase().includes('anushka')) {
          return parsed;
        }
      } catch (e) {
        // Fallback
      }
    }
    return null;
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (fbUser) => {
      setFirebaseUser(fbUser);
      setIsLoading(false);

      if (fbUser) {
        const displayName = fbUser.displayName || fbUser.email?.split('@')[0] || 'User';
        const userEmail = fbUser.email || 'user@cybersaheli.org';
        const userInitials = getInitials(displayName, userEmail);

        const profile: ExtendedUserProfile = {
          id: fbUser.uid,
          uid: fbUser.uid,
          name: displayName,
          email: userEmail,
          role: 'CyberSaheli Safety User',
          platformRole: 'Verified User',
          profileStatus: 'Active Session',
          safetyScore: 92,
          streakDays: 7,
          totalScans: 12,
          threatsPrevented: 3,
          evidenceSavedCount: 1,
          avatarUrl: fbUser.photoURL || undefined,
          initials: userInitials,
          linkedAccounts: {
            linkedin: { url: '', connected: false, verified: false, status: 'Not Connected' },
            github: { url: '', connected: false, verified: false, status: 'Not Connected' },
            instagram: { url: '', connected: false, verified: false, status: 'Not Connected' },
            google: { url: '', connected: fbUser.providerData.some(p => p.providerId === 'google.com'), verified: true, status: 'OAuth Connected' },
            facebook: { url: '', connected: false, verified: false, status: 'Not Connected' },
            microsoft: { url: '', connected: false, verified: false, status: 'Not Connected' }
          },
          language: 'English',
          theme: 'Midnight Titanium'
        };

        setUser(profile);
        localStorage.setItem('cybersaheli_user_profile', JSON.stringify(profile));
      } else {
        // Check if there is a local session profile
        const saved = localStorage.getItem('cybersaheli_user_profile');
        if (saved) {
          try {
            const parsed = JSON.parse(saved);
            if (parsed && parsed.name && !parsed.name.toLowerCase().includes('anushka')) {
              setUser(parsed);
              return;
            }
          } catch (e) {
            // Ignore
          }
        }
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const loginAsUser = () => {
    const demoProfile: ExtendedUserProfile = {
      id: 'usr_demo_001',
      uid: 'usr_demo_001',
      name: 'CyberSaheli User',
      email: 'user@cybersaheli.org',
      role: 'Cyber Safety User',
      platformRole: 'Verified User',
      profileStatus: 'Active Session',
      safetyScore: 92,
      streakDays: 7,
      totalScans: 12,
      threatsPrevented: 3,
      evidenceSavedCount: 1,
      initials: 'CU',
      language: 'English',
      theme: 'Midnight Titanium'
    };
    setUser(demoProfile);
    localStorage.setItem('cybersaheli_user_profile', JSON.stringify(demoProfile));
  };

  const loginAsAdmin = () => {
    const adminProfile: ExtendedUserProfile = {
      id: 'adm_saheli_99',
      uid: 'adm_saheli_99',
      name: 'Security Analyst',
      email: 'analyst@cybersaheli.org',
      role: 'System Administrator',
      platformRole: 'Administrator',
      profileStatus: 'System Admin',
      safetyScore: 98,
      streakDays: 30,
      totalScans: 150,
      threatsPrevented: 45,
      evidenceSavedCount: 20,
      initials: 'SA',
      language: 'English',
      theme: 'Midnight Titanium'
    };
    setUser(adminProfile);
    localStorage.setItem('cybersaheli_user_profile', JSON.stringify(adminProfile));
  };

  const logout = async () => {
    try {
      await firebaseSignOut(auth);
    } catch (e) {
      console.error("Firebase signOut error", e);
    }
    setUser(null);
    localStorage.removeItem('cybersaheli_user_profile');
  };

  const updateUserProfile = async (updatedFields: Partial<ExtendedUserProfile>) => {
    if (updatedFields.name && auth.currentUser) {
      try {
        await firebaseUpdateProfile(auth.currentUser, { displayName: updatedFields.name });
      } catch (e) {
        console.error("Failed to update Firebase profile displayName", e);
      }
    }

    setUser((prev) => {
      const base: ExtendedUserProfile = prev || {
        id: 'usr_001',
        name: updatedFields.name || 'User',
        email: updatedFields.email || 'user@cybersaheli.org',
        role: 'Cyber Safety User',
        safetyScore: 90,
        streakDays: 1,
        totalScans: 0,
        threatsPrevented: 0,
        evidenceSavedCount: 0
      };
      const updated: ExtendedUserProfile = { 
        ...base, 
        ...updatedFields,
        initials: getInitials(updatedFields.name || base.name, updatedFields.email || base.email)
      };
      localStorage.setItem('cybersaheli_user_profile', JSON.stringify(updated));
      return updated;
    });
  };

  const updateUserStats = (scansDelta = 1, threatsDelta = 0) => {
    setUser((prev) => {
      if (!prev) return null;
      const updated = {
        ...prev,
        totalScans: prev.totalScans + scansDelta,
        threatsPrevented: prev.threatsPrevented + threatsDelta,
      };
      localStorage.setItem('cybersaheli_user_profile', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <AuthContext.Provider value={{ user, firebaseUser, isLoading, loginAsUser, loginAsAdmin, logout, updateUserProfile, updateUserStats }}>
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
