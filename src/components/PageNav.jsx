import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/FakeAuthContext";
import styles from "./PageNav.module.css";
import Logo from "./Logo";
import Button from "./Button";

function PageNav() {
  const navigate = useNavigate();
  const { logout, isAuthenticated } = useAuth();

  return (
    <nav className={styles.nav}>
      <Logo />
      <ul>
        <li>
          <NavLink to="/">Главная</NavLink>
        </li>
        <li>
          <NavLink to="/pricing">Цены</NavLink>
        </li>
        <li>
          <NavLink to="/product">О нас</NavLink>
        </li>
        <li>
          {isAuthenticated ? (
            <Button type="back" onClick={() => logout()}>
              Выйти
            </Button>
          ) : (
            <Button type="primary" onClick={() => navigate("/login")}>
              Войти
            </Button>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default PageNav;
