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
  const [user, setUser] = useState<ExtendedUserProfile | null>(null);

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
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    try {
      await firebaseSignOut(auth);
    } catch (e) {
      console.error("Firebase signOut error", e);
    }
    setUser(null);
    setFirebaseUser(null);
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
      if (!prev) return null;
      const updated: ExtendedUserProfile = { 
        ...prev, 
        ...updatedFields,
        initials: getInitials(updatedFields.name || prev.name, updatedFields.email || prev.email)
      };
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
    <AuthContext.Provider value={{ user, firebaseUser, isLoading, logout, updateUserProfile, updateUserStats }}>
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
