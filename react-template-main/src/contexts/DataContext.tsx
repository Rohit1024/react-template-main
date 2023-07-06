import {
  DocumentData,
  QuerySnapshot,
  collection,
  getDocs,
  query,
} from "firebase/firestore";
import { createContext, useContext } from "react";
import { db } from "../config/firebase";

type FirestoreProviderProps = {
  getPosts(): Promise<QuerySnapshot<DocumentData>>;
};

const FirestoreContext = createContext({} as FirestoreProviderProps);

export function useFirestore() {
  return useContext(FirestoreContext);
}

type FirestoreContextProps = {
  children: React.ReactNode;
};

export function FirestoreProvider({ children }: FirestoreContextProps) {
  function getPosts() {
    const collectionRef = collection(db, "posts");
    const collectionQuery = query(collectionRef);
    return getDocs(collectionQuery);
    
  }

  const value = {
    getPosts,
  };

  return (
    <FirestoreContext.Provider value={value}>
      {children}
    </FirestoreContext.Provider>
  );
}
