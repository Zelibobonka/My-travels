import { useAuth } from "../contexts/FakeAuthContext";
import { useNavigate } from "react-router-dom";
import styles from "./User.module.css";

function User() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  function handleClick() {
    logout();
    navigate("/");
  }

  return (
    <div className={styles.user}>
      <img src={user.avatar} alt={user.name} />
      <span>Добро пожаловать, {user.name}</span>
      <button onClick={handleClick}>Выйти</button>
    </div>
  );
}

export default User;
