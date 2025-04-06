import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "./firebaseConfig";
import { getDatabase, ref, set } from "firebase/database";

const AuthContext = {
  handleRegister: async ({ email, password, ...profile }) => {
    try {
      // 1. Create auth user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2. Save extra user data to Realtime Database
      const db = getDatabase();
      await set(ref(db, "users/" + user.uid), {
        email,
        ...profile,
        createdAt: new Date().toISOString(),
      });

      return {
        success: true,
        user,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  },

  handleLogin: async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return {
        success: true,
        user: userCredential.user,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  },

  handleSignout: async () => {
    try {
      await signOut(auth);
      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  },
};

export default AuthContext;
