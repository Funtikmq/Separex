import { useAuth } from "../../context/AuthContext";
import Authorization from "./Authorization";
import CustomerContent from "./CustomerContent";
import AdminContent from "./AdminContent";

function ProfileContent() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="profileLayout">
        <Authorization />
      </div>
    );
  }
  return (
    <div className="profileLayout">
      {user.role === "admin" && <AdminContent />}
      {user.role === "customer" && <CustomerContent />}
    </div>
  );
}

export default ProfileContent;
