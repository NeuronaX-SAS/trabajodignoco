import { useState } from 'react';
import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  limit, 
  DocumentData,
  serverTimestamp, 
  CollectionReference,
  Query
} from 'firebase/firestore';
import { db } from '../firebase';

interface UseFirebaseReturn {
  loading: boolean;
  error: string | null;
  addDocument: (collectionName: string, data: Record<string, any>) => Promise<string | null>;
  getDocuments: (collectionName: string, constraints?: any[]) => Promise<DocumentData[]>;
}

export const useFirebase = (): UseFirebaseReturn => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Add a document to a collection
  const addDocument = async (collectionName: string, data: Record<string, any>): Promise<string | null> => {
    setLoading(true);
    setError(null);

    try {
      // Add timestamp to the data
      const dataWithTimestamp = {
        ...data,
        createdAt: serverTimestamp()
      };

      const docRef = await addDoc(collection(db, collectionName), dataWithTimestamp);
      setLoading(false);
      return docRef.id;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido al agregar documento';
      setError(errorMessage);
      setLoading(false);
      console.error('Error adding document:', err);
      return null;
    }
  };

  // Get documents from a collection with optional query constraints
  const getDocuments = async (collectionName: string, constraints: any[] = []): Promise<DocumentData[]> => {
    setLoading(true);
    setError(null);

    try {
      // Create a reference to the collection
      const collectionRef = collection(db, collectionName);
      
      // Apply constraints if provided
      let queryRef: Query<DocumentData> = constraints.length > 0 
        ? query(collectionRef, ...constraints) 
        : query(collectionRef);

      const querySnapshot = await getDocs(queryRef);
      const documents = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setLoading(false);
      return documents;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido al obtener documentos';
      setError(errorMessage);
      setLoading(false);
      console.error('Error getting documents:', err);
      return [];
    }
  };

  return {
    loading,
    error,
    addDocument,
    getDocuments
  };
};

export default useFirebase; 