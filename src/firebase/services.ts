import { 
  collection, 
  addDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  orderBy,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from './config';
import { BGMIID } from '../context/IDContext';

const COLLECTION_NAME = 'bgmi-ids';

// Add a new BGMI ID
export const addBGMIID = async (newID: Omit<BGMIID, 'id' | 'createdAt'>) => {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...newID,
      createdAt: serverTimestamp(),
      available: true
    });
    
    console.log('BGMI ID added successfully with ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error adding BGMI ID:', error);
    throw error;
  }
};

// Get all BGMI IDs
export const getAllBGMIIDs = async (): Promise<BGMIID[]> => {
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    const ids: BGMIID[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      ids.push({
        id: doc.id,
        title: data.title,
        description: data.description,
        price: data.price,
        image: data.image,
        level: data.level,
        skins: data.skins || [],
        rank: data.rank,
        kd: data.kd,
        matches: data.matches,
        available: data.available !== false,
        createdAt: data.createdAt?.toDate?.()?.toISOString() || new Date().toISOString()
      });
    });
    
    console.log('Retrieved', ids.length, 'BGMI IDs from Firebase');
    return ids;
  } catch (error) {
    console.error('Error getting BGMI IDs:', error);
    throw error;
  }
};

// Update a BGMI ID
export const updateBGMIID = async (id: string, updates: Partial<BGMIID>) => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, updates);
    console.log('BGMI ID updated successfully:', id);
  } catch (error) {
    console.error('Error updating BGMI ID:', error);
    throw error;
  }
};

// Delete a BGMI ID
export const deleteBGMIID = async (id: string) => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
    console.log('BGMI ID deleted successfully:', id);
  } catch (error) {
    console.error('Error deleting BGMI ID:', error);
    throw error;
  }
};

// Mark a BGMI ID as sold
export const markBGMIIDAsSold = async (id: string) => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, { available: false });
    console.log('BGMI ID marked as sold:', id);
  } catch (error) {
    console.error('Error marking BGMI ID as sold:', error);
    throw error;
  }
};

// Get a single BGMI ID by ID
export const getBGMIIDById = async (id: string): Promise<BGMIID | undefined> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDocs(collection(db, COLLECTION_NAME));
    
    const foundDoc = docSnap.docs.find(doc => doc.id === id);
    if (foundDoc) {
      const data = foundDoc.data();
      return {
        id: foundDoc.id,
        title: data.title,
        description: data.description,
        price: data.price,
        image: data.image,
        level: data.level,
        skins: data.skins || [],
        rank: data.rank,
        kd: data.kd,
        matches: data.matches,
        available: data.available !== false,
        createdAt: data.createdAt?.toDate?.()?.toISOString() || new Date().toISOString()
      };
    }
    return undefined;
  } catch (error) {
    console.error('Error getting BGMI ID by ID:', error);
    throw error;
  }
};
