import {
  GithubAuthProvider,
  GoogleAuthProvider,
  User,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInAnonymously,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendEmailVerification,
  UserCredential,
  updateProfile,
  EmailAuthProvider,
  linkWithCredential,
  OAuthCredential,
} from "firebase/auth";
import React, { useContext, useState, useEffect, createContext } from "react";
import { auth } from "../config/firebase";

type AuthProviderProps = {
  user: User | null;
  register(email: string, password: string): Promise<UserCredential>;
  login(email: string, password: string): Promise<UserCredential>;
  logOut(): Promise<void>;
  resetPassword(email: string): Promise<void>;
  verifyEmail(user: User): Promise<void>;
  googleSignIn(): Promise<UserCredential>;
  gitHubSignIn(): Promise<UserCredential>;
  anonymousSignIn(): Promise<UserCredential>;
  updateUserProfile(data: { displayName: string }): Promise<void>;
  UpgradeUser(value: upgradeUserType): Promise<UserCredential>;
  getCredentials(
    provider: "Google" | "GitHub"
  ): (
    idToken?: string | null | undefined,
    accessToken?: string | null | undefined
  ) => OAuthCredential;
};

type upgradeUserType =
  | {
      provider: "Email";
      data: {
        email: string;
        password: string;
      };
    }
  | {
      provider: "Google";
      idToken: string;
    }
  | {
      provider: "Github";
      idToken: string;
    };

const AuthContext = createContext({} as AuthProviderProps);

export function useAuth() {
  return useContext(AuthContext);
}

type AuthContextProps = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: AuthContextProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  function register(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function login(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logOut() {
    return signOut(auth);
  }

  function resetPassword(email: string) {
    return sendPasswordResetEmail(auth, email);
  }

  function verifyEmail(user: User) {
    return sendEmailVerification(user);
  }

  function googleSignIn() {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    return signInWithPopup(auth, provider);
  }

  function gitHubSignIn() {
    const provider = new GithubAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    return signInWithPopup(auth, provider);
  }

  function anonymousSignIn() {
    return signInAnonymously(auth);
  }

  function getCredentials(provider: "Google" | "GitHub") {
    if (provider === "Google") {
      return GoogleAuthProvider.credential;
    } else if (provider === "GitHub") {
      return GithubAuthProvider.credential;
    } else throw new Error("Invalid Provider");
  }

  function UpgradeUser(value: upgradeUserType) {
    if (value.provider === "Email") {
      const credential = EmailAuthProvider.credential(
        value.data.email,
        value.data.password
      );
      return linkWithCredential(auth.currentUser!, credential);
    } else if (value.provider === "Google") {
      const credential = GoogleAuthProvider.credential(value.idToken);
      return linkWithCredential(auth.currentUser!, credential);
    } else if (value.provider === "Github") {
      const credential = GithubAuthProvider.credential(value.idToken);
      return linkWithCredential(auth.currentUser!, credential);
    } else throw new Error("Invalid Provider");
  }

  function updateUserProfile(data: { displayName: string }) {
    return updateProfile(user!, {
      displayName: data.displayName,
    });
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const value = {
    user,
    register,
    login,
    logOut,
    verifyEmail,
    resetPassword,
    googleSignIn,
    gitHubSignIn,
    anonymousSignIn,
    updateUserProfile,
    UpgradeUser,
    getCredentials,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
