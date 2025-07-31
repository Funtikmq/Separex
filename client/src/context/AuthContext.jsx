import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, getIdTokenResult } from "firebase/auth";
import { auth } from "../pages/profile/firebase/firebase";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      const handleUser = async () => {
        if (firebaseUser) {
          try {
            const tokenResult = await getIdTokenResult(firebaseUser);
            const role = tokenResult.claims.role || "customer";

            setUser({ ...firebaseUser, role });
          } catch (error) {
            console.error("Error getting token", error);
            setUser({ ...firebaseUser, role: "customer" });
          }
        } else {
          setUser(null);
        }
        setLoading(false);
      };

      handleUser();
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
