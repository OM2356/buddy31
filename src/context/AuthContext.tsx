import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  User as FirebaseUser,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  signInWithPopup,
  updateProfile
} from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { auth, db, googleProvider, handleFirestoreError, OperationType } from '../firebase';
import { UserProfile, UserRole, Language, FontSize } from '../types';

interface AuthContextType {
  currentUser: FirebaseUser | null;
  userProfile: UserProfile | null;
  loading: boolean;
  loginWithEmail: (email: string, pass: string) => Promise<void>;
  registerWithEmail: (
    name: string,
    email: string,
    pass: string,
    role?: UserRole,
    preferredLanguage?: Language
  ) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  switchDemoRole: (role: UserRole) => void;
  updateUserProfile: (updates: Partial<UserProfile>) => Promise<void>;
  isDemoUser: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_PROFILES: Record<UserRole, UserProfile> = {
  elder: {
    uid: 'demo-elder-dadi',
    name: 'Savitri Devi (Dadi)',
    email: 'dadi.savitri@goldenage.org',
    role: 'elder',
    language: 'en',
    fontSize: 'large',
    highContrast: false,
    speechSpeed: 0.9,
    phone: '+91 98765 43210',
    emergencyContacts: [
      {
        id: 'ec-1',
        name: 'Rohan Sharma (Grandson)',
        relation: 'Grandson',
        phone: '+91 98111 22233',
        email: 'rohan.sharma@example.com',
        isPrimary: true,
      },
      {
        id: 'ec-2',
        name: 'Dr. Anita Joshi (Family Doctor)',
        relation: 'Physician',
        phone: '+91 98222 33344',
        isPrimary: false,
      }
    ],
    connectedCaregiverEmail: 'rohan.sharma@example.com',
    consent: {
      shareLearningProgressWithCaregiver: true,
      shareWellnessWithCaregiver: true,
      allowEmergencyLocation: true,
      allowCaregiverReminders: true,
      allowDailyWellnessCheck: true,
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  caregiver: {
    uid: 'demo-caregiver-rohan',
    name: 'Rohan Sharma (Caregiver)',
    email: 'rohan.caregiver@example.com',
    role: 'caregiver',
    language: 'en',
    fontSize: 'normal',
    highContrast: false,
    speechSpeed: 1.0,
    phone: '+91 98111 22233',
    emergencyContacts: [],
    connectedElderUids: ['demo-elder-dadi'],
    consent: {
      shareLearningProgressWithCaregiver: true,
      shareWellnessWithCaregiver: true,
      allowEmergencyLocation: true,
      allowCaregiverReminders: true,
      allowDailyWellnessCheck: true,
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  admin: {
    uid: 'demo-admin-system',
    name: 'Senior Systems Admin',
    email: 'omkarsathe3103@gmail.com', // bootstrapped admin email
    role: 'admin',
    language: 'en',
    fontSize: 'normal',
    highContrast: false,
    speechSpeed: 1.0,
    phone: '+91 98999 88877',
    emergencyContacts: [],
    consent: {
      shareLearningProgressWithCaregiver: true,
      shareWellnessWithCaregiver: true,
      allowEmergencyLocation: true,
      allowCaregiverReminders: true,
      allowDailyWellnessCheck: true,
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isDemoUser, setIsDemoUser] = useState<boolean>(false);

  // Fetch or create user profile in Firestore
  const syncUserProfile = async (user: FirebaseUser, fallbackRole: UserRole = 'elder') => {
    try {
      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const data = userSnap.data() as UserProfile;
        setUserProfile(data);
      } else {
        // Initial setup for new user
        const isAdmin = user.email === 'omkarsathe3103@gmail.com';
        const newProfile: UserProfile = {
          uid: user.uid,
          name: user.displayName || user.email?.split('@')[0] || 'Elderly Friend',
          email: user.email || '',
          role: isAdmin ? 'admin' : fallbackRole,
          language: 'en',
          fontSize: 'large',
          highContrast: false,
          speechSpeed: 0.9,
          emergencyContacts: [
            {
              id: 'ec-default',
              name: 'Family Member',
              relation: 'Family',
              phone: '112',
              isPrimary: true
            }
          ],
          consent: {
            shareLearningProgressWithCaregiver: true,
            shareWellnessWithCaregiver: true,
            allowEmergencyLocation: true,
            allowCaregiverReminders: true,
            allowDailyWellnessCheck: true,
          },
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        await setDoc(userRef, newProfile);
        setUserProfile(newProfile);
      }
      setIsDemoUser(false);
    } catch (err) {
      console.warn('Firestore profile sync error, falling back to local user profile:', err);
      // Construct local fallback profile from authenticated user
      const localProfile: UserProfile = {
        uid: user.uid,
        name: user.displayName || 'Elderly Friend',
        email: user.email || '',
        role: user.email === 'omkarsathe3103@gmail.com' ? 'admin' : fallbackRole,
        language: 'en',
        fontSize: 'large',
        highContrast: false,
        speechSpeed: 0.9,
        emergencyContacts: [
          {
            id: 'ec-1',
            name: 'Primary Contact',
            relation: 'Family',
            phone: '112',
            isPrimary: true,
          }
        ],
        consent: {
          shareLearningProgressWithCaregiver: true,
          shareWellnessWithCaregiver: true,
          allowEmergencyLocation: true,
          allowCaregiverReminders: true,
          allowDailyWellnessCheck: true,
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setUserProfile(localProfile);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
        await syncUserProfile(user);
      } else {
        setCurrentUser(null);
        // Default to elder demo profile on initial load so the app is instantly usable
        const savedDemoRole = (localStorage.getItem('buddy_demo_role') as UserRole) || 'elder';
        setUserProfile(DEMO_PROFILES[savedDemoRole]);
        setIsDemoUser(true);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithEmail = async (email: string, pass: string) => {
    setLoading(true);
    try {
      const cred = await signInWithEmailAndPassword(auth, email, pass);
      await syncUserProfile(cred.user);
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const registerWithEmail = async (
    name: string,
    email: string,
    pass: string,
    role: UserRole = 'elder',
    preferredLanguage: Language = 'en'
  ) => {
    setLoading(true);
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, pass);
      await updateProfile(cred.user, { displayName: name });
      
      const newProfile: UserProfile = {
        uid: cred.user.uid,
        name,
        email,
        role: email === 'omkarsathe3103@gmail.com' ? 'admin' : role,
        language: preferredLanguage,
        fontSize: 'large',
        highContrast: false,
        speechSpeed: 0.9,
        emergencyContacts: [],
        consent: {
          shareLearningProgressWithCaregiver: true,
          shareWellnessWithCaregiver: true,
          allowEmergencyLocation: true,
          allowCaregiverReminders: true,
          allowDailyWellnessCheck: true,
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      try {
        await setDoc(doc(db, 'users', cred.user.uid), newProfile);
      } catch (err) {
        console.warn('Could not write profile to Firestore:', err);
      }

      setUserProfile(newProfile);
      setCurrentUser(cred.user);
      setIsDemoUser(false);
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    setLoading(true);
    try {
      const cred = await signInWithPopup(auth, googleProvider);
      await syncUserProfile(cred.user);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      if (currentUser) {
        await signOut(auth);
      }
      setCurrentUser(null);
      setUserProfile(DEMO_PROFILES.elder);
      setIsDemoUser(true);
      localStorage.setItem('buddy_demo_role', 'elder');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const switchDemoRole = (role: UserRole) => {
    setIsDemoUser(true);
    setUserProfile(DEMO_PROFILES[role]);
    localStorage.setItem('buddy_demo_role', role);
  };

  const updateUserProfile = async (updates: Partial<UserProfile>) => {
    if (!userProfile) return;
    const updated: UserProfile = {
      ...userProfile,
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    setUserProfile(updated);

    if (currentUser && !isDemoUser) {
      try {
        await updateDoc(doc(db, 'users', currentUser.uid), updates as any);
      } catch (error) {
        handleFirestoreError(error, OperationType.UPDATE, `users/${currentUser.uid}`);
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        userProfile,
        loading,
        loginWithEmail,
        registerWithEmail,
        loginWithGoogle,
        logout,
        switchDemoRole,
        updateUserProfile,
        isDemoUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
