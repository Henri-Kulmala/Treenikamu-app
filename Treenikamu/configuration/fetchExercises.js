import { database } from './firebaseConfig';
import { ref, get, child } from 'firebase/database';


export const fetchAllExercises = async () => {
  try {
    const snapshot = await get(child(ref(database), 'liikkeet'));

    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.warn('No exercises found in database.');
      return null;
    }
  } catch (error) {
    console.error('Error fetching exercises:', error);
    return null;
  }
};
