import { createContext, useContext, useEffect, useState } from 'react';
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  GithubAuthProvider,
  signOut,
  onAuthStateChanged,
  linkWithPopup,
  // signInWithEmailLink 
} from 'firebase/auth';
import { auth } from '../config/firebase';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      setError(null);
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      return result.user;
    } catch (err) {
      // Handle account-exists-with-different-credential error
      if (err.code === 'auth/account-exists-with-different-credential') {
        try {
          setError(null);
          const githubProvider = new GithubAuthProvider();
          const result = await signInWithPopup(auth, githubProvider);
          // Link Google provider to existing account
          const googleProvider = new GoogleAuthProvider();
          await linkWithPopup(result.user, googleProvider);
          return result.user;
        } catch (linkErr) {
          setError(linkErr.message);
          throw linkErr;
        }
      }
      setError(err.message);
      throw err;
    }
  };

  const signInWithGithub = async () => {
    try {
      setError(null);
      const provider = new GithubAuthProvider();
      const result = await signInWithPopup(auth, provider);
      return result.user;
    } catch (err) {
      // Handle account-exists-with-different-credential error
      if (err.code === 'auth/account-exists-with-different-credential') {
        try {
          setError(null);
          const googleProvider = new GoogleAuthProvider();
          const result = await signInWithPopup(auth, googleProvider);
          // Link GitHub provider to existing account
          const githubProvider = new GithubAuthProvider();
          await linkWithPopup(result.user, githubProvider);
          return result.user;
        } catch (linkErr) {
          setError(linkErr.message);
          throw linkErr;
        }
      }
      setError(err.message);
      throw err;
    }
  };

  const logout = async () => {
    try {
      setError(null);
      await signOut(auth);
      setUser(null);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const value = {
    user,
    loading,
    error,
    signInWithGoogle,
    signInWithGithub,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
// @ts-ignore
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
