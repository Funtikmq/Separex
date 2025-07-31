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

            // Construim un user simplu pentru React:
            setUser({
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              displayName: firebaseUser.displayName,
              photoURL: firebaseUser.photoURL,
              role,
            });

            try {
              await fetch("http://localhost:5000/api/save-user", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  uid: firebaseUser.uid,
                  email: firebaseUser.email,
                  displayName: firebaseUser.displayName,
                  role: role,
                  timestamp: new Date().toISOString(),
                }),
              });
            } catch (fetchError) {
              console.warn("Failed to send user data to backend:", fetchError);
            }

            if (auth.currentUser) {
              await auth.currentUser.getIdToken(true);
            }
          } catch (error) {
            console.error("Error getting token", error);
            setUser({
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              displayName: firebaseUser.displayName,
              photoURL: firebaseUser.photoURL,
              role: "customer",
            });
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
