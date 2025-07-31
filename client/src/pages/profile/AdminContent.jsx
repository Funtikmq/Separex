import { auth, signOut } from "./firebase/firebase";

function AdminContent() {
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
      <button className="authorizationButton" onClick={handleLogOut}>
        Log Out
      </button>
    </>
  );
}

export default AdminContent;
