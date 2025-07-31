import { auth, googleProvider, signInWithPopup } from "./firebase/firebase";

function Authorization() {
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      // Aici adaugam logica
    } catch (error) {
      console.error("Google sign-in error", error);
    }
  };

  return (
    <>
      <div className="authorizationContainer">
        <div className="authorizationBox">
          <button className="authorizationButton" onClick={signInWithGoogle}>
            Gmail
          </button>
        </div>
      </div>
    </>
  );
}

export default Authorization;
