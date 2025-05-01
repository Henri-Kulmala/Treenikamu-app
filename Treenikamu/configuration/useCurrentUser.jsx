// ../configuration/useCurrentUser.jsx
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { ref, onValue, set as firebaseSet } from "firebase/database";
import { auth, database } from "./firebaseConfig";

const defaultUserData = {
  name: "",
  firstName: "",
  lastName: "",
  age: 0,
  height: 0,
  weight: 0,
};

export default function useCurrentUser() {
  const [userId, setUserId] = useState(null);
  const [profile, setProfile] = useState(null);
  const [workoutplan, setWorkoutplan] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUserId(currentUser.uid);
      } else {
        setUserId(null);
        setProfile(null);
        setWorkoutplan(null);
        setLoading(false);
      }
    });
    return unsubscribeAuth;
  }, []);


  useEffect(() => {
    if (!userId) return;
    setLoading(true);

    const userRef = ref(database, `users/${userId}`);
    const unsubscribeData = onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) {
  
        const init = {
          ...defaultUserData,
          email: auth.currentUser?.email || "",
        };
        firebaseSet(userRef, init);
        setProfile(init);
        setWorkoutplan(null);
      } else {

        const { workoutplan: plan = null, ...rest } = data;
        setProfile(rest);
        setWorkoutplan(plan);
      }
      setLoading(false);
    });

    return () => unsubscribeData();
  }, [userId]);

  return {
    user: profile,
    userId,
    workoutplan,
    loading,
  };
}
