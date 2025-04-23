
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { ref, get, set } from "firebase/database";
import { auth, database } from "./firebaseConfig";

const useCurrentUser = () => {
  const [user, setUser]       = useState(null);
  const [userId, setUserId]   = useState(null);
  const [loading, setLoading] = useState(true);

  const defaultUserData = {
    name: "",
    firstName: "",
    lastName: "",
    age: 0,
    height: 0,
    weight: 0,
    
  };


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        setUser(null);
        setUserId(null);
        setLoading(false);
        return;
      }

      const uid     = currentUser.uid;
      const userRef = ref(database, `users/${uid}`);
      const snap    = await get(userRef);

      if (!snap.exists()) {
        const initData = {
          ...defaultUserData,
          email: currentUser.email || "",
        };
        await set(userRef, initData);
        setUser(initData);
      } else {
        setUser(snap.val());
      }

      setUserId(uid);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return { user, userId, loading };
};

export default useCurrentUser;
