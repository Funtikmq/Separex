import { auth, signOut } from "./firebase/firebase";

function CustomerContent() {
  const handleLogOut = async () => {
    try {
      await signOut(auth);
      console.log("User signed out");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <>
      <div className="authorizationBox">
        Customer
        <button className="authorizationButton" onClick={handleLogOut}>
          Log Out
        </button>
      </div>
    </>
  );
}

export default CustomerContent;
