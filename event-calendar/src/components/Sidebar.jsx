import { useNavigate } from "react-router-dom";
import { ArrowRightCircleFill } from "react-bootstrap-icons";
import { useAuth } from "../context/datecontext";

const Sidebar = () => {
  const navigate = useNavigate();
  const { logout, users } = useAuth();

  const exitOut = async () => {
    await logout();
    navigate("/");
  };

  return (
    <>
      <div className="sidebar">
        <div className="profile">
          <img
            src="https://i.pravatar.cc/350?u=a042581f4e19026704d"
            alt="Foto de perfil"
          />
          <p className="title-avatar"> {users.email} </p>
        </div>

        <div className="btn-container">
          <button onClick={exitOut} className="btn btn-primary btn-logout">
            Logout <ArrowRightCircleFill />
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
