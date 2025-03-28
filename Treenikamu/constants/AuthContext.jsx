import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { auth } from "../constants/firebaseConfig"; 



const AuthContext = {
  handleRegister: async (email, password, username) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password); 
      const user = userCredential.user;

      if (username) {
        await updateProfile(user, { displayName: username });
      }

      return {
        success: true,
        user: user,
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
