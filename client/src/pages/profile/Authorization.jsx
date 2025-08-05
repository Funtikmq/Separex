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
          <h1 className="authorizationTitle">Welcome to Separex</h1>
          <p className="authorizationText">
            To save your orders, please log in
          </p>
          <p className="authorizationText">Choose any available method</p>
          <button className="authorizationButton" onClick={signInWithGoogle}>
            Continue with Google
          </button>
        </div>
      </div>
    </>
  );
}

export default Authorization;
